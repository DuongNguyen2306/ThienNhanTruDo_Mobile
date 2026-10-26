/**
 * API client for the Thiên Nhãn backend.
 *
 * The backend is the SAME Express service the website uses — this mobile app
 * introduces no new backend. Only the storage of the JWT differs: the web
 * app keeps it in `localStorage`, the mobile app keeps it in the device
 * keychain via `expo-secure-store`.
 */

import axios, { AxiosError, type AxiosInstance } from 'axios';

import { secureTokenStore } from './secure-token-store';
import type { ApiUser, LoginErrorPayload, LoginResponse } from '@/types/auth';

/**
 * Base URL of the Express backend.
 *
 * Set `EXPO_PUBLIC_API_URL` in `mobile/.env` to point at your own machine.
 * The default matches the backend's local development port.
 */
export const API_BASE_URL =
  process.env.EXPO_PUBLIC_API_URL?.replace(/\/+$/, '') ?? 'http://localhost:3005';

/** Request timeout in milliseconds. */
export const REQUEST_TIMEOUT_MS = 15000;

export const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: REQUEST_TIMEOUT_MS,
  headers: { 'Content-Type': 'application/json' },
});

/**
 * Attach the stored JWT to every outgoing request.
 *
 * The token is read from SecureStore on each request rather than cached in
 * memory, so a sign-out (or a token rotation) takes effect immediately.
 */
apiClient.interceptors.request.use(async (config) => {
  const token = await secureTokenStore.get();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

/** A failed API call, carrying the HTTP status and the backend payload. */
export class ApiError extends Error {
  readonly status: number;
  readonly data?: LoginErrorPayload;

  constructor(message: string, status: number, data?: LoginErrorPayload) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.data = data;
  }

  /** The account exists but its e-mail has not been proven yet. */
  get requiresVerification(): boolean {
    return this.status === 403 && this.data?.requiresVerification === true;
  }
}

/**
 * Turn an axios failure into a readable message.
 *
 * The backend's validation middleware answers with a generic
 * "Dữ liệu không hợp lệ" plus a `details` array; the per-field messages are
 * far more useful, so they are surfaced instead.
 */
function describeError(error: unknown): { message: string; status: number; data?: LoginErrorPayload } {
  if (error instanceof AxiosError) {
    const status = error.response?.status ?? 0;
    const data = error.response?.data as LoginErrorPayload | undefined;

    if (error.code === 'ECONNABORTED') {
      return { message: 'Yêu cầu hết thời gian. Vui lòng thử lại.', status: 408, data };
    }

    if (!error.response) {
      return {
        message: 'Không kết nối được máy chủ. Vui lòng kiểm tra kết nối.',
        status: 0,
        data,
      };
    }

    if (Array.isArray(data?.details) && data.details.length > 0) {
      const messages = data.details
        .map((d) => (d.msg ? (d.path ? `${d.msg} (${d.path})` : d.msg) : ''))
        .filter(Boolean);

      if (messages.length > 0) {
        const headline = data?.error;
        return {
          message:
            headline && headline !== 'Dữ liệu không hợp lệ'
              ? `${headline}: ${messages.join(', ')}`
              : messages.join(', '),
          status,
          data,
        };
      }
    }

    return {
      message: data?.error ?? 'Lỗi máy chủ. Vui lòng thử lại.',
      status,
      data,
    };
  }

  return {
    message: error instanceof Error ? error.message : 'Lỗi không xác định.',
    status: 0,
  };
}

/** Run an axios call and normalise any failure into an `ApiError`. */
async function request<T>(fn: () => Promise<{ data: T }>): Promise<T> {
  try {
    const response = await fn();
    return response.data;
  } catch (error) {
    const { message, status, data } = describeError(error);
    throw new ApiError(message, status, data);
  }
}

export const authApi = {
  /**
   * Sign in with a phone number OR an e-mail address.
   *
   * The backend accepts the identifier in `identifier`; `phone` is sent as
   * well so an older backend build still works.
   */
  login: (identifier: string, password: string) =>
    request<LoginResponse>(() =>
      apiClient.post<LoginResponse>('/api/auth/login', {
        identifier,
        phone: identifier,
        password,
      }),
    ),

  /** The currently signed-in user. Used to validate a restored session. */
  getMe: () => request<{ user: ApiUser }>(() => apiClient.get('/api/auth/me')),
};

export default apiClient;

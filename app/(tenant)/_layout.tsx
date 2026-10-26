/**
 * `(tenant)` group — the TENANT (người thuê) interface.
 *
 * Five tabs: Trang chủ · Tìm phòng · Đã lưu · Lịch hẹn · Tài khoản.
 *
 * The tab structure is defined here, but the ACCESS CONTROL lives in
 * `useAuthGuard`: a signed-in seller who opens a tenant tab is redirected
 * to their own home.
 */

import { Redirect, Tabs } from 'expo-router';
import { Bookmark, CalendarDays, Home, Search, User } from 'lucide-react-native';

import { LoadingState } from '@/components/ui';
import { useAuthGuard } from '@/hooks/use-auth-guard';
import { colors, fontFamily, fontSize } from '@/constants/theme';

export default function TenantLayout() {
  const { isChecking, canAccess, redirect } = useAuthGuard({ allowedRole: 'tenant' });

  if (isChecking) {
    return <LoadingState fullScreen message="Đang xác thực…" />;
  }

  if (!canAccess) {
    if (redirect) {
      return <Redirect href={redirect as never} />;
    }
    // Signed in with a role that has no mobile interface (manager/admin).
    return <LoadingState fullScreen message="Tài khoản không được phép truy cập ứng dụng di động." />;
  }

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.ink,
        tabBarInactiveTintColor: colors.textMuted,
        tabBarStyle: {
          backgroundColor: colors.surface,
          borderTopColor: colors.ink,
          borderTopWidth: 2,
          height: 62,
          paddingBottom: 8,
          paddingTop: 6,
        },
        tabBarLabelStyle: {
          fontFamily: fontFamily.medium,
          fontSize: fontSize.xs,
        },
        tabBarIconStyle: {
          marginTop: 2,
        },
        sceneStyle: {
          backgroundColor: colors.background,
        },
      }}
    >
      <Tabs.Screen
        name="trang-chu"
        options={{
          title: 'Trang chủ',
          tabBarIcon: ({ color }) => <Home size={21} color={color} strokeWidth={2.4} />,
        }}
      />
      <Tabs.Screen
        name="tim-phong"
        options={{
          title: 'Tìm phòng',
          tabBarIcon: ({ color }) => <Search size={21} color={color} strokeWidth={2.4} />,
        }}
      />
      <Tabs.Screen
        name="da-luu"
        options={{
          title: 'Đã lưu',
          tabBarIcon: ({ color }) => <Bookmark size={21} color={color} strokeWidth={2.4} />,
        }}
      />
      <Tabs.Screen
        name="lich-hen"
        options={{
          title: 'Lịch hẹn',
          tabBarIcon: ({ color }) => <CalendarDays size={21} color={color} strokeWidth={2.4} />,
        }}
      />
      <Tabs.Screen
        name="tai-khoan"
        options={{
          title: 'Tài khoản',
          tabBarIcon: ({ color }) => <User size={21} color={color} strokeWidth={2.4} />,
        }}
      />
    </Tabs>
  );
}

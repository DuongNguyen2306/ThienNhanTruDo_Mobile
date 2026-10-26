/**
 * Tenant — Lịch hẹn.
 *
 * Placeholder for the SCENE series.
 */

import { CalendarDays } from 'lucide-react-native';

import { PlaceholderScreen } from '@/components/placeholder-screen';

export default function TenantAppointmentsScreen() {
  return (
    <PlaceholderScreen
      title="Lịch hẹn"
      scene="SCENE 004"
      description="Các lịch hẹn đã đặt: xem trạng thái, thời gian và địa chỉ phòng."
      icon={CalendarDays}
    />
  );
}

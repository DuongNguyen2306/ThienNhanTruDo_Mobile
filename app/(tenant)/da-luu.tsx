/**
 * Tenant — Đã lưu.
 *
 * Placeholder for the SCENE series.
 */

import { Bookmark } from 'lucide-react-native';

import { PlaceholderScreen } from '@/components/placeholder-screen';

export default function TenantSavedScreen() {
  return (
    <PlaceholderScreen
      title="Đã lưu"
      scene="SCENE 003"
      description="Danh sách các phòng bạn đã lưu để xem lại và đặt lịch."
      icon={Bookmark}
    />
  );
}

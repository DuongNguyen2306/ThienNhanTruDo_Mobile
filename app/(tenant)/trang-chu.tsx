/**
 * Tenant — Trang chủ.
 *
 * Placeholder for the SCENE series. The shell (header, tab bar, theme,
 * fonts, session) is already in place; the content is filled in scene by
 * scene.
 */

import { Home } from 'lucide-react-native';

import { PlaceholderScreen } from '@/components/placeholder-screen';

export default function TenantHomeScreen() {
  return (
    <PlaceholderScreen
      title="Trang chủ"
      scene="SCENE 001"
      description="Trang chủ của người thuê: các phòng nổi bật, tìm kiếm nhanh và lịch hẹn sắp tới."
      icon={Home}
    />
  );
}

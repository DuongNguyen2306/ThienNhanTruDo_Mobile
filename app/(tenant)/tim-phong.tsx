/**
 * Tenant — Tìm phòng.
 *
 * Placeholder for the SCENE series.
 */

import { Search } from 'lucide-react-native';

import { PlaceholderScreen } from '@/components/placeholder-screen';

export default function TenantSearchScreen() {
  return (
    <PlaceholderScreen
      title="Tìm phòng"
      scene="SCENE 002"
      description="Tìm kiếm và lọc danh sách phòng theo khu vực, giá thuê và tiện ích."
      icon={Search}
    />
  );
}

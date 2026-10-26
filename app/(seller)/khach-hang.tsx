/**
 * Seller — Khách hàng.
 *
 * Placeholder for the SCENE series.
 */

import { Users } from 'lucide-react-native';

import { PlaceholderScreen } from '@/components/placeholder-screen';

export default function SellerCustomersScreen() {
  return (
    <PlaceholderScreen
      title="Khách hàng"
      scene="SCENE 009"
      description="Danh sách khách thuê đã liên hệ hoặc đặt lịch với các tin đăng của bạn."
      icon={Users}
    />
  );
}

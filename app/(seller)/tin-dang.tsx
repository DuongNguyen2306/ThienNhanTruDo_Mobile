/**
 * Seller — Tin đăng.
 *
 * Placeholder for the SCENE series.
 */

import { Megaphone } from 'lucide-react-native';

import { PlaceholderScreen } from '@/components/placeholder-screen';

export default function SellerListingsScreen() {
  return (
    <PlaceholderScreen
      title="Tin đăng"
      scene="SCENE 007"
      description="Quản lý các tin đăng phòng: đang hiển thị, đã ẩn, chờ duyệt và đã hết hạn."
      icon={Megaphone}
    />
  );
}

/**
 * Seller — Tài khoản.
 *
 * Placeholder for the SCENE series. The sign-out action is wired up here
 * already, because it is part of the session shell rather than of the
 * content.
 */

import { View } from 'react-native';
import { useRouter } from 'expo-router';
import { User } from 'lucide-react-native';

import { AppButton, StatusBadge } from '@/components/ui';
import { PlaceholderScreen } from '@/components/placeholder-screen';
import { useAuth } from '@/providers/auth-provider';
import { spacing } from '@/constants/theme';

export default function SellerAccountScreen() {
  const router = useRouter();
  const { user, signOut } = useAuth();

  const handleSignOut = async () => {
    await signOut();
    router.replace('/(auth)/dang-nhap');
  };

  return (
    <>
      <PlaceholderScreen
        title="Tài khoản"
        scene="SCENE 010"
        description={`Thông tin cá nhân, hồ sơ chủ trọ và bảo mật. Đang đăng nhập: ${user?.fullName ?? '—'}`}
        icon={User}
      />

      <View style={{ paddingHorizontal: spacing.xl, paddingBottom: spacing.xxl, gap: spacing.lg }}>
        <StatusBadge
          label={
            user?.sellerStatus === 'approved'
              ? 'Đã xác minh'
              : user?.sellerStatus === 'pending'
                ? 'Đang chờ duyệt'
                : user?.sellerStatus === 'rejected'
                  ? 'Bị từ chối'
                  : 'Chưa đăng ký chủ trọ'
          }
          variant={
            user?.sellerStatus === 'approved'
              ? 'verified'
              : user?.sellerStatus === 'pending'
                ? 'pending'
                : user?.sellerStatus === 'rejected'
                  ? 'rejected'
                  : 'neutral'
          }
          withDot
        />

        <AppButton label="Đăng xuất" variant="danger" onPress={handleSignOut} fullWidth />
      </View>
    </>
  );
}

/**
 * Tenant — Tài khoản.
 *
 * Placeholder for the SCENE series. The sign-out action is wired up here
 * already, because it is part of the session shell rather than of the
 * content.
 */

import { View } from 'react-native';
import { useRouter } from 'expo-router';
import { User } from 'lucide-react-native';

import { AppButton } from '@/components/ui';
import { PlaceholderScreen } from '@/components/placeholder-screen';
import { useAuth } from '@/providers/auth-provider';
import { spacing } from '@/constants/theme';

export default function TenantAccountScreen() {
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
        scene="SCENE 005"
        description={`Thông tin cá nhân, bảo mật và quản lý tài khoản. Đang đăng nhập: ${user?.fullName ?? '—'}`}
        icon={User}
      />
      <View style={{ paddingHorizontal: spacing.xl, paddingBottom: spacing.xxl }}>
        <AppButton label="Đăng xuất" variant="danger" onPress={handleSignOut} fullWidth />
      </View>
    </>
  );
}

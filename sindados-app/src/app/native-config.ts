import type { IonicConfig } from '@ionic/core/components';

export function getNativeIonicConfig(
  platform: string,
  search = '',
  browserMode: 'ios' | 'md' = 'md',
): IonicConfig {
  const requestedMode = new URLSearchParams(search).get('ionic:mode');
  const platformMode =
    platform === 'ios' ? 'ios' : platform === 'android' ? 'md' : browserMode;
  const mode =
    requestedMode === 'ios' || requestedMode === 'md'
      ? requestedMode
      : platformMode;

  // Explicit config takes precedence over Ionic's URL parser, including invalid modes.
  return {
    mode,
    swipeBackEnabled: mode === 'ios',
    rippleEffect: mode === 'md',
    ...(mode === 'ios' ? { backButtonText: 'Voltar' } : {}),
    // Changing appearance must not disable the real Android back button.
    ...(platform === 'android' ? { hardwareBackButton: true } : {}),
  };
}

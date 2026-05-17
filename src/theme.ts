export const colors = {
  primary: '#00C896',
  primaryAlt: '#42e5b0',
  primaryDark: '#009E78',
  primaryLight: 'rgba(0,200,150,0.12)',
  primaryGlow: 'rgba(0,200,150,0.06)',

  background: '#131313',
  surface: '#1C1B1B',
  surfaceLow: '#201f1f',
  surfaceMid: '#2a2a2a',
  surfaceHigh: '#353534',
  surfaceBright: '#3a3939',

  border: '#2A2A2A',
  borderSubtle: '#1E1E1E',

  textPrimary: '#e5e2e1',
  textSecondary: '#bbcac1',
  textTertiary: '#85948c',
  textMuted: '#606060',

  success: '#00C896',
  warning: '#F5A623',
  error: '#E5534B',
  errorLight: '#ffb4ab',
  info: '#4A9EF8',

  formGood: '#00C896',
  formCaution: '#F5A623',
  formError: '#E5534B',

  white: '#FFFFFF',
  black: '#000000',
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  base: 16,
  lg: 20,
  xl: 24,
  xxl: 32,
  xxxl: 48,
};

export const radius = {
  xs: 4,
  sm: 6,
  md: 8,
  lg: 12,
  xl: 16,
  xxl: 20,
  full: 9999,
};

export const typography = {
  fontFamily: '"Inter", -apple-system, sans-serif',
  fontMono: '"JetBrains Mono", "Fira Code", monospace',
  displayXl: { fontSize: '28px', fontWeight: '700', lineHeight: '34px', letterSpacing: '-0.02em' },
  display: { fontSize: '24px', fontWeight: '700', lineHeight: '30px', letterSpacing: '-0.01em' },
  title: { fontSize: '18px', fontWeight: '600', lineHeight: '24px' },
  body: { fontSize: '16px', fontWeight: '400', lineHeight: '24px' },
  bodySmall: { fontSize: '14px', fontWeight: '400', lineHeight: '20px' },
  caption: { fontSize: '12px', fontWeight: '400', lineHeight: '16px' },
  label: { fontSize: '11px', fontWeight: '600', letterSpacing: '0.06em', textTransform: 'uppercase' as const },
  stat: { fontSize: '24px', fontWeight: '600', lineHeight: '32px', letterSpacing: '-0.01em' },
  statLg: { fontSize: '36px', fontWeight: '700', lineHeight: '44px', letterSpacing: '-0.02em' },
};

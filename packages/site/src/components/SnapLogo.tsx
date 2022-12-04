import logo from '../assets/logo.png';

export const SnapLogo = ({ size }: { color: string; size: number }) => (
  <img width={size} height={size} src={logo} />
);

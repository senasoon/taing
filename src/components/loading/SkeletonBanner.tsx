import styled from 'styled-components/macro';
import { SkeletonAnimation } from '@/styles/SkeletonStyles';
import { rem } from '@/theme/utils';

const HEIGHT = (window.innerWidth * 394) / 885;

export const StBanner = styled(SkeletonAnimation)`
  width: 100%;
  height: ${rem(HEIGHT)};
`;

const SkeletonBanner = () => {
  return <StBanner />;
};

export default SkeletonBanner;

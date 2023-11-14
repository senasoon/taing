import styled from 'styled-components/macro';
import { SkeletonAnimation } from '@/styles/SkeletonStyles';

export const StBanner = styled(SkeletonAnimation)`
  width: 100%;
  aspect-ratio: 128 / 57;
`;

const SkeletonBanner = () => {
  return <StBanner />;
};

export default SkeletonBanner;

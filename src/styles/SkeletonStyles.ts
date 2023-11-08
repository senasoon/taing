import styled from 'styled-components/macro';

export const SkeletonAnimation = styled.div`
  background: linear-gradient(
    120deg,
    var(--dark-bg1) 30%,
    var(--dark-bg2) 38%,
    var(--dark-bg2) 40%,
    var(--dark-bg1) 48%
  );

  border-radius: 5px;
  background-size: 200% 100%;
  background-position: 100% 0;
  animation: skeleton-gradient 1s infinite;

  @keyframes skeleton-gradient {
    100% {
      background-position: -100% 0;
    }
  }
`;

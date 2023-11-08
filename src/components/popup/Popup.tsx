import styled from 'styled-components/macro';
import { getFontStyle, rem } from '@/theme/utils';
import ModalPortal from '@/components/modal/ModalPortal';
import useModal from '@/hooks/useModal';

const StPopUp = styled.div`
  width: ${rem(252)};
  height: ${rem(319.75)};
  position: fixed;
  transform: translate(-50%, -50%);
  top: 50%;
  left: 50%;
  button {
    border: transparent;
    background-color: transparent;
    margin: auto;
    color: var(--white);
    ${getFontStyle('ParagraphS')};
    width: ${rem(252)};
  }
  @media (min-width: 768px) {
    width: ${rem(328)};
    height: ${rem(407)};
    button {
      height: ${rem(36)};
    }
  }
  @media (min-width: 1920px) {
    width: ${rem(588)};
    height: ${rem(782.29)};

    button {
      height: ${rem(66)};
      ${getFontStyle('ParagraphL')};
    }
  }
`;

const StImageWrapper = styled.div`
  aspect-ratio: 328 / 371;
  img {
    width: 100%;
    height: 100%;
  }
`;

const StButton = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  button:nth-child(2) {
    border-left: 1px solid var(--gray400);
  }
`;

const Popup = () => {
  const { closeModal } = useModal('popup');

  const dayClose = () => {
    const expiry = new Date();
    const expiryTime = expiry.getTime() + 1000 * 60 * 60 * 24;
    localStorage.setItem('visitCookieExpiry', JSON.stringify(expiryTime));

    closeModal();
  };

  return (
    <ModalPortal>
      <StPopUp role="dialog">
        <StImageWrapper>
          <picture>
            <source
              srcSet="/assets/popup/desktop.png"
              media="(min-width:1920px)"
              width={558}
              height={663}
            />
            <source
              srcSet="/assets/popup/tablet.png"
              media="(min-width:768px)"
              width={328}
              height={371}
            />
            <img
              src="/assets/popup/mobile.png"
              alt="기대해 재미 가득한 라인업 광고 팝업"
              width={252}
              height={284}
            />
          </picture>
        </StImageWrapper>
        <StButton>
          <button type="button" onClick={dayClose}>
            오늘 하루 보지 않기
          </button>
          <button type="button" onClick={closeModal}>
            닫기
          </button>
        </StButton>
      </StPopUp>
    </ModalPortal>
  );
};

export default Popup;

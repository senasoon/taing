import Carousel from '@/components/carousel/Carousel';
import Popup from '@/components/popup/Popup';
import { rem } from '@/theme/utils';
import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import styled from 'styled-components/macro';
import MainBanner from '@/components/carousel/MainBanner';
import useModal from '@/hooks/useModal';

const StCarouselLayout = styled.main`
  display: flex;
  flex-direction: column;
  gap: ${rem(20)};
  @media (min-width: 768px) {
    gap: ${rem(28)};
  }
  @media (min-width: 1920px) {
    gap: ${rem(36)};
  }
`;

const MainPage = () => {
  const { modalState: isPopupModal, openModal } = useModal('popup');

  useEffect(() => {
    const expiryDate = JSON.parse(
      localStorage.getItem('visitCookieExpiry') || 'null'
    );

    if (expiryDate) {
      const currentDate = new Date().getTime();

      if (currentDate > expiryDate) {
        localStorage.removeItem('visitCookieExpiry');
        openModal();
      }
    } else {
      openModal();
    }
  }, []);

  return (
    <>
      <Helmet>
        <title>타잉 메인</title>
        <meta
          name="description"
          content="타잉의 컨텐츠들을 즐길 수 있는 메인 페이지 입니다."
        />
      </Helmet>
      {isPopupModal.isOpen && <Popup />}
      <MainBanner />
      <StCarouselLayout>
        <Carousel
          carouselTitle="티빙에서 꼭 봐야하는 콘텐츠"
          dataName="programs"
          isItemTitle={true}
        />
        <Carousel
          carouselTitle="Quick VOD"
          dataName="vod"
          vod={true}
          desktopSlides={5}
          tabletSlides={4}
          mobileSlides={3}
          isItemTitle={true}
        />
        <Carousel
          carouselTitle="실시간 인기 프로그램"
          dataName="programs"
          number={true}
          isItemTitle={true}
        />
        <Carousel
          carouselTitle="인기 LIVE"
          dataName="live"
          number={true}
          desktopSlides={5}
          tabletSlides={4}
          mobileSlides={3}
          isItemTitle={true}
        />
        <Carousel
          carouselTitle="오직 티빙에만 있어요"
          dataName="originals"
          desktopSlides={6}
          tabletSlides={4}
          mobileSlides={2}
          isItemTitle={true}
        />
        <Carousel
          dataName="mini-banner"
          desktopSlides={1}
          tabletSlides={1}
          mobileSlides={1}
        />
        <Carousel
          carouselTitle="이벤트"
          dataName="event"
          desktopSlides={5}
          tabletSlides={4}
          mobileSlides={3}
        />
      </StCarouselLayout>
    </>
  );
};
export default MainPage;

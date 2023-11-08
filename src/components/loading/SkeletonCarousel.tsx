import Slider from 'react-slick';
import styled, { css } from 'styled-components/macro';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { getFontStyle, rem } from '@/theme/utils';
import Svg from '@/components/svg/Svg';
import { IArrow } from '@/types/carousel';
import React from 'react';
import { SkeletonAnimation } from '@/styles/SkeletonStyles';

interface ICarousel {
  mobileSlides: number;
  tabletSlides: number;
  desktopSlides: number;
  ratio: string;
  number?: boolean;
  title?: boolean;
}

type IStSlider = Pick<ICarousel, 'desktopSlides'>;

const StArrow = styled.button<IArrow>`
  border: 0;
  position: absolute;
  top: 50%;
  width: ${rem(8)};
  @media (min-width: 768px) {
    width: ${rem(40)};
  }
  @media (min-width: 1920px) {
    width: ${rem(70)};
  }
  ${(props) =>
    props.direction === 'prev' &&
    css`
      left: 0;
      z-index: 1;
      svg {
        color: var(--gray200);
      }
    `}

  ${(props) =>
    props.direction === 'next' &&
    css`
      right: 0;
      svg {
        color: var(--white);
      }
    `}
  transform: translateY(-50%);
  background: radial-gradient(
    circle at center,
    var(--black) 10%,
    transparent 70%
  );
  height: 100%;
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const Arrow = ({ onClick, direction }: IArrow) => {
  return (
    <StArrow
      onClick={onClick}
      direction={direction}
      className={direction}
      aria-label={direction === 'prev' ? '이전 슬라이드' : '다음 슬라이드'}
    >
      <Svg
        id={direction === 'prev' ? 'banner-arrow-left' : 'banner-arrow-right'}
        width="3.8rem"
        height="3.8rem"
      />
    </StArrow>
  );
};

const StCarouselContainer = styled.section`
  position: relative;
  .prev,
  .next,
  .dots-css {
    opacity: 0;
  }

  &:hover {
    .prev,
    .next,
    .dots-css {
      opacity: 1;
    }
  }

  .prev:focus,
  .next:focus,
  .dots-css:focus {
    opacity: 1;
  }

  .slick-track {
    display: flex;
    justify-content: flex-start;
    gap: ${rem(5)};
    margin: 0;
  }
`;

const StSlider = styled(Slider)<IStSlider>`
  .slick-list {
    padding: ${rem(20)} ${rem(8)} 0;
    @media (min-width: 768px) {
      padding: ${rem(20)} ${rem(40)} 0;
    }
    @media (min-width: 1920px) {
      padding: ${rem(20)} ${rem(70)} 0;
    }

    :not(:only-child) {
      .slick-track {
        padding-right: ${rem(8)};
        @media (min-width: 768px) {
          padding-right: ${rem(40)};
        }
        @media (min-width: 1920px) {
          padding-right: ${rem(70)};
        }
      }
      .slick-slide {
        :last-child {
          margin-right: ${rem(8)};
          @media (min-width: 768px) {
            margin-right: ${rem(40)};
          }
          @media (min-width: 1920px) {
            margin-right: ${rem(70)};
          }
        }
      }
    }

    ${(props) =>
      props.desktopSlides === 1 &&
      css`
        .slick-track {
          padding-right: ${rem(8)};
          @media (min-width: 768px) {
            padding-right: ${rem(40)};
          }
          @media (min-width: 1920px) {
            padding-right: ${rem(70)};
          }
        }
        .slick-slide {
          :last-child {
            margin-right: ${rem(8)};
            @media (min-width: 768px) {
              margin-right: ${rem(40)};
            }
            @media (min-width: 1920px) {
              margin-right: ${rem(70)};
            }
          }
        }
      `}
  }

  .slick-slide {
    transition: transform 0.3s ease-in-out;
    position: relative;
    padding-right: ${rem(8)};
    svg {
      position: absolute;
      top: 5px;
      left: 5px;
    }

    img {
      border-radius: 5px;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    figCaption {
      margin-top: ${rem(8)};
      color: var(--gray100);
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
      ${getFontStyle('CarouselS')};
      @media (min-width: 768px) {
        ${getFontStyle('CarouselM')}
      }

      @media (min-width: 1920px) {
        ${getFontStyle('CarouselL')}
      }
    }

    &:hover {
      transform: translateY(-10px);
      figCaption {
        color: var(--white);
      }
    }
  }

  .dots-css {
    position: absolute;
    padding: 0;
    top: ${rem(-30)};
    right: ${rem(8)};

    @media (min-width: 768px) {
      right: ${rem(40)};
    }
    @media (min-width: 1920px) {
      right: ${rem(70)};
    }
  }

  .dots-css li {
    position: relative;
    display: inline-block;
    width: ${rem(15)};
    height: ${rem(15)};
    padding: 0;
    cursor: pointer;
  }

  .dots-css li button {
    font-size: 0;
    line-height: 0;
    display: block;
    border: 0;
    background: 0 0;
    width: inherit;
    height: inherit;
  }

  .dots-css li button:before {
    font-size: 1.2rem;
    line-height: 20px;
    position: absolute;
    top: 0;
    left: 0;
    content: '•';
    color: var(--gray300);
  }

  .dots-css li.slick-active button:before {
    color: var(--white);
  }
`;

const StSkeletonImage = styled(SkeletonAnimation)<{ ratio: string }>`
  width: 100%;
  aspect-ratio: ${(props) => props.ratio};
`;

const StTitleBox = styled(SkeletonAnimation)<{ isRanked: boolean }>`
  margin-top: ${rem(8)};
  width: ${rem(150)};
  height: ${(props) => (props.isRanked ? rem(30) : rem(20))};
`;

const SkeletonCarousel = ({
  mobileSlides = 3,
  tabletSlides = 5,
  desktopSlides = 7,
  ratio,
  number,
  title,
}: ICarousel) => {
  const settings = {
    dots: true,
    dotsClass: 'dots-css',
    infinite: false,
    speed: 500,
    rows: 1,
    slidesToShow: desktopSlides,
    slidesToScroll: desktopSlides,
    nextArrow: <Arrow direction="next" />,
    prevArrow: <Arrow direction="prev" />,
    responsive: [
      {
        breakpoint: 1920,
        settings: {
          slidesToShow: tabletSlides,
          slidesToScroll: tabletSlides,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: mobileSlides,
          slidesToScroll: mobileSlides,
        },
      },
    ],
  };

  return (
    <StCarouselContainer>
      <StSlider {...settings} desktopSlides={desktopSlides}>
        {Array(desktopSlides * 2)
          .fill(true)
          .map((_, index) => {
            return (
              <React.Fragment key={index}>
                <StSkeletonImage ratio={ratio} />
                {title && <StTitleBox isRanked={number ? true : false} />}
              </React.Fragment>
            );
          })}
      </StSlider>
    </StCarouselContainer>
  );
};

export default SkeletonCarousel;

import { IPrograms } from '@/types/programs';

export interface IArrow {
  onClick?: () => void;
  direction: 'prev' | 'next';
}

export interface ICarousel {
  carouselTitle?: string;
  count?: boolean;
  dataName?: string;
  dataProp?: IPrograms[];
  mobileSlides?: number;
  tabletSlides?: number;
  desktopSlides?: number;
  vod?: boolean;
  number?: boolean;
  isItemTitle?: boolean;
}

export interface ICarouselAuto {
  speed: string;
}

export interface ICarouselAutoData {
  id: string;
  mobileUrl: string;
  desktopUrl: string;
  alt: string;
}

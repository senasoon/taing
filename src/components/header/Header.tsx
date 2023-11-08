import styled, { css } from 'styled-components/macro';
import { getFontStyle, rem } from '@/theme/utils';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import SearchModal from '@/components/search/SearchModal';
import Svg from '@/components/svg/Svg';
import useThrottle from '@/hooks/useThrottle';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { searchKeywordState } from '@/store/search/index';
import useModal from '@/hooks/useModal';
import LogoModal from '@/components/header/LogoModal';
import StA11yHidden from '@/components/a11yhidden/A11yHidden';
import { authStateAtom } from '@/store/authState';

interface IHeader {
  backgroundColor?: 'gradient' | 'black';
  direction?: 'left' | 'right';
}

const StHeader = styled.header<IHeader>`
  position: fixed;
  z-index: 3;
  width: 100%;
  top: 0;
  left: 0;
  display: flex;
  justify-content: space-between;
  box-sizing: border-box;
  height: 38px;
  padding: ${rem(10)} ${rem(12)};
  background: linear-gradient(var(--black), 20%, rgba(0, 0, 0, 0.05));
  transition: backdrop-filter 0.1s ease;

  ${(props) =>
    props.backgroundColor === 'gradient' &&
    css`
      backdrop-filter: blur(100px) brightness(30%) opacity(0);
    `}

  ${(props) =>
    props.backgroundColor === 'black' &&
    css`
      backdrop-filter: blur(100px) brightness(30%) opacity(1);
    `}

  button {
    background-color: transparent;
    border: 0;
    padding: 0;
  }

  @media (min-width: 768px) {
    height: 56px;
    padding: ${rem(16)} ${rem(40)};
  }
  @media (min-width: 1920px) {
    height: 100px;
    padding: ${rem(29)} ${rem(70)};
  }
`;

const StGnb = styled.div<IHeader>`
  display: flex;
  gap: ${(props) => (props.direction === 'left' ? rem(14) : rem(16))};
  align-items: center;
  @media (min-width: 768px) {
    gap: ${(props) => (props.direction === 'left' ? rem(28) : rem(24))};
  }
  @media (min-width: 1920px) {
    gap: ${(props) => (props.direction === 'left' ? rem(52) : rem(40))};
  }

  button,
  a {
    svg {
      color: var(--gray200);
    }

    &:hover,
    &:focus {
      color: var(--white);
      svg {
        color: var(--white);
      }
    }
  }
`;

const StLink = styled(Link)`
  ${getFontStyle('ParagraphS')}
  text-decoration: none;
  color: var(--gray200);
  display: flex;
  align-items: center;
  gap: ${rem(4)};

  @media (min-width: 768px) {
    ${getFontStyle('ParagraphM')}
  }
  @media (min-width: 1920px) {
    ${getFontStyle('ParagraphL')}
    gap: ${rem(10)};
  }
`;

const StProfile = styled.div`
  position: relative;
  cursor: pointer;
  div {
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease-in;
  }

  &:hover,
  :focus-within {
    div {
      visibility: visible;
      opacity: 1;
    }
  }
`;

const Header = () => {
  const {
    modalState: isSearchModal,
    openModal,
    closeModal,
  } = useModal('search');
  const [isBlackBackground, setIsBlackBackground] = useState(false);
  const [searchParams] = useSearchParams();
  const setSearchKeyword = useSetRecoilState(searchKeywordState);
  const user = useRecoilValue(authStateAtom).user;
  const navigate = useNavigate();

  const closeSearchModal = () => {
    if (!searchParams.get('keyword')) {
      setSearchKeyword('');
    }
    closeModal();
  };

  const navigateToPage = (page: string) => {
    closeModal();
    setSearchKeyword('');
    navigate(page);
  };

  const toggleBackgroundColor = () => {
    if (window.pageYOffset > 0) {
      setIsBlackBackground(true);
    } else {
      setIsBlackBackground(false);
    }
  };

  const throttleScroll = useThrottle(toggleBackgroundColor, 500);

  useEffect(() => {
    window.addEventListener('scroll', throttleScroll);
    return () => window.removeEventListener('scroll', throttleScroll);
  }, []);

  return (
    <>
      <StHeader backgroundColor={isBlackBackground ? 'black' : 'gradient'}>
        <StGnb direction="left">
          <StA11yHidden as="h1">타잉</StA11yHidden>
          <button onClick={() => navigateToPage('/')}>
            <Svg
              id="logo"
              width={77}
              height={24}
              tabletW={105}
              tabletH={33}
              desktopW={132}
              desktopH={42}
              aria-label="로고"
            />
          </button>
          {user && (
            <>
              <StLink to="/main">
                <Svg
                  id="live-default"
                  width={20}
                  height={20}
                  tabletW={27}
                  tabletH={27}
                  desktopW={34}
                  desktopH={34}
                  aria-label="실시간 방송"
                />
                실시간
              </StLink>
              <StLink to="/main">TV프로그램</StLink>
              <StLink to="/main">영화</StLink>
              <StLink to="/main">
                <Svg
                  id="paramount-default"
                  width={60}
                  height={20}
                  tabletW={86}
                  tabletH={27}
                  desktopW={112}
                  desktopH={34}
                  aria-label="파라마운트"
                />
              </StLink>
            </>
          )}
        </StGnb>
        <StGnb direction="right">
          {user && (
            <>
              {(!searchParams.get('keyword') || isSearchModal.isOpen) && (
                <button
                  onClick={isSearchModal.isOpen ? closeSearchModal : openModal}
                  type="button"
                  aria-label={isSearchModal.isOpen ? '닫기' : '검색'}
                >
                  {!isSearchModal.isOpen && (
                    <Svg
                      id="search-default"
                      width={24}
                      height={24}
                      tabletW={32}
                      tabletH={32}
                      desktopW={40}
                      desktopH={40}
                    />
                  )}
                  {isSearchModal.isOpen && (
                    <Svg
                      id="cancel-default"
                      width={30}
                      height={30}
                      tabletW={38}
                      tabletH={38}
                      desktopW={46}
                      desktopH={46}
                    />
                  )}
                </button>
              )}
              <StProfile tabIndex={0}>
                <Svg
                  id="profile"
                  width={24}
                  height={24}
                  tabletW={32}
                  tabletH={32}
                  desktopW={40}
                  desktopH={40}
                  aria-label="프로필"
                />
                <LogoModal />
              </StProfile>
            </>
          )}
        </StGnb>
      </StHeader>
      {isSearchModal.isOpen && <SearchModal />}
    </>
  );
};

export default Header;

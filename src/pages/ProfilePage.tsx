import {
  StProfileTitle,
  StProfileSubTitle,
  StProfileItems,
  StProfileItem,
  StProfileImage,
  StProfileButton,
  StProfileSvg,
  StSvg,
} from '@/styles/ProfileStyles';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { dbService } from '@/firebase/app';
import { Helmet } from 'react-helmet-async';
import Svg from '@/components/svg/Svg';
import { authStateAtom } from '@/store/authState';
import { useRecoilValue } from 'recoil';

interface IProfile {
  id: string;
  name: string;
  mobileUrl: string;
  storageID: string;
}

const ProfilePage = () => {
  const navigate = useNavigate();
  const user = useRecoilValue(authStateAtom).user;
  const [profiles, setProfiles] = useState<IProfile[]>([]);
  const goToProfileEdit = (profile: IProfile) => {
    const encodedUrl = encodeURIComponent(profile.mobileUrl);
    navigate(
      `/profile-edit?id=${profile.id}&name=${profile.name}&url=${encodedUrl}&storage=${profile.storageID}`
    );
  };
  const goToProfileCreate = () => {
    navigate('/profile-create');
  };
  const goToMainPage = () => {
    navigate('/main');
  };

  useEffect(() => {
    if (user) {
      dbService
        .collection('users')
        .doc(user.uid)
        .collection('profile')
        .onSnapshot(
          (querySnapshot) => {
            const profilesArray: IProfile[] = [];
            querySnapshot.forEach((doc) => {
              profilesArray.push({
                id: doc.id,
                name: doc.data().name,
                mobileUrl: doc.data().mobileUrl,
                storageID: doc.data().storageID,
              });
            });
            setProfiles(profilesArray);
          },
          (error) => {
            navigate('/*');
          }
        );
    }
  }, [user]);

  return (
    <>
      <Helmet>
        <title>프로필 선택 페이지</title>
        <meta
          name="description"
          content="타잉의 프로필들을 선택할 수 있는 선택 페이지 입니다."
        />
      </Helmet>
      <StProfileTitle>프로필 선택</StProfileTitle>
      <StProfileSubTitle>시청할 프로필을 선택해주세요.</StProfileSubTitle>
      <StProfileItems>
        {profiles.map((profile) => {
          return (
            <li key={profile.id}>
              <StProfileItem onClick={goToMainPage}>
                <StProfileImage src={profile.mobileUrl} alt="프로필 이미지" />
              </StProfileItem>
              <p>{profile.name}</p>
              <StProfileButton onClick={() => goToProfileEdit(profile)}>
                프로필 편집
              </StProfileButton>
            </li>
          );
        })}
        {profiles.length < 4 && (
          <li>
            <StProfileSvg onClick={goToProfileCreate}>
              <StSvg>
                <Svg id="profile-plus" width={30} height={30} />
              </StSvg>
            </StProfileSvg>
            <p>프로필 추가</p>
          </li>
        )}
      </StProfileItems>
    </>
  );
};

export default ProfilePage;

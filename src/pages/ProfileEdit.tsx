import {
  StProfileTitle,
  StProfileEditButton,
  StDeleteButton,
} from '@/styles/ProfileStyles';
import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { dbService } from '@/firebase/app';
import StA11yHidden from '@/components/a11yhidden/A11yHidden';
import ProfileDeleteModal from '@/components/profile/ProfileDeleteModal';
import {
  StCreatePageGroupButton,
  StName,
  StUploadImage,
  StUploadImageView,
} from '@/pages/ProfileCreate';
import Svg from '@/components/svg/Svg';
import { Helmet } from 'react-helmet-async';
import useModal from '@/hooks/useModal';
import { useRecoilValue } from 'recoil';
import { authStateAtom } from '@/store/authState';

interface IProfileNameForm {
  profileId: string;
  defaultName: string;
  storageID: string;
  onClose: () => void;
}

const ProfileNameForm = ({
  profileId,
  defaultName,
  storageID,
}: IProfileNameForm) => {
  const [name, setName] = useState<string>(defaultName);
  const user = useRecoilValue(authStateAtom).user;
  const navigate = useNavigate();
  const { modalState: isProfileDeleteModal, openModal } =
    useModal('profile-delete');

  const goToProfile = () => {
    navigate('/profile-page');
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await dbService
        .collection('users')
        .doc(user!.uid)
        .collection('profile')
        .doc(profileId)
        .update({ name });
      alert('프로필 편집 완료!');
      navigate('/profile-page');
    } catch (error) {
      navigate('/*');
    }
  };
  return (
    <>
      {isProfileDeleteModal.isOpen && (
        <ProfileDeleteModal profileId={profileId} storageID={storageID} />
      )}
      <form onSubmit={handleSubmit}>
        <StA11yHidden as="label" htmlFor={name}>
          프로필 이름
        </StA11yHidden>
        <StName
          type="text"
          id="name"
          value={name}
          placeholder="이름"
          onChange={(e) => setName(e.target.value)}
        />
        <StCreatePageGroupButton>
          <button type="submit">확인</button>
          <button type="button" onClick={goToProfile}>
            취소
          </button>
        </StCreatePageGroupButton>
        <StDeleteButton type="button" onClick={openModal}>
          프로필 삭제
        </StDeleteButton>
      </form>
    </>
  );
};

const ProfileEdit = () => {
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const id = params.get('id');
  const name = params.get('name');
  const url = params.get('url');
  const storageID = params.get('storage');

  const [profileName, setProfileName] = useState<string | null>(name);

  return (
    <>
      <Helmet>
        <title>프로필 편집</title>
        <meta
          name="description"
          content="타잉의 프로필들을 편집할 수 있는 편집 페이지 입니다."
        />
      </Helmet>
      <StProfileTitle>프로필 편집</StProfileTitle>
      <StUploadImageView>
        <StUploadImage src={url || undefined} alt="변경할 프로필 사진입니다." />
        <StProfileEditButton aria-label="이미지 업로드">
          <button>
            <Svg
              id="profile-edit-pencil"
              width={35}
              height={35}
              tabletW={77}
              tabletH={77}
              desktopW={132}
              desktopH={132}
            />
          </button>
        </StProfileEditButton>
      </StUploadImageView>
      <ProfileNameForm
        profileId={id || ''}
        defaultName={profileName || ''}
        storageID={storageID || ''}
        onClose={() => setProfileName(name)}
      />
    </>
  );
};

export default ProfileEdit;

import { useRef, useState } from 'react';
import { getFontStyle } from '@/theme/utils';
import {
  StContainer,
  StForm,
  StFormInner,
  StInner,
  StTitle,
} from '@/styles/FormStyles';
import styled from 'styled-components/macro';
import FormButton from '@/components/button/FormButton';
import FormInput from '@/components/forminput/FormInput';
import { useSignUp } from '@/firebase/auth';
import { useCreateAuthUser } from '@/firebase/firestore';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { IFormState } from '@/types/signForm';

interface DescriptionProps {
  isEmail?: boolean;
  isPassword?: boolean;
  isPasswordConfirm?: boolean;
}

const StHeaderDescription = styled.p`
  color: var(--gray300);
  ${getFontStyle('LabelS')};
  @media (min-width: 768px) {
    ${getFontStyle('LabelM')};
  }
  @media (min-width: 1920px) {
    ${getFontStyle('LabelXL')};
  }
`;

const StEmailDescription = styled.p<DescriptionProps>`
  color: ${(props) => (props.isEmail ? `var(--gray400)` : `var(--primary)`)};
  ${getFontStyle('ParagraphS')};
  @media (min-width: 768px) {
    ${getFontStyle('ParagraphM')};
  }
  @media (min-width: 1920px) {
    ${getFontStyle('ParagraphL')};
  }
`;

const StPwDescription = styled.p<DescriptionProps>`
  color: ${(props) => (props.isPassword ? `var(--gray400)` : `var(--primary)`)};
  ${getFontStyle('ParagraphS')};
  @media (min-width: 768px) {
    ${getFontStyle('ParagraphM')};
  }
  @media (min-width: 1920px) {
    ${getFontStyle('ParagraphL')};
  }
`;

const StPwConfirmDescription = styled.p<DescriptionProps>`
  color: ${(props) =>
    props.isPasswordConfirm ? `var(--gray400)` : `var(--primary)`};
  ${getFontStyle('ParagraphS')};
  @media (min-width: 768px) {
    ${getFontStyle('ParagraphM')};
  }
  @media (min-width: 1920px) {
    ${getFontStyle('ParagraphL')};
  }
`;

const RegisterForm = (): JSX.Element => {
  const initialFormState: IFormState = {
    email: '',
    password: '',
    passwordConfirm: '',
  };

  const REGEXP_PW =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[~!@#$%^&*])[A-Za-z\d@$!%*#?&]{8,15}$/;
  const REGEXP_EMAIL = /^[a-z0-9]+@[a-z]+\.[a-z]{2,3}$/;

  const [isEmail, setIsEmail] = useState<boolean>(true);
  const [isPassword, setIsPassword] = useState<boolean>(true);
  const [isPasswordConfirm, setIsPasswordConfirm] = useState<boolean>(true);
  const [isActive, setIsActive] = useState<boolean>(false);

  const { signUp } = useSignUp();
  const { createAuthUser } = useCreateAuthUser();

  const formStateRef = useRef<IFormState>(initialFormState);
  const { email, password, passwordConfirm } = formStateRef.current;
  const navigate: NavigateFunction = useNavigate();

  const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    formStateRef.current[name] = value || '';

    if (!REGEXP_EMAIL.test(formStateRef.current[name] as string)) {
      setIsEmail(false);
      setIsActive(false);
      return;
    } else {
      setIsEmail(true);
      if (password && passwordConfirm && isPassword && isPasswordConfirm) {
        setIsActive(true);
      }
    }
  };

  const handleChangePw = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    formStateRef.current[name] = value;

    if (!REGEXP_PW.test(formStateRef.current[name] as string)) {
      setIsPassword(false);
      setIsActive(false);
      return;
    } else {
      setIsPassword(true);
      if (passwordConfirm && email && isEmail && isPasswordConfirm) {
        setIsActive(true);
      }
    }
  };

  const handleChangePwConfirm = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    formStateRef.current[name] = value;

    if (!Object.is(password, formStateRef.current[name])) {
      setIsPasswordConfirm(false);
      setIsActive(false);
      return;
    } else {
      setIsPasswordConfirm(true);
      if (isEmail && isPassword) {
        setIsActive(true);
      }
    }
  };

  const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!REGEXP_EMAIL.test(email)) {
      setIsEmail(false);
      alert('올바른 이메일을 입력해주세요.');
      return;
    }
    if (!REGEXP_PW.test(password)) {
      setIsPassword(false);
      alert('비밀번호를 맞게 입력해주세요.');
      return;
    }
    if (!Object.is(password, passwordConfirm)) {
      setIsPasswordConfirm(false);
      alert('위와 같은 비밀번호를 입력해주세요.');
      return;
    }

    const user = await signUp(email, password);

    if (!user) {
      alert('회원가입에 실패하였습니다.');
      return;
    }

    await createAuthUser(user, {});

    alert('회원가입 및 유저 생성');
    navigate('/main');
  };

  return (
    <>
      <StContainer>
        <StInner>
          <div>
            <StTitle>티빙 회원가입</StTitle>
            <StHeaderDescription>
              이메일과 비밀번호로 간편하게 티빙을 시작하세요!
            </StHeaderDescription>
          </div>
          <StForm onSubmit={handleSubmit}>
            <StFormInner>
              <FormInput
                label="이메일"
                name="email"
                type="email"
                placeholder="이메일"
                onChange={handleChangeEmail}
                autoComplete="email"
                required
              />
              <StEmailDescription isEmail={isEmail}>
                {isEmail
                  ? '올바른 이메일 형식을 작성해주세요(예: euid@euid.dev)'
                  : '올바르지 않은 이메일입니다.'}
              </StEmailDescription>
            </StFormInner>
            <StFormInner>
              <FormInput
                label="비밀번호"
                name="password"
                type="password"
                placeholder="비밀번호"
                onChange={handleChangePw}
                required
              />
              <StPwDescription isPassword={isPassword}>
                {isPassword
                  ? '영문, 숫자, 특수문자(~!@#$&^&*) 조합 8~15자리'
                  : '올바르지 않은 비밀번호입니다.'}
              </StPwDescription>
            </StFormInner>
            <StFormInner>
              <FormInput
                label="비밀번호 확인"
                name="passwordConfirm"
                type="password"
                placeholder="비밀번호 확인"
                onChange={handleChangePwConfirm}
                required
              />
              <StPwConfirmDescription isPasswordConfirm={isPasswordConfirm}>
                {isPasswordConfirm
                  ? '위와 같은 비밀번호를 입력해주세요.'
                  : '비밀번호가 일치하지 않습니다.'}
              </StPwConfirmDescription>
            </StFormInner>
            <FormButton type="submit" isActive={isActive}>
              가입하기
            </FormButton>
          </StForm>
        </StInner>
      </StContainer>
    </>
  );
};

export default RegisterForm;

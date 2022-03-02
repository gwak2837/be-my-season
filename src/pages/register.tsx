import Link from 'next/link'
import { ReactElement, useState } from 'react'
import { useForm } from 'react-hook-form'
import PageHead from 'src/components/PageHead'
import SingleSelectionCheckbox from 'src/components/SingleSelectionCheckbox'
import NavigationLayout from 'src/layouts/NavigationLayout'
import Checkbox from 'src/svgs/Checkbox'
import { emailRegEx, formatPhoneNumber } from 'src/utils'
import styled from 'styled-components'

import { DisplayNoneInput } from './login'

enum Sex {
  unknown,
  male,
  female,
  transMale,
  transFemale,
  intersex,
}

function encodeSex(sex: string) {
  switch (sex) {
    case '남성':
      return Sex.male
    case '여성':
      return Sex.female
    default:
      return Sex.unknown
  }
}

type RegisterForm = {
  loginId: string
  password: string
  passwordConfirm: string
  nickname: string
  profileImageUrl: string
  email: string
  sex: Sex
  birth: string
  phoneNumber: string
  termsOfService: boolean
  privacyPolicy: boolean
}

export const GridForm = styled.form`
  display: grid;
  gap: 1.5rem;

  max-width: 500px;
  margin: auto;
  padding: 2rem 1rem;
`

export const GridLi = styled.li`
  display: grid;
  gap: 0.6rem;
`

export const Label = styled.label`
  > span {
    color: #de684a;
    vertical-align: sub;
  }
`

export const Input = styled.input`
  border: 1px solid #c4c4c4;
  padding: 1rem;
`

export const RedH5 = styled.h5`
  color: #800000;
`

export const PrimaryButton = styled.button`
  background: #de684a;
  color: #fff;
  padding: 1rem;
`

export const FlexAround = styled.div`
  display: flex;
  justify-content: space-around;
`

const FlexCenter = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`

const A = styled.a`
  color: #000;
  > span {
    color: #de684a;
  }
`

const description = ''

export default function RegisterPage() {
  const {
    formState: { errors },
    getValues,
    handleSubmit,
    register,
    setValue,
    watch,
  } = useForm<RegisterForm>({
    defaultValues: {
      loginId: '',
      password: '',
      passwordConfirm: '',
      nickname: '',
      profileImageUrl: '',
      email: '',
      birth: '',
      phoneNumber: '',
      termsOfService: false,
      privacyPolicy: false,
    },
  })

  function registerUser({
    nickname,
    email,
    sex,
    birth,
    phoneNumber,
    loginId,
    password,
    profileImageUrl,
  }: RegisterForm) {
    fetch('/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        nickname,
        profileImageUrl,
        email,
        sex,
        birthyear: birth.slice(0, 4),
        birthday: birth.slice(5, 7) + birth.slice(8, 10),
        phoneNumber,
        loginId,
        password,
      }),
    })
  }

  return (
    <PageHead title="회원가입 - Be:MySeason" description={description}>
      <GridForm onSubmit={handleSubmit(registerUser)}>
        <GridLi>
          <Label htmlFor="loginId">
            아이디 <span>*</span>
          </Label>
          <Input
            id="loginId"
            placeholder="5자 이상, 20자 이내로 입력해주세요"
            {...register('loginId', {
              required: '아이디를 입력해주세요',
              minLength: {
                value: 5,
                message: '5자 이상 입력해주세요',
              },
              maxLength: {
                value: 20,
                message: '20자 이내로 입력해주세요',
              },
              // validate: checkNicknameUniquenessDebouncly,
            })}
          />
          <RedH5>{errors.loginId?.message}</RedH5>
        </GridLi>

        <GridLi>
          <Label htmlFor="password">
            비밀번호 <span>*</span>
          </Label>
          <Input
            id="password"
            placeholder="하나 이상의 대문자, 소문자, 숫자, 특수문자를 조합해주세요"
            type="password"
            {...register('password', {
              required: '비밀번호을 입력해주세요',
              minLength: {
                value: 8,
                message: '8자 이상 입력해주세요',
              },
              maxLength: {
                value: 50,
                message: '50자 이내로 입력해주세요',
              },
              pattern: {
                value: /(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-])/u,
                message: '하나 이상의 대문자, 소문자, 숫자, 특수문자를 조합해주세요',
              },
            })}
          />
          <RedH5>{errors.password?.message}</RedH5>
        </GridLi>

        <GridLi>
          <Label htmlFor="passwordConfirm">
            비밀번호 확인 <span>*</span>
          </Label>
          <Input
            id="passwordConfirm"
            type="password"
            {...register('passwordConfirm', {
              required: '비밀번호을 입력해주세요',
              minLength: {
                value: 8,
                message: '8자 이상 입력해주세요',
              },
              maxLength: {
                value: 50,
                message: '50자 이내로 입력해주세요',
              },
              validate: (value) =>
                getValues('password') === value || '동일한 비밀번호를 입력해주세요',
            })}
          />
          <RedH5>{errors.passwordConfirm?.message}</RedH5>
        </GridLi>

        <GridLi>
          <Label htmlFor="nickname">
            이름 <span>*</span>
          </Label>
          <Input
            id="nickname"
            placeholder="2자 이상, 20자 이내로 입력해주세요"
            {...register('nickname', {
              required: '이름을 입력해주세요',
              minLength: {
                value: 2,
                message: '2자 이상 입력해주세요',
              },
              maxLength: {
                value: 20,
                message: '20자 이내로 입력해주세요',
              },
            })}
          />
          <RedH5>{errors.nickname?.message}</RedH5>
        </GridLi>

        <GridLi>
          <Label htmlFor="profileImageUrl">프로필 사진</Label>
          <Input
            id="profileImageUrl"
            {...register('profileImageUrl', {
              pattern: {
                value: /^[\uAC00-\uD79D ]+$/u,
                message: 'URL 형식에 맞게 입력해주세요',
              },
            })}
          />
          <RedH5>{errors.profileImageUrl?.message}</RedH5>
        </GridLi>

        <GridLi>
          <Label htmlFor="email">
            이메일 <span>*</span>
          </Label>
          <Input
            id="email"
            placeholder="be@myseason.co.kr"
            type="email"
            {...register('email', {
              required: '이메일을 입력해주세요',
              minLength: {
                value: 2,
                message: '2자 이상 입력해주세요',
              },
              maxLength: {
                value: 255,
                message: '255자 이내로 입력해주세요',
              },
              pattern: {
                value: emailRegEx,
                message: '이메일 형식에 맞게 입력해주세요',
              },
              // validate: checkNicknameUniquenessDebouncly,
            })}
          />
          <RedH5>{errors.email?.message}</RedH5>
        </GridLi>

        <GridLi>
          <Label htmlFor="sex">
            성별 <span>*</span>
          </Label>
          <SingleSelectionCheckbox
            values={['남성', '여성']}
            initialValue={getValues('sex')}
            onChange={(newValue) =>
              setValue('sex', encodeSex(newValue), { shouldValidate: Boolean(errors.sex) })
            }
          />
          <DisplayNoneInput
            id="sex"
            {...register('sex', {
              required: '성별을 입력해주세요',
            })}
          />
          <RedH5>{errors.sex?.message}</RedH5>
        </GridLi>

        <GridLi>
          <Label htmlFor="birth">
            생년월일 <span>*</span>
          </Label>
          <Input
            id="birth"
            type="date"
            {...register('birth', {
              required: '생년월일을 입력해주세요',
              validate: (value) =>
                new Date(value).getTime() < Date.now() || '미래에 태어날 수 없습니다',
            })}
          />
          <RedH5>{errors.birth?.message}</RedH5>
        </GridLi>

        <GridLi>
          <Label htmlFor="phoneNumber">
            핸드폰 번호 <span>*</span>
          </Label>
          <Input
            id="phoneNumber"
            onKeyUp={(e) =>
              ((e.target as HTMLInputElement).value = formatPhoneNumber(
                (e.target as HTMLInputElement).value
              ))
            }
            type="tel"
            {...register('phoneNumber', {
              required: '핸드폰 번호를 입력해주세요',
              minLength: {
                value: 10,
                message: '10자 이상 입력해주세요',
              },
              maxLength: {
                value: 20,
                message: '20자 이내로 입력해주세요',
              },
              pattern: {
                value: /^0[0-9]{2}-[0-9]{4}-[0-9]{4}$/,
                message: '휴대폰 번호를 형식에 맞게 입력해주세요',
              },
              // validate: checkNicknameUniquenessDebouncly,
            })}
          />
          <RedH5>{errors.phoneNumber?.message}</RedH5>
        </GridLi>

        <GridLi>
          <FlexCenter>
            <Label htmlFor="termsOfService">
              <Checkbox isChecked={watch('termsOfService')} />
              &nbsp;&nbsp;
              <A href="/terms-of-service" target="_blank" style={{ color: 'black' }}>
                이용약관 동의 <span>(필수)</span>
              </A>
            </Label>
            <DisplayNoneInput
              id="termsOfService"
              type="checkbox"
              {...register('termsOfService', {
                validate: (value) => value === true || '이용약관에 동의해주세요',
              })}
            />
          </FlexCenter>
          <FlexCenter>
            <Label htmlFor="privacyPolicy">
              <Checkbox isChecked={watch('privacyPolicy')} />
              &nbsp;&nbsp;
              <A href="/privacy-policy" target="_blank" style={{ color: 'black' }}>
                개인정보처리방침 동의 <span>(필수)</span>
              </A>
            </Label>
            <DisplayNoneInput
              id="privacyPolicy"
              type="checkbox"
              {...register('privacyPolicy', {
                validate: (value) => value || '개인정보처리방침에 동의해주세요',
              })}
            />
          </FlexCenter>
          <RedH5>{errors.termsOfService?.message ?? errors.privacyPolicy?.message}</RedH5>
        </GridLi>

        <GridLi>
          <DisplayNoneInput type="checkbox" />
          {/* <Checkbox isChecked={checkedValue === value} /> */}
        </GridLi>

        <PrimaryButton type="submit">회원가입</PrimaryButton>

        <FlexAround>
          <Link href="/find" passHref>
            <a>아이디/비밀번호 찾기</a>
          </Link>

          <Link href="/login" passHref>
            <a>로그인</a>
          </Link>
        </FlexAround>
      </GridForm>
    </PageHead>
  )
}

RegisterPage.getLayout = function getLayout(page: ReactElement) {
  return <NavigationLayout>{page}</NavigationLayout>
}

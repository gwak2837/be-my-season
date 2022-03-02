import Link from 'next/link'
import { ReactElement, useState } from 'react'
import { useForm } from 'react-hook-form'
import PageHead from 'src/components/PageHead'
import NavigationLayout from 'src/layouts/NavigationLayout'
import Checkbox from 'src/svgs/Checkbox'
import KakaoIcon from 'src/svgs/kakao.svg'
import { sha256 } from 'src/utils'
import styled from 'styled-components'

import { FlexAround, GridForm, PrimaryButton, RedH5 } from './register'

type LoginForm = {
  loginId: string
  password: string
}

const FlexLabel = styled.label`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 1rem 0;
  gap: 5px;
  cursor: pointer;
`

export const DisplayNoneInput = styled.input`
  display: none;
`

const Grid = styled.div`
  display: grid;
`

const Height = styled.div`
  height: calc(100vh - 5.2rem);

  > form {
    padding-top: calc((100vh - 30.6rem) / 2);
  }
  > form > span {
    text-align: center;
  }
`

const Input = styled.input`
  padding: 1rem;
  border: none;
  box-shadow: 0 0 0 1px #c4c4c4;
`

const KakaoButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  cursor: pointer;

  width: 100%;
  background: #fee500;
  padding: 1rem 1rem 1rem calc(1.5rem + 24px);
  margin: 0 0 2rem;
  transition: background 0.3s ease-in;
  border-radius: 10px;

  :hover {
    background: #fee500c0;
  }

  svg {
    position: absolute;
    top: 50%;
    left: 1rem;
    transform: translateY(-50%);
  }
`

function goToKakaoLoginPage() {
  window.location.replace(
    `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY}&redirect_uri=${window.location.origin}/api/auth/kakao`
  )
}

const description = ''

export default function LoginPage() {
  const [isChecked, setIsChecked] = useState(
    Boolean(globalThis.sessionStorage?.getItem('autoLogin'))
  )

  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<LoginForm>({
    defaultValues: {
      loginId: '',
      password: '',
    },
  })

  function login({ loginId, password }: any) {
    fetch('/api/auth', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ loginId, password: sha256(password) }),
    })
  }

  return (
    <PageHead title="로그인 - Be:MySeason" description={description}>
      <Height>
        <GridForm onSubmit={handleSubmit(login)}>
          <Grid>
            <Input
              id="loginId"
              placeholder="아이디"
              {...register('loginId', {
                required: '아이디를 입력해주세요',
              })}
            />
            <Input
              id="password"
              placeholder="비밀번호"
              type="password"
              {...register('password', {
                required: '비밀번호을 입력해주세요',
              })}
            />
            {(errors.loginId?.message ?? errors.password?.message) && <br />}
            <RedH5>{errors.loginId?.message ?? errors.password?.message}</RedH5>
            <FlexLabel htmlFor="auto-login">
              <DisplayNoneInput
                id="auto-login"
                type="checkbox"
                onChange={(e) => {
                  if (e.target.checked) {
                    sessionStorage.setItem('autoLogin', 'true')
                    setIsChecked(true)
                  } else {
                    sessionStorage.removeItem('autoLogin')
                    setIsChecked(false)
                  }
                }}
              />
              <Checkbox isChecked={isChecked} />
              로그인 상태를 유지할게요
            </FlexLabel>

            <PrimaryButton type="submit">로그인</PrimaryButton>
          </Grid>

          <FlexAround>
            <Link href="/register" passHref>
              <a>아이디/비밀번호 찾기</a>
            </Link>
            <Link href="/register" passHref>
              <a>회원가입</a>
            </Link>
          </FlexAround>

          <span>또는</span>

          <KakaoButton onClick={goToKakaoLoginPage} type="button">
            <KakaoIcon />
            카카오톡으로 3초 만에 시작하기
          </KakaoButton>
        </GridForm>
      </Height>
    </PageHead>
  )
}

LoginPage.getLayout = function getLayout(page: ReactElement) {
  return <NavigationLayout>{page}</NavigationLayout>
}

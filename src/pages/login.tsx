import Link from 'next/link'
import { ReactElement, useState } from 'react'
import PageHead from 'src/components/PageHead'
import NavigationLayout from 'src/layouts/NavigationLayout'
import Checkbox from 'src/svgs/Checkbox'
import KakaoIcon from 'src/svgs/kakao.svg'
import styled from 'styled-components'

const Label = styled.label`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 15px 0;
  gap: 5px;
  cursor: pointer;
`

const AutoLoginInput = styled.input`
  display: none;
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

  function login({ loginId, password }: any) {
    fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ loginId, password: password }),
    })
  }

  return (
    <PageHead title="로그인 - Be:MySeason" description={description}>
      <form onSubmit={login}>
        <input />
        <input />
        <button type="submit">로그인</button>
      </form>

      <Label htmlFor="auto-login">
        <AutoLoginInput
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
      </Label>

      <Link href="/register" passHref>
        <a>아이디/비밀번호 찾기</a>
      </Link>

      <Link href="/register" passHref>
        <a>회원가입</a>
      </Link>

      <KakaoButton onClick={goToKakaoLoginPage}>
        <KakaoIcon />
        카카오톡으로 3초 만에 시작하기
      </KakaoButton>
    </PageHead>
  )
}

LoginPage.getLayout = function getLayout(page: ReactElement) {
  return <NavigationLayout>{page}</NavigationLayout>
}

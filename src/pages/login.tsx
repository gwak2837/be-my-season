import { ReactElement } from 'react'
import PageHead from 'src/components/PageHead'
import NavigationLayout from 'src/layouts/NavigationLayout'
import KakaoIcon from 'src/svgs/kakao.svg'
import styled from 'styled-components'

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
  return (
    <PageHead title="로그인 - Be:MySeason" description={description}>
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

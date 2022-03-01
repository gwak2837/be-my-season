import Image from 'next/image'
import Link from 'next/link'
import { ReactNode } from 'react'
import styled from 'styled-components'

import { Frame21to9, MarginAuto } from './IntroduceLayout'

const FlexCenterCenter = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: min(max(2rem, 8vw), 5rem);

  padding: 2rem;

  a {
    text-align: center;
  }
`

type Props = {
  children: ReactNode
}

function CommunityLayout({ children }: Props) {
  return (
    <>
      <Frame21to9>
        <Image src="/images/sample.png" alt="main" layout="fill" objectFit="cover" />
      </Frame21to9>

      <FlexCenterCenter>
        <Link href="/community" passHref>
          <a>All</a>
        </Link>
        <Link href="/community/before" passHref>
          <a>모임 예정</a>
        </Link>
        <Link href="/community/ing" passHref>
          <a>진행 중</a>
        </Link>
        <Link href="/community/after" passHref>
          <a>모임 완료</a>
        </Link>
      </FlexCenterCenter>

      <MarginAuto>{children}</MarginAuto>
    </>
  )
}

export default CommunityLayout

import Image from 'next/image'
import Link from 'next/link'
import { ReactNode } from 'react'
import styled from 'styled-components'

import { Frame21to9, MarginAuto } from './IntroduceLayout'

const FlexCenterCenter = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  align-items: center;
  gap: 1rem min(max(2rem, 8vw), 5rem);

  padding: 2rem;

  a {
    text-align: center;
  }
`

type Props = {
  children: ReactNode
}

function ProgramLayout({ children }: Props) {
  return (
    <>
      <Frame21to9>
        <Image src="/images/sample.png" alt="main" layout="fill" objectFit="cover" />
      </Frame21to9>

      <FlexCenterCenter>
        <Link href="/program" passHref>
          <a>All</a>
        </Link>
        <Link href="/program/pre-w" passHref>
          <a>Pre-W</a>
        </Link>
        <Link href="/program/re-w" passHref>
          <a>Re-W</a>
        </Link>
        <Link href="/program/re-turnship" passHref>
          <a>Re-turnship</a>
        </Link>
        <Link href="/program/scheduled" passHref>
          <a>모임 예정</a>
        </Link>
        <Link href="/program/ongoing" passHref>
          <a>진행 중</a>
        </Link>
        <Link href="/program/done" passHref>
          <a>모임 완료</a>
        </Link>
      </FlexCenterCenter>

      <MarginAuto>{children}</MarginAuto>
    </>
  )
}

export default ProgramLayout

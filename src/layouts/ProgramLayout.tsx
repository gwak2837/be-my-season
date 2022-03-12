import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { ReactNode } from 'react'
import useAuth from 'src/hooks/useAuth'
import styled from 'styled-components'

import { SelectableA } from './ContentLayout'
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
  const { asPath } = useRouter()
  const { data: user } = useAuth()

  return (
    <>
      <Frame21to9>
        <Image src="/images/sample.png" alt="main" layout="fill" objectFit="cover" />
      </Frame21to9>

      <FlexCenterCenter>
        <Link href="/program" passHref>
          <SelectableA selected={asPath === '/program'}>All</SelectableA>
        </Link>
        <Link href="/program/pre-w" passHref>
          <SelectableA selected={asPath === '/program/pre-w'}>Pre-W</SelectableA>
        </Link>
        <Link href="/program/re-w" passHref>
          <SelectableA selected={asPath === '/program/re-w'}>Re-W</SelectableA>
        </Link>
        <Link href="/program/re-turnship" passHref>
          <SelectableA selected={asPath === '/program/re-turnship'}>Re-turnship</SelectableA>
        </Link>
        <Link href="/program/scheduled" passHref>
          <SelectableA selected={asPath === '/program/scheduled'}>예정</SelectableA>
        </Link>
        <Link href="/program/ongoing" passHref>
          <SelectableA selected={asPath === '/program/ongoing'}>진행 중</SelectableA>
        </Link>
        <Link href="/program/done" passHref>
          <SelectableA selected={asPath === '/program/done'}>완료</SelectableA>
        </Link>
        {user?.isAdmin && (
          <Link href="/program/create" passHref>
            <SelectableA selected={asPath === '/program/create'}>작성하기</SelectableA>
          </Link>
        )}
      </FlexCenterCenter>

      <MarginAuto>{children}</MarginAuto>
    </>
  )
}

export default ProgramLayout

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

function ProjectLayout({ children }: Props) {
  const { asPath } = useRouter()
  const { data: user } = useAuth()

  return (
    <>
      <Frame21to9>
        <Image src="/images/sample.png" alt="main" layout="fill" objectFit="cover" />
      </Frame21to9>

      <FlexCenterCenter>
        <Link href="/project" passHref>
          <SelectableA selected={asPath === '/project'}>Now</SelectableA>
        </Link>
        <Link href="/project/before" passHref>
          <SelectableA selected={asPath === '/project/before'}>Before</SelectableA>
        </Link>
        {user?.isAdmin && (
          <Link href="/project/create" passHref>
            <SelectableA selected={asPath === '/project/create'}>생성하기</SelectableA>
          </Link>
        )}
      </FlexCenterCenter>

      <MarginAuto>{children}</MarginAuto>
    </>
  )
}

export default ProjectLayout

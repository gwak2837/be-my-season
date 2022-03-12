import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { ReactNode } from 'react'
import useAuth from 'src/hooks/useAuth'
import ExportIcon from 'src/svgs/export.svg'
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

export const SelectableA = styled.a<{ selected?: boolean }>`
  color: ${(p) => (p.selected ? '#DE684A' : '#C9C9C9')};
  text-decoration-line: ${(p) => (p.selected ? 'underline' : 'none')};
`

type Props = {
  children: ReactNode
}

function ContentLayout({ children }: Props) {
  const { asPath } = useRouter()
  const { data: user } = useAuth()

  return (
    <>
      <Frame21to9>
        <Image src="/images/sample.png" alt="main" layout="fill" objectFit="cover" />
      </Frame21to9>

      <FlexCenterCenter>
        <Link href="/content" passHref>
          <SelectableA selected={asPath === '/content'}>All</SelectableA>
        </Link>
        <Link href="/content/column" passHref>
          <SelectableA selected={asPath === '/content/column'}>Column</SelectableA>
        </Link>
        <Link href="/content/interview" passHref>
          <SelectableA selected={asPath === '/content/interview'}>Interview</SelectableA>
        </Link>
        <SelectableA href="https://www.instagram.com" target="_blank" rel="noreferrer">
          Instagram <ExportIcon />
        </SelectableA>
        <SelectableA href="https://www.youtube.com" target="_blank" rel="noreferrer">
          Youtube <ExportIcon />
        </SelectableA>
        <SelectableA href="https://www.tistory.com" target="_blank" rel="noreferrer">
          Tistory <ExportIcon />
        </SelectableA>
        {user?.isAdmin && (
          <Link href="/content/create" passHref>
            <SelectableA selected={asPath === '/content/create'}>작성하기</SelectableA>
          </Link>
        )}
      </FlexCenterCenter>

      <MarginAuto>{children}</MarginAuto>
    </>
  )
}

export default ContentLayout

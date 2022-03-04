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
  gap: min(max(2rem, 8vw), 5rem);

  padding: 2rem;

  a {
    text-align: center;
  }
`

type Props = {
  children: ReactNode
}

function ContentLayout({ children }: Props) {
  return (
    <>
      <Frame21to9>
        <Image src="/images/sample.png" alt="main" layout="fill" objectFit="cover" />
      </Frame21to9>

      <FlexCenterCenter>
        <Link href="/content" passHref>
          <a>All</a>
        </Link>
        <Link href="/content/column" passHref>
          <a>Column</a>
        </Link>
        <Link href="/content/interview" passHref>
          <a>Interview</a>
        </Link>
        <a href="https://www.instagram.com" target="_blank" rel="noreferrer">
          Instagram
        </a>
        <a href="https://www.youtube.com" target="_blank" rel="noreferrer">
          Youtube
        </a>
        <a href="https://www.tistory.com" target="_blank" rel="noreferrer">
          Tistory
        </a>
      </FlexCenterCenter>

      <MarginAuto>{children}</MarginAuto>
    </>
  )
}

export default ContentLayout

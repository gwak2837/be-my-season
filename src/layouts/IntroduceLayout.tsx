import Image from 'next/image'
import Link from 'next/link'
import { ReactNode } from 'react'
import styled from 'styled-components'

export const Frame21to9 = styled.div`
  aspect-ratio: 21 / 9;
  position: relative;
`

const FlexCenterCenter = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5rem;

  padding: 2rem;
`

type Props = {
  children: ReactNode
}

function IntroduceLayout({ children }: Props) {
  return (
    <>
      <Frame21to9>
        <Image src="/images/sample.png" alt="main" layout="fill" objectFit="cover" />
      </Frame21to9>

      <FlexCenterCenter>
        <Link href="/introduce" passHref>
          <a>Brand story</a>
        </Link>
        <Link href="/introduce/about" passHref>
          <a>About us</a>
        </Link>
        <Link href="/introduce/ritual" passHref>
          <a>Ritual makers</a>
        </Link>
      </FlexCenterCenter>

      {children}
    </>
  )
}

export default IntroduceLayout

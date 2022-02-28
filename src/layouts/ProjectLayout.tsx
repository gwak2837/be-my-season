import Image from 'next/image'
import Link from 'next/link'
import { ReactNode } from 'react'
import styled from 'styled-components'

import { Frame21to9 } from './IntroduceLayout'

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

function ProjectLayout({ children }: Props) {
  return (
    <>
      <Frame21to9>
        <Image src="/images/sample.png" alt="main" layout="fill" objectFit="cover" />
      </Frame21to9>

      <FlexCenterCenter>
        <Link href="/project" passHref>
          <a>Now</a>
        </Link>
        <Link href="/project/before" passHref>
          <a>Before</a>
        </Link>
      </FlexCenterCenter>

      {children}
    </>
  )
}

export default ProjectLayout

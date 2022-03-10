import Image from 'next/image'
import Link from 'next/link'
import { ReactNode } from 'react'
import styled from 'styled-components'

import { Frame21to9, MarginAuto } from './IntroduceLayout'

const FlexWrap = styled.div`
  display: flex;
  flex-flow: row wrap;
  gap: 0 7rem;

  > div {
    flex-grow: 1;
  }
  > header {
    flex-grow: 0;
  }
`

const GridGap = styled.header`
  display: grid;
  gap: 0.5rem;
  height: fit-content;

  position: sticky;
  top: 5rem;
  padding: 1rem;
  background: #fff;
  flex-grow: 1;
`

type Props = {
  children: ReactNode
}

function FAQLayout({ children }: Props) {
  return (
    <>
      <MarginAuto>
        <FlexWrap>
          <GridGap>
            <h3>자주 묻는 질문</h3>
            <Link href="/contact/faq" passHref>
              <a>전체</a>
            </Link>
            <Link href="/contact/faq/payment" passHref>
              <a>결제 관련</a>
            </Link>
            <Link href="/contact/faq/refund" passHref>
              <a>환불 관련</a>
            </Link>
            <Link href="/contact/faq/program" passHref>
              <a>프로그램</a>
            </Link>
          </GridGap>
          <div>{children}</div>
        </FlexWrap>
      </MarginAuto>
    </>
  )
}

export default FAQLayout

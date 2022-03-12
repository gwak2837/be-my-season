import Image from 'next/image'
import Link from 'next/link'
import { ReactNode } from 'react'
import styled from 'styled-components'

import { Frame21to9, MarginAuto } from './IntroduceLayout'

const FlexWrap = styled.div`
  display: grid;
  gap: 0 7rem;

  > div {
    padding: 1rem 0 0;
  }

  @media (min-width: 600px) {
    grid-template-columns: auto 1fr;
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
  box-shadow: 0 0 0 1px #fff;
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

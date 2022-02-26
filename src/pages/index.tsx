import Image from 'next/image'
/* eslint-disable jsx-a11y/label-has-associated-control */
import Link from 'next/link'
import { useState } from 'react'
import Card from 'src/components/Card'
import PageHead from 'src/components/PageHead'
import DownArrow from 'src/svgs/down-arrow.svg'
import Instagram from 'src/svgs/instagram.svg'
import Tistory from 'src/svgs/tistory.svg'
import Youtube from 'src/svgs/youtube.svg'
import styled from 'styled-components'

const FlexBetweenNav = styled.nav`
  display: flex;
  justify-content: space-between;
  gap: 3rem;

  background: #eee;
  padding: 1rem;
`

const FlexBetween = styled.div`
  display: flex;
  justify-content: space-between;
`

const FlexBetweenPadding = styled(FlexBetween)`
  padding: 1rem 0;
  color: #e6c5ad;
`

const GridUl = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 2rem 1rem;
`

const GridGap = styled.div`
  display: grid;
  gap: 1rem;
`

const GridGapMaxWidth = styled(GridGap)`
  gap: 4rem;

  margin: 0 auto;
  padding: 2rem 1rem;
  max-width: 1024px;
`

const FlexCenter = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;

  * {
    color: #9b6f50;
    cursor: pointer;
    transition: all 0.3s ease-out;
  }

  *:hover {
    color: #ce4624;
  }
`

const Frame = styled.h5`
  aspect-ratio: 16 / 9;
  position: relative;
`

const Button = styled.button`
  display: block;
  padding: 1rem;
  border: 1px solid ${(p) => p.color};
  color: ${(p) => p.color};
  background: #fff;
`

const Footer = styled.footer`
  background: #e6c5ad;
  padding: 1rem;
`

const MaxWidth = styled.div`
  margin: 0 auto;
  padding: 2rem 1rem;
  max-width: 1024px;
  color: #fff;
`

const P = styled.p`
  line-height: 1.5rem;
`

const A = styled.a`
  color: #ce4624;
  font-weight: 400;
`

const WhiteA = styled.a`
  color: #fff;
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 0.5rem;
`

const Margin = styled.div`
  padding: 2rem 0;
  text-align: center;
`

const GridGapHeightFit = styled(GridGap)`
  height: fit-content;
`

const posts = [
  {
    title: 'title1',
    contents: 'contents1',
  },
  {
    title: 'title2',
    contents: 'contents2',
  },
  {
    title: 'title3',
    contents: 'contents3',
  },
  {
    title: 'title4',
    contents: 'contents4',
  },
  {
    title: 'title5',
    contents: 'contents5',
  },
]

export default function HomePage() {
  return (
    <PageHead>
      <FlexBetweenNav>
        <Image src="/images/logo.png" alt="logo" width="111" height="60" objectFit="cover" />
        <FlexCenter>
          <Link href="/introduce" passHref>
            <a>introduce</a>
          </Link>
          <Link href="/contents" passHref>
            <a>contents</a>
          </Link>
          <Link href="/learn" passHref>
            <a>learn</a>
          </Link>
          <Link href="/community" passHref>
            <a>community</a>
          </Link>
          <Link href="/project" passHref>
            <a>project</a>
          </Link>
          <Link href="/notice" passHref>
            <a>notice</a>
          </Link>
        </FlexCenter>
        <FlexCenter>
          <h5>검색</h5>
          <h5>로그아웃</h5>
        </FlexCenter>
      </FlexBetweenNav>
      <Frame>
        <Image src="/images/sample.png" alt="main" layout="fill" objectFit="cover" />
      </Frame>
      <GridGapMaxWidth>
        <div>
          <FlexBetweenPadding>
            <h3>Learn&nbsp;&nbsp;&nbsp;|</h3>
            <h5>+ All</h5>
          </FlexBetweenPadding>
          <GridUl>
            <Card data={posts[0]} />
            <Card data={posts[1]} />
            <Card data={posts[2]} />
            <Card data={posts[3]} />
            <Card data={posts[0]} />
            <Card data={posts[1]} />
            <Card data={posts[2]} />
            <Card data={posts[3]} />
          </GridUl>
          <Margin>
            <DownArrow /> more [1/5]
          </Margin>
        </div>

        <div>
          <FlexBetweenPadding>
            <h3>Contents&nbsp;&nbsp;&nbsp;|</h3>
            <h5>+ All</h5>
          </FlexBetweenPadding>
          <GridUl>
            <Card data={posts[0]} />
            <Card data={posts[1]} />
            <Card data={posts[2]} />
            <Card data={posts[3]} />
          </GridUl>
          <Margin>
            <DownArrow /> more [1/5]
          </Margin>
        </div>

        <div>
          <FlexBetweenPadding>
            <h3>Community&nbsp;&nbsp;&nbsp;|</h3>
            <h5>+ All</h5>
          </FlexBetweenPadding>
          <GridUl>
            <Card data={posts[0]} />
            <Card data={posts[1]} />
            <Card data={posts[2]} />
            <Card data={posts[3]} />
          </GridUl>
          <Margin>
            <DownArrow /> more [1/5]
          </Margin>
        </div>
      </GridGapMaxWidth>

      <Footer>
        <MaxWidth>
          <FlexBetween>
            <GridGap>
              <P>
                <b>회사명:</b> 주식회사 더하트컴퍼니
                <br />
                <b>대표자:</b> 김민하 박대은
                <br />
                <b>사업자등록번호: </b>
                <A
                  href="https://teht.hometax.go.kr/websquare/websquare.html?w2xPath=/ui/ab/a/a/UTEABAAA13.xml"
                  target="_blank"
                  rel="noreferrer"
                >
                  000-00-00000
                </A>
                <br />
                <b>통신판매신고번호: </b>
                <A
                  href="https://www.ftc.go.kr/bizCommPop.do?wrkr_no=1"
                  target="_blank"
                  rel="noreferrer"
                >
                  000-00-00000
                </A>
              </P>

              <P>
                <b>이메일: </b>
                <A href="mailto:lunez@theheartcompany.kr">lunez@theheartcompany.kr</A>
                <br />
                <b>카카오채널: </b>
                <A href="http://pf.kakao.com/bemyseason" target="_blank" rel="noreferrer">
                  bemyseason
                </A>
              </P>

              <P>
                <A
                  href="https://map.naver.com/v5/search/%EC%9D%B8%EC%B2%9C%20%EC%84%9C%EA%B5%AC%20%EC%97%BC%EA%B3%A1%EB%A1%9C%20464%EB%B2%88%EA%B8%B8%2015,%20%EC%93%B0%EB%A6%AC%EC%97%A0%ED%83%80%EC%9B%8C%208%EC%B8%B5/address/14100963.18511999,4512735.357471723,%EC%9D%B8%EC%B2%9C%EA%B4%91%EC%97%AD%EC%8B%9C%20%EC%84%9C%EA%B5%AC%20%EC%97%BC%EA%B3%A1%EB%A1%9C464%EB%B2%88%EA%B8%B8%2015,new?c=14100913.3362520,4512737.6734908,19,0,0,0,dh"
                  target="_blank"
                  rel="noreferrer"
                >
                  인천 서구 염곡로 464번길 15, 쓰리엠타워 8층
                </A>
                <h6>copyright 2022.비:마이시즌 All right Reserved</h6>
              </P>
            </GridGap>

            <GridGapHeightFit>
              <WhiteA href="https://www.instagram.com" target="_blank" rel="noreferrer">
                <Instagram />
                <div>인스타</div>
              </WhiteA>
              <WhiteA href="https://www.youtube.com" target="_blank" rel="noreferrer">
                <Youtube />
                <div>유튜브</div>
              </WhiteA>
              <WhiteA href="https://www.tistory.com" target="_blank" rel="noreferrer">
                <Tistory />
                <div>Tistory</div>
              </WhiteA>
            </GridGapHeightFit>
          </FlexBetween>
        </MaxWidth>
      </Footer>
    </PageHead>
  )
}

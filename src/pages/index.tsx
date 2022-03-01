import Image from 'next/image'
import Link from 'next/link'
import { ReactElement } from 'react'
import Card from 'src/components/Card'
import PageHead from 'src/components/PageHead'
import NavigationLayout from 'src/layouts/NavigationLayout'
import DownArrow from 'src/svgs/down-arrow.svg'
import Instagram from 'src/svgs/instagram.svg'
import Tistory from 'src/svgs/tistory.svg'
import Youtube from 'src/svgs/youtube.svg'
import styled from 'styled-components'

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

const Frame = styled.div`
  aspect-ratio: 16 / 9;
  position: relative;
`

const Footer = styled.footer`
  background: #de684a;
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
  color: #ffffff;
  font-weight: 400;
  text-decoration: underline;
`

const SmallA = styled.a`
  font-size: 0.8rem;
  font-weight: 400;
  color: #fff;
`

const WhiteA = styled.a`
  color: #fff;
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 0.5rem;
`

const FlexGap = styled.div`
  display: flex;
  gap: 1rem;
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
                <A href="https://pf.kakao.com/_mxjcxaT" target="_blank" rel="noreferrer">
                  bemyseason
                </A>
              </P>

              <div>
                <A
                  href="https://map.naver.com/v5/search/%EC%9D%B8%EC%B2%9C%20%EC%84%9C%EA%B5%AC%20%EC%97%BC%EA%B3%A1%EB%A1%9C%20464%EB%B2%88%EA%B8%B8%2015,%20%EC%93%B0%EB%A6%AC%EC%97%A0%ED%83%80%EC%9B%8C%208%EC%B8%B5/address/14100963.18511999,4512735.357471723,%EC%9D%B8%EC%B2%9C%EA%B4%91%EC%97%AD%EC%8B%9C%20%EC%84%9C%EA%B5%AC%20%EC%97%BC%EA%B3%A1%EB%A1%9C464%EB%B2%88%EA%B8%B8%2015,new?c=14100913.3362520,4512737.6734908,19,0,0,0,dh"
                  target="_blank"
                  rel="noreferrer"
                >
                  인천 서구 염곡로 464번길 15, 쓰리엠타워 8층
                </A>
                <h6>copyright 2022.비:마이시즌 All right Reserved</h6>
              </div>

              <FlexGap>
                <Link href="/terms-of-service" passHref>
                  <SmallA>이용약관</SmallA>
                </Link>
                <Link href="/privacy-policy" passHref>
                  <SmallA>개인정보처리방침</SmallA>
                </Link>
              </FlexGap>
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

HomePage.getLayout = function getLayout(page: ReactElement) {
  return <NavigationLayout>{page}</NavigationLayout>
}

import Image from 'next/image'
import Link from 'next/link'
import { ReactNode, useState } from 'react'
import Drawer from 'src/components/Drawer'
import useAuth from 'src/hooks/useAuth'
import { DESKTOP_MIN_WIDTH } from 'src/models/config'
import { FlexBetween, GridGap } from 'src/styles/common'
import DownArrow from 'src/svgs/down-arrow.svg'
import HamburgerIcon from 'src/svgs/hamburger.svg'
import Instagram from 'src/svgs/instagram.svg'
import Tistory from 'src/svgs/tistory.svg'
import Youtube from 'src/svgs/youtube.svg'
import styled, { css } from 'styled-components'

const FlexBetweenNav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 3rem;
  height: 5rem;

  position: sticky;
  top: 0;
  z-index: 1;

  background: #fff;
  border-bottom: 1px solid #e6c5ad;
  padding: 1rem;
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

  @media (max-width: ${DESKTOP_MIN_WIDTH}) {
    display: none;
  }
`

const Ul = styled.ul<{ isOpen: boolean }>`
  display: ${(p) => (p.isOpen ? 'grid' : 'none')};
  margin: 0.5rem 1rem 0;
  font-size: 0.8rem;
  gap: 0.4rem;

  /* transition: all 1s ease-out; */
`

const HamburgerWrapper = styled.div`
  cursor: pointer;
  display: grid;
  align-items: center;
  @media (min-width: ${DESKTOP_MIN_WIDTH}) {
    display: none;
  }

  > svg {
    width: 2rem;
  }
`

const MinWidth = styled.ul`
  min-width: 12rem;
  height: 100%;
  overflow: auto;

  background: #fff;
  display: flex;
  flex-flow: column;

  * {
    color: #7a583a;
    font-weight: 500;
  }

  > li {
    border: 1px solid #e6c5ad;
    border-left: 2px solid #e6c5ad;
    border-right: 2px solid #e6c5ad;
    padding: 1rem;
  }
  > li:first-child {
    background: #de684a;
    border: 2px solid #de684a;
    text-decoration: underline;
    > a {
      color: #fff;
    }
  }
  > li:last-child {
    border-bottom: 2px solid #e6c5ad;
  }
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

const GridGapHeightFit = styled(GridGap)`
  height: fit-content;
`

type Props = {
  children: ReactNode
}

function NavigationLayout({ children }: Props) {
  const { data, isLoading, hasError } = useAuth()
  const userId = data?.userId
  const isAdmin = data?.isAdmin

  const [open, setOpen] = useState(false)
  const [isIntroduceOpen, setIsIntroduceOpen] = useState(false)
  const [isContentsOpen, setIsContentsOpen] = useState(false)
  const [isProgramOpen, setIsProgramOpen] = useState(false)
  const [isCommunityOpen, setIsCommunityOpen] = useState(false)
  const [isProjectOpen, setIsProjectOpen] = useState(false)
  const [isContactOpen, setIsContactOpen] = useState(false)

  function openDrawer() {
    setOpen(true)
  }

  function closeDrawer() {
    setOpen(false)
  }

  return (
    <>
      <FlexBetweenNav>
        <Link href="/" passHref>
          <a>
            <Image
              src="/images/logo-transparent.png"
              alt="logo"
              width="106"
              height="51"
              objectFit="cover"
            />
          </a>
        </Link>

        <FlexCenter>
          <Link href="/introduce" passHref>
            <a>Introduce</a>
          </Link>
          <Link href="/content" passHref>
            <a>Contents</a>
          </Link>
          <Link href="/program" passHref>
            <a>Program</a>
          </Link>
          <Link href="/project" passHref>
            <a>Project</a>
          </Link>
          <Link href="/contact/faq" passHref>
            <a>Contact</a>
          </Link>
        </FlexCenter>
        <FlexCenter>
          {isLoading ? (
            <div>loading</div>
          ) : userId ? (
            <Link href={`/@${userId}`} passHref>
              <a>{isAdmin ? '페이지 관리' : 'My season'}</a>
            </Link>
          ) : hasError ? (
            <div>error</div>
          ) : (
            <Link href="/login" passHref>
              <a>로그인</a>
            </Link>
          )}
        </FlexCenter>
        <HamburgerWrapper onClick={openDrawer}>
          <HamburgerIcon />
        </HamburgerWrapper>
        <Drawer open={open} setOpen={setOpen}>
          <MinWidth>
            <li>
              {isLoading ? (
                <div>loading</div>
              ) : userId ? (
                <Link href={`/@${userId}`} passHref>
                  <a onClick={closeDrawer} role="button" tabIndex={0}>
                    {isAdmin ? '페이지 관리' : 'My season'}
                  </a>
                </Link>
              ) : hasError ? (
                <div>error</div>
              ) : (
                <Link href="/login" passHref>
                  <a onClick={closeDrawer} role="button" tabIndex={0}>
                    로그인
                  </a>
                </Link>
              )}
            </li>

            <li onClick={() => setIsIntroduceOpen((prev) => !prev)}>
              <h4>
                Introduce <DownArrow />
              </h4>
              <Ul onClick={closeDrawer} isOpen={isIntroduceOpen}>
                <Link href="/introduce" passHref>
                  <a>Brand Story</a>
                </Link>
                <Link href="/introduce/about" passHref>
                  <a>About us</a>
                </Link>
                <Link href="/introduce/ritual" passHref>
                  <a>Ritual</a>
                </Link>
              </Ul>
            </li>

            <li onClick={() => setIsContentsOpen((prev) => !prev)}>
              <h4>
                Contents <DownArrow />
              </h4>
              <Ul onClick={closeDrawer} isOpen={isContentsOpen}>
                <Link href="/content" passHref>
                  <a>All</a>
                </Link>
                <Link href="/content/column" passHref>
                  <a>Column</a>
                </Link>
                <Link href="/content/interview" passHref>
                  <a>Interview</a>
                </Link>
              </Ul>
            </li>

            <li onClick={() => setIsProgramOpen((prev) => !prev)}>
              <h4>
                Program <DownArrow />
              </h4>
              <Ul onClick={closeDrawer} isOpen={isProgramOpen}>
                <Link href="/program" passHref>
                  <a>All</a>
                </Link>
                <Link href="/program/pre-w" passHref>
                  <a>Pre-W</a>
                </Link>
                <Link href="/program/re-w" passHref>
                  <a>Re-W</a>
                </Link>
                <Link href="/program/re-turnship" passHref>
                  <a>Re-turnship</a>
                </Link>
                <Link href="/program/scheduled" passHref>
                  <a>모임 예정</a>
                </Link>
                <Link href="/program/ongoing" passHref>
                  <a>진행 중</a>
                </Link>
                <Link href="/program/done" passHref>
                  <a>모임 완료</a>
                </Link>
              </Ul>
            </li>

            <li onClick={() => setIsProjectOpen((prev) => !prev)}>
              <h4>
                Project <DownArrow />
              </h4>
              <Ul onClick={closeDrawer} isOpen={isProjectOpen}>
                <Link href="/project" passHref>
                  <a>Now</a>
                </Link>
                <Link href="/project/before" passHref>
                  <a>Before</a>
                </Link>
              </Ul>
            </li>

            <li onClick={() => setIsContactOpen((prev) => !prev)}>
              <h4>
                Contact <DownArrow />
              </h4>
              <Ul onClick={closeDrawer} isOpen={isContactOpen}>
                <Link href="/contact/faq" passHref>
                  <a>자주 묻는 질문</a>
                </Link>
              </Ul>
            </li>
          </MinWidth>
        </Drawer>
      </FlexBetweenNav>

      {children}

      <Footer>
        <MaxWidth>
          <FlexBetween>
            <GridGap>
              <P>
                <b>회사명:</b> (주)더하트컴퍼니
                <br />
                <b>대표자:</b> 박대은
                <br />
                <b>사업자등록번호: </b>
                <A
                  href="https://teht.hometax.go.kr/websquare/websquare.html?w2xPath=/ui/ab/a/a/UTEABAAA13.xml"
                  target="_blank"
                  rel="noreferrer"
                >
                  505-81-86104
                </A>
                <br />
                <b>통신판매신고번호: </b>
                <A
                  href="https://www.ftc.go.kr/bizCommPop.do?wrkr_no=1"
                  target="_blank"
                  rel="noreferrer"
                >
                  2021-인천서구-2286
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
                  인천 서구 염곡로 464번길 15, 쓰리엠타워 8층 809호
                </A>
                <h6>copyright {new Date().getFullYear()}. Be:MySeason All right Reserved</h6>
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
    </>
  )
}

export default NavigationLayout

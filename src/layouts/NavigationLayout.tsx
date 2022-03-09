import Image from 'next/image'
import Link from 'next/link'
import { ReactNode, useState } from 'react'
import Drawer from 'src/components/Drawer'
import useAuth from 'src/hooks/useAuth'
import { DESKTOP_MIN_WIDTH } from 'src/models/config'
import DownArrow from 'src/svgs/down-arrow.svg'
import HamburgerIcon from 'src/svgs/hamburger.svg'
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
          <Link href="/community" passHref>
            <a>Community</a>
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
              </Ul>
            </li>

            <li onClick={() => setIsCommunityOpen((prev) => !prev)}>
              <h4>
                Community <DownArrow />
              </h4>
              <Ul onClick={closeDrawer} isOpen={isCommunityOpen}>
                <Link href="/community" passHref>
                  <a>All</a>
                </Link>
                <Link href="/community/before" passHref>
                  <a>모임 예정</a>
                </Link>
                <Link href="/community/ing" passHref>
                  <a>진행 중</a>
                </Link>
                <Link href="/community/after" passHref>
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
    </>
  )
}

export default NavigationLayout

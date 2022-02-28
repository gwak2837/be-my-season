import Image from 'next/image'
import Link from 'next/link'
import { ReactNode, useState } from 'react'
import Drawer from 'src/components/Drawer'
import useUser from 'src/hooks/useUser'
import { DESKTOP_MIN_WIDTH } from 'src/models/config'
import DownArrow from 'src/svgs/down-arrow.svg'
import HamburgerIcon from 'src/svgs/hamburger.svg'
import styled from 'styled-components'

const FlexBetweenNav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 3rem;

  position: sticky;
  top: 0;
  z-index: 1;

  background: #eee;
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

const MinWidth = styled.div`
  min-width: 10rem;
  height: 100vh;

  background: #fff;
  display: flex;
  flex-flow: column;

  > a {
    display: flex;
    justify-content: space-between;
    align-items: center;

    border: 1px solid #e6c5ad;
    border-left: 2px solid #e6c5ad;
    border-right: 2px solid #e6c5ad;
    color: #7a583a;
    padding: 1rem;
  }
  > a:first-child {
    background: #de684a;
    border: 1px solid #de684a;
    color: #fff;
    text-decoration: underline;
  }
  > a:last-child {
    border-bottom: 2px solid #e6c5ad;
  }
`

type Props = {
  children: ReactNode
}

function NavigationLayout({ children }: Props) {
  const { user, isLoading, hasError } = useUser()
  const userId = user?.userId

  const [open, setOpen] = useState(false)

  function openDrawer() {
    setOpen(true)
  }

  function closeDrawer() {
    setOpen(false)
  }

  return (
    <>
      <FlexBetweenNav>
        <Image
          src="/images/logo-transparent.png"
          alt="logo"
          width="106"
          height="51"
          objectFit="cover"
        />
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
          <Link href="/contact" passHref>
            <a>Contact</a>
          </Link>
        </FlexCenter>
        <FlexCenter>
          {isLoading ? (
            <div>loading</div>
          ) : userId ? (
            <Link href={`/@${userId}`} passHref>
              <a>마이페이지</a>
            </Link>
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
            {isLoading ? (
              <div>loading</div>
            ) : userId ? (
              <Link href={`/@${userId}`} passHref>
                <a onClick={closeDrawer} role="button" tabIndex={0}>
                  마이페이지
                </a>
              </Link>
            ) : (
              <Link href="/login" passHref>
                <a onClick={closeDrawer} role="button" tabIndex={0}>
                  로그인
                </a>
              </Link>
            )}
            <Link href="/introduce" passHref>
              <a onClick={closeDrawer} role="button" tabIndex={0}>
                Introduce <DownArrow />
              </a>
            </Link>
            <Link href="/content" passHref>
              <a onClick={closeDrawer} role="button" tabIndex={0}>
                Contents
              </a>
            </Link>
            <Link href="/program" passHref>
              <a onClick={closeDrawer} role="button" tabIndex={0}>
                Program
              </a>
            </Link>
            <Link href="/community" passHref>
              <a onClick={closeDrawer} role="button" tabIndex={0}>
                Community
              </a>
            </Link>
            <Link href="/project" passHref>
              <a onClick={closeDrawer} role="button" tabIndex={0}>
                Project <DownArrow />
              </a>
            </Link>
            <Link href="/contact" passHref>
              <a onClick={closeDrawer} role="button" tabIndex={0}>
                Contact
              </a>
            </Link>
          </MinWidth>
        </Drawer>
      </FlexBetweenNav>

      {children}
    </>
  )
}

export default NavigationLayout

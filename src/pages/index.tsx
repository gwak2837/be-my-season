import Image from 'next/image'
/* eslint-disable jsx-a11y/label-has-associated-control */
import Link from 'next/link'
import { useState } from 'react'
import Card from 'src/components/Card'
import PageHead from 'src/components/PageHead'
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

const GridUl = styled.ul`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  gap: 1rem;
`

const FlexCenter = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
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
  background: #ccc;
  padding: 1rem;
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
        <Image src="/images/logo.png" alt="logo" width="300" height="300" />
        <FlexCenter>
          <div>introduce</div>
          <div>contents</div>
          <div>learn</div>
          <div>community</div>
          <div>project</div>
          <div>notice</div>
        </FlexCenter>
        <FlexCenter>
          <h5>검색</h5>
          <h5>로그아웃</h5>
        </FlexCenter>
      </FlexBetweenNav>

      <Frame>
        <Image src="/images/sample.png" alt="main" layout="fill" objectFit="cover" />
      </Frame>

      <div>
        <FlexBetween>
          <h3>칼럼</h3>
          <h5>더보기</h5>
        </FlexBetween>
        <GridUl>
          <Card data={posts[0]} />
          <Card data={posts[1]} />
          <Card data={posts[2]} />
          <Card data={posts[3]} />
        </GridUl>

        <FlexBetween>
          <h3>인터뷰</h3>
          <h5>더보기</h5>
        </FlexBetween>
        <GridUl>
          <Card data={posts[0]} />
          <Card data={posts[1]} />
          <Card data={posts[2]} />
          <Card data={posts[3]} />
        </GridUl>

        <FlexBetween>
          <h3>Pre-W</h3>
          <h5>더보기</h5>
        </FlexBetween>
        <GridUl>
          <Card data={posts[0]} />
          <Card data={posts[1]} />
          <Card data={posts[2]} />
          <Card data={posts[3]} />
        </GridUl>

        <FlexBetween>
          <h3>Re-W</h3>
          <h5>더보기</h5>
        </FlexBetween>
        <GridUl>
          <Card data={posts[0]} />
          <Card data={posts[1]} />
          <Card data={posts[2]} />
          <Card data={posts[3]} />
        </GridUl>

        <FlexBetween>
          <h3>Re-ternship</h3>
          <h5>더보기</h5>
        </FlexBetween>
        <GridUl>
          <Card data={posts[0]} />
          <Card data={posts[1]} />
          <Card data={posts[2]} />
          <Card data={posts[3]} />
        </GridUl>

        <Button>블로그 바로가기</Button>
        <Button color="#bb00e0">인스타 바로가기</Button>
        <Button color="#e00000">유튜브 바로가기</Button>

        <Footer>
          <h5>더하트컴퍼니</h5>
        </Footer>
      </div>
    </PageHead>
  )
}

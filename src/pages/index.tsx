import Image from 'next/image'
import Link from 'next/link'
import { ReactElement } from 'react'
import Card from 'src/components/Card'
import ContentCard from 'src/components/ContentCard'
import PageHead from 'src/components/PageHead'
import NavigationLayout from 'src/layouts/NavigationLayout'
import { FlexBetween, GridGap } from 'src/styles/common'
import DownArrow from 'src/svgs/down-arrow.svg'

import styled from 'styled-components'

const FlexBetweenPadding = styled(FlexBetween)`
  padding: 1rem 0;
  color: #e6c5ad;
`

const GridUl = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 2rem 1rem;
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

const Margin = styled.div`
  padding: 2rem 0;
  text-align: center;
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
            <Link href="/program" passHref>
              <a>
                <h5>+ All</h5>
              </a>
            </Link>
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
            <Link href="/content" passHref>
              <a>
                <h5>+ All</h5>
              </a>
            </Link>
          </FlexBetweenPadding>
          <GridUl>
            <ContentCard content={posts[0]} />
            <ContentCard content={posts[1]} />
            <ContentCard content={posts[2]} />
            <ContentCard content={posts[3]} />
          </GridUl>
          <Margin>
            <DownArrow /> more [1/5]
          </Margin>
        </div>

        <div>
          <FlexBetweenPadding>
            <h3>Community&nbsp;&nbsp;&nbsp;|</h3>
            <Link href="/community" passHref>
              <a>
                <h5>+ All</h5>
              </a>
            </Link>
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
    </PageHead>
  )
}

HomePage.getLayout = function getLayout(page: ReactElement) {
  return <NavigationLayout>{page}</NavigationLayout>
}

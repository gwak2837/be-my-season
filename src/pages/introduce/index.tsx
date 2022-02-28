import Image from 'next/image'
import { ReactElement } from 'react'
import PageHead from 'src/components/PageHead'
import IntroduceLayout from 'src/layouts/IntroduceLayout'
import NavigationLayout from 'src/layouts/NavigationLayout'
import styled from 'styled-components'

export const Frame21to9 = styled.div`
  aspect-ratio: 21 / 9;
  position: relative;
`

const description = ''

export default function BrandStoryPage() {
  return (
    <PageHead title="브랜드 스토리 - Be:MySeason" description={description}>
      kj
    </PageHead>
  )
}

BrandStoryPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <NavigationLayout>
      <IntroduceLayout>{page}</IntroduceLayout>
    </NavigationLayout>
  )
}

import Image from 'next/image'
import { ReactElement } from 'react'
import PageHead from 'src/components/PageHead'
import IntroduceLayout from 'src/layouts/IntroduceLayout'
import NavigationLayout from 'src/layouts/NavigationLayout'

const description = ''

export default function AboutUsPage() {
  return (
    <PageHead title="팀 소개 - Be:MySeason" description={description}>
      kl
    </PageHead>
  )
}

AboutUsPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <NavigationLayout>
      <IntroduceLayout>{page}</IntroduceLayout>
    </NavigationLayout>
  )
}

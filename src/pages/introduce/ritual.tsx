import Image from 'next/image'
import { ReactElement } from 'react'
import PageHead from 'src/components/PageHead'
import IntroduceLayout from 'src/layouts/IntroduceLayout'
import NavigationLayout from 'src/layouts/NavigationLayout'

const description = ''

export default function RitualMakerPage() {
  return (
    <PageHead title="리추얼 매이커 - Be:MySeason" description={description}>
      리추얼
    </PageHead>
  )
}

RitualMakerPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <NavigationLayout>
      <IntroduceLayout>{page}</IntroduceLayout>
    </NavigationLayout>
  )
}

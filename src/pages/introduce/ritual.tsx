import Image from 'next/image'
import { ReactElement } from 'react'
import PageHead from 'src/components/PageHead'
import ToastViewer from 'src/components/ToastViewer'
import IntroduceLayout from 'src/layouts/IntroduceLayout'
import NavigationLayout from 'src/layouts/NavigationLayout'
import { defaultFetcher } from 'src/utils'
import useSWR from 'swr'

const description = ''

export default function RitualMakerPage() {
  const { data, error } = useSWR('/api/wysiwyg/3', defaultFetcher)

  return (
    <PageHead title="리추얼 매이커 - Be:MySeason" description={description}>
      {data ? <ToastViewer initialValue={data.contents} /> : error ? 'error' : 'loading'}
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

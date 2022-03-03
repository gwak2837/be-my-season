import Image from 'next/image'
import { ReactElement } from 'react'
import PageHead from 'src/components/PageHead'
import ToastViewer from 'src/components/ToastViewer'
import IntroduceLayout from 'src/layouts/IntroduceLayout'
import NavigationLayout from 'src/layouts/NavigationLayout'
import { defaultFetcher } from 'src/utils'
import useSWR from 'swr'

const description = ''

export default function AboutUsPage() {
  const { data, error } = useSWR('/api/wysiwyg/2', defaultFetcher)

  return (
    <PageHead title="팀 소개 - Be:MySeason" description={description}>
      {data ? <ToastViewer initialValue={data.contents} /> : error ? 'error' : 'loading'}
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

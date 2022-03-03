import dynamic from 'next/dynamic'
import Image from 'next/image'
import { ReactElement } from 'react'
import PageHead from 'src/components/PageHead'
import IntroduceLayout from 'src/layouts/IntroduceLayout'
import NavigationLayout from 'src/layouts/NavigationLayout'
import { defaultFetcher } from 'src/utils'
import useSWR from 'swr'

const ToastViewer = dynamic(() => import('src/components/ToastViewer'), { ssr: false })
const ToastEditor = dynamic(() => import('src/components/ToastEditor'), { ssr: false })

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

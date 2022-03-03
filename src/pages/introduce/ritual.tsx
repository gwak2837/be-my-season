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

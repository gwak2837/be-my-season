import dynamic from 'next/dynamic'
import Image from 'next/image'
import { ReactElement } from 'react'
import PageHead from 'src/components/PageHead'
import IntroduceLayout from 'src/layouts/IntroduceLayout'
import NavigationLayout from 'src/layouts/NavigationLayout'
import { defaultFetcher } from 'src/utils'
import styled from 'styled-components'
import useSWR from 'swr'

const ToastViewer = dynamic(() => import('src/components/ToastViewer'), { ssr: false })

const description = ''

export default function BrandStoryPage() {
  const { data, error } = useSWR('/api/wysiwyg/1', defaultFetcher)

  return (
    <PageHead title="브랜드 스토리 - Be:MySeason" description={description}>
      {data ? <ToastViewer initialValue={data.contents} /> : error ? 'error' : 'loading'}
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

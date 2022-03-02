import dynamic from 'next/dynamic'
import Image from 'next/image'
import { ReactElement } from 'react'
import PageHead from 'src/components/PageHead'
import IntroduceLayout from 'src/layouts/IntroduceLayout'
import NavigationLayout from 'src/layouts/NavigationLayout'
import styled from 'styled-components'
import useSWR from 'swr'

const ToastViewer = dynamic(() => import('src/components/ToastViewer'), { ssr: false })

const description = ''

export default function BrandStoryPage() {
  const { data } = useSWR('/api/introduce')

  return (
    <PageHead title="브랜드 스토리 - Be:MySeason" description={description}>
      <ToastViewer />
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

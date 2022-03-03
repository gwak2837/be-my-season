import type { Editor } from '@toast-ui/react-editor'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import { ReactElement, useRef } from 'react'
import PageHead from 'src/components/PageHead'
import useAuth from 'src/hooks/useAuth'
import IntroduceLayout from 'src/layouts/IntroduceLayout'
import NavigationLayout from 'src/layouts/NavigationLayout'
import { defaultFetcher } from 'src/utils'
import styled from 'styled-components'
import useSWR from 'swr'

const ToastViewer = dynamic(() => import('src/components/ToastViewer'), { ssr: false })
const ToastEditor = dynamic(() => import('src/components/ToastEditor'), { ssr: false })

const description = ''

export default function BrandStoryPage() {
  const { data: user } = useAuth()
  const { data, error } = useSWR('/api/wysiwyg/1', defaultFetcher)

  const editorRef = useRef<Editor>(null)

  return (
    <PageHead title="브랜드 스토리 - Be:MySeason" description={description}>
      {user?.isAdmin === 1 && (
        <button
          onClick={() => {
            console.log(editorRef.current?.getInstance().getHTML())
          }}
        >
          수정하기
        </button>
      )}
      {data ? (
        user?.isAdmin ? (
          <ToastEditor editorRef={editorRef} initialValue={data.contents} />
        ) : (
          <ToastViewer initialValue={data.contents} />
        )
      ) : error ? (
        'error'
      ) : (
        'loading'
      )}
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

import type { Editor } from '@toast-ui/react-editor'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import { ReactElement, useRef } from 'react'
import { toast } from 'react-toastify'
import PageHead from 'src/components/PageHead'
import useAuth from 'src/hooks/useAuth'
import IntroduceLayout from 'src/layouts/IntroduceLayout'
import NavigationLayout from 'src/layouts/NavigationLayout'
import { defaultFetcher } from 'src/utils'
import useSWR, { useSWRConfig } from 'swr'

const ToastViewer = dynamic(() => import('src/components/ToastViewer'), { ssr: false })
const ToastEditor = dynamic(() => import('src/components/ToastEditor'), { ssr: false })

const description = ''

export default function RitualMakerPage() {
  const { data: user } = useAuth()
  const { data, error } = useSWR('/api/wysiwyg/3', defaultFetcher)
  const { mutate } = useSWRConfig()

  const editorRef = useRef<Editor>(null)

  async function updateBrandStory() {
    if (editorRef.current) {
      const response = await fetch('/api/wysiwyg/3', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contents: editorRef.current.getInstance().getHTML() }),
      })

      if (response.ok) {
        toast.success('리추얼 매이커 수정에 성공했습니다')
        mutate('/api/wysiwyg/3')
      } else {
        const result = await response.json()
        toast.warn(result.message)
      }
    }
  }

  return (
    <PageHead title="리추얼 매이커 - Be:MySeason" description={description}>
      {user?.isAdmin === 1 && <button onClick={updateBrandStory}>수정하기</button>}
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

RitualMakerPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <NavigationLayout>
      <IntroduceLayout>{page}</IntroduceLayout>
    </NavigationLayout>
  )
}

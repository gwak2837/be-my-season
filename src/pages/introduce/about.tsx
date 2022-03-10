import type { Editor } from '@toast-ui/react-editor'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import { ReactElement, useRef, useState } from 'react'
import { toast } from 'react-toastify'
import PageHead from 'src/components/PageHead'
import useAuth from 'src/hooks/useAuth'
import IntroduceLayout from 'src/layouts/IntroduceLayout'
import NavigationLayout from 'src/layouts/NavigationLayout'
import { defaultFetcher } from 'src/utils'
import useSWR, { useSWRConfig } from 'swr'

import { FlexEndCenter, OrangeButton, WhiteButton } from '.'

const ToastViewer = dynamic(() => import('src/components/ToastViewer'), { ssr: false })
const ToastEditor = dynamic(() => import('src/components/ToastEditor'), { ssr: false })

const description = ''

export default function AboutUsPage() {
  const { data: user } = useAuth()
  const { data: aboutUs, error } = useSWR('/api/wysiwyg/2', defaultFetcher)
  const { mutate } = useSWRConfig()

  // Update about us
  const editorRef = useRef<Editor>(null)
  const [isUpdateLoading, setIsUpdateLoading] = useState(false)

  async function updateBrandStory() {
    if (editorRef.current) {
      setIsUpdateLoading(true)

      const response = await fetch('/api/wysiwyg/2', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: editorRef.current.getInstance().getHTML(),
        }),
      })

      if (response.ok) {
        toast.success('팀 소개 수정에 성공했습니다')
        mutate('/api/wysiwyg/2')
      } else {
        const result = await response.json()
        toast.warn(result.message)
      }

      setIsUpdateLoading(false)
      setIsUpdateMode(false)
    }
  }

  // Toggle editor/viewer mode
  const [isUpdateMode, setIsUpdateMode] = useState(false)

  function beingUpdate() {
    setIsUpdateMode(true)
  }

  function cancelUpdating() {
    setIsUpdateMode(false)
  }

  return (
    <PageHead title="팀 소개 - Be:MySeason" description={description}>
      <FlexEndCenter>
        {user?.isAdmin === 1 &&
          (isUpdateMode ? (
            <>
              <WhiteButton disabled={isUpdateLoading} onClick={cancelUpdating}>
                취소
              </WhiteButton>
              <OrangeButton disabled={isUpdateLoading} onClick={updateBrandStory}>
                완료
              </OrangeButton>
            </>
          ) : (
            <OrangeButton onClick={beingUpdate}>수정하기</OrangeButton>
          ))}
      </FlexEndCenter>

      {aboutUs ? (
        isUpdateMode && user?.isAdmin ? (
          <ToastEditor editorRef={editorRef} initialValue={aboutUs.contents} />
        ) : (
          <ToastViewer initialValue={aboutUs.contents} />
        )
      ) : error ? (
        <div>error</div>
      ) : (
        <div>loading...</div>
      )}
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

import type { Editor } from '@toast-ui/react-editor'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import { ReactElement, useEffect, useRef, useState } from 'react'
import { toast } from 'react-toastify'
import PageHead from 'src/components/PageHead'
import useAuth from 'src/hooks/useAuth'
import IntroduceLayout from 'src/layouts/IntroduceLayout'
import NavigationLayout from 'src/layouts/NavigationLayout'
import { defaultFetcher } from 'src/utils'
import styled from 'styled-components'
import useSWR, { useSWRConfig } from 'swr'

const ToastEditor = dynamic(() => import('src/components/ToastEditor'), { ssr: false })
const ToastViewer = dynamic(() => import('src/components/ToastViewer'), { ssr: false })

export const FlexEndCenter = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 1rem;
  padding: 1rem 0;
`

export const OrangeButton = styled.button`
  background: #de684a;
  border: 1px solid #de684a;
  color: #fff;
  padding: 0.5rem 1rem;
`

export const WhiteButton = styled.button`
  background: #fff;
  border: 1px solid #de684a;
  color: #de684a;
  padding: 0.5rem 1rem;
`

const description = ''

export default function BrandStoryPage() {
  const { data: user } = useAuth()
  const { data: brandStory, error } = useSWR('/api/wysiwyg/1', defaultFetcher)
  const { mutate } = useSWRConfig()

  // Update brand story
  const editorRef = useRef<Editor>(null)
  const [isUpdateLoading, setIsUpdateLoading] = useState(false)

  async function updateBrandStory() {
    if (editorRef.current) {
      setIsUpdateLoading(true)

      const response = await fetch('/api/wysiwyg/1', {
        method: 'PUT',
        headers: {
          authorization: sessionStorage.getItem('jwt') ?? localStorage.getItem('jwt') ?? '',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: editorRef.current.getInstance().getHTML(),
        }),
      })

      if (response.ok) {
        toast.success('브랜드 스토리 수정에 성공했습니다')
        mutate('/api/wysiwyg/1')
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
    <PageHead title="브랜드 스토리 - Be:MySeason" description={description}>
      <FlexEndCenter>
        {user?.isAdmin &&
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

      {brandStory ? (
        isUpdateMode && user?.isAdmin ? (
          <ToastEditor editorRef={editorRef} initialValue={brandStory.contents} />
        ) : (
          <ToastViewer initialValue={brandStory.contents} />
        )
      ) : error ? (
        <div>error</div>
      ) : (
        <div>loading...</div>
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

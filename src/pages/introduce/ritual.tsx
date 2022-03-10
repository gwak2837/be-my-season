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
import styled from 'styled-components'
import useSWR, { useSWRConfig } from 'swr'

import { FlexEndCenter, OrangeButton, WhiteButton } from '.'

const ToastViewer = dynamic(() => import('src/components/ToastViewer'), { ssr: false })
const ToastEditor = dynamic(() => import('src/components/ToastEditor'), { ssr: false })

const FlexCenterCenter = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

const Button = styled.button`
  background: #7a583a;
  border-radius: 10px;
  color: #fff;
  margin: 2rem 0;
  padding: 1rem;
  width: 100%;
  max-width: 20rem;
`

const description = ''

export default function RitualMakerPage() {
  const { data: user } = useAuth()
  const { data, error } = useSWR('/api/wysiwyg/3', defaultFetcher)
  const { mutate } = useSWRConfig()

  // Update ritual maker
  const editorRef = useRef<Editor>(null)
  const [isUpdateLoading, setIsUpdateLoading] = useState(false)

  async function updateBrandStory() {
    if (editorRef.current) {
      setIsUpdateLoading(true)

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
    <PageHead title="리추얼 매이커 - Be:MySeason" description={description}>
      <FlexEndCenter>
        {user?.isAdmin === 1 && isUpdateMode ? (
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
        )}
      </FlexEndCenter>

      {data ? (
        isUpdateMode && user?.isAdmin ? (
          <ToastEditor editorRef={editorRef} initialValue={data.contents} />
        ) : (
          <ToastViewer initialValue={data.contents} />
        )
      ) : error ? (
        <div>error</div>
      ) : (
        <div>loading...</div>
      )}

      <FlexCenterCenter>
        <Button>
          <a href="http://goo.gl/forms/59PPKebErV" target="_blank" rel="noreferrer">
            지원하기
          </a>
        </Button>
      </FlexCenterCenter>
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

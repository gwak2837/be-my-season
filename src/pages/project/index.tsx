import type { Editor } from '@toast-ui/react-editor'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import { ReactElement, useRef, useState } from 'react'
import { toast } from 'react-toastify'
import PageHead from 'src/components/PageHead'
import useAuth from 'src/hooks/useAuth'
import NavigationLayout from 'src/layouts/NavigationLayout'
import ProjectLayout from 'src/layouts/ProjectLayout'
import { defaultFetcher } from 'src/utils'
import styled from 'styled-components'
import useSWR, { useSWRConfig } from 'swr'

import { FlexEndCenter, OrangeButton, WhiteButton } from '../introduce'

const ToastEditor = dynamic(() => import('src/components/ToastEditor'), { ssr: false })
const ToastViewer = dynamic(() => import('src/components/ToastViewer'), { ssr: false })

const description = ''

export default function ProjectPage() {
  const { data: user } = useAuth()
  const { mutate } = useSWRConfig()

  // Fetch current project
  const { data: currentProject, error } = useSWR('/api/project/current', defaultFetcher)

  // Update current project
  const editorRef = useRef<Editor>(null)
  const [isUpdateLoading, setIsUpdateLoading] = useState(false)

  async function updateCurrentProject() {
    if (editorRef.current) {
      setIsUpdateLoading(true)

      const response = await fetch(`/api/project/${currentProject.id}`, {
        method: 'PUT',
        headers: {
          authorization: sessionStorage.getItem('jwt') ?? localStorage.getItem('jwt') ?? '',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          description: editorRef.current.getInstance().getHTML(),
        }),
      })

      if (response.ok) {
        toast.success('현재 프로젝트 수정에 성공했습니다')
        mutate('/api/project/current')
      } else {
        const result = await response.json()
        toast.warn(result.message)
      }
    }

    setIsUpdateLoading(false)
    setIsUpdateMode(false)
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
    <PageHead title="현재 프로젝트 - Be:MySeason" description={description}>
      <FlexEndCenter>
        {user?.isAdmin === 1 &&
          (isUpdateMode ? (
            <>
              <WhiteButton disabled={isUpdateLoading} onClick={cancelUpdating}>
                취소
              </WhiteButton>
              <OrangeButton disabled={isUpdateLoading} onClick={updateCurrentProject}>
                완료
              </OrangeButton>
            </>
          ) : (
            <OrangeButton onClick={beingUpdate}>수정하기</OrangeButton>
          ))}
      </FlexEndCenter>

      {currentProject ? (
        isUpdateMode && user?.isAdmin ? (
          <ToastEditor editorRef={editorRef} initialValue={currentProject.description} />
        ) : (
          <ToastViewer initialValue={currentProject.description} />
        )
      ) : error ? (
        <div>error</div>
      ) : (
        <div>loading...</div>
      )}
    </PageHead>
  )
}

ProjectPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <NavigationLayout>
      <ProjectLayout>{page}</ProjectLayout>
    </NavigationLayout>
  )
}

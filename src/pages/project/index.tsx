import type { Editor } from '@toast-ui/react-editor'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import { ReactElement, useRef } from 'react'
import { toast } from 'react-toastify'
import PageHead from 'src/components/PageHead'
import useAuth from 'src/hooks/useAuth'
import NavigationLayout from 'src/layouts/NavigationLayout'
import ProjectLayout from 'src/layouts/ProjectLayout'
import { defaultFetcher } from 'src/utils'
import styled from 'styled-components'
import useSWR, { useSWRConfig } from 'swr'

const ToastEditor = dynamic(() => import('src/components/ToastEditor'), { ssr: false })
const ToastViewer = dynamic(() => import('src/components/ToastViewer'), { ssr: false })

const description = ''

export default function ProjectPage() {
  // Fetch current project
  const { data, error } = useSWR('/api/project/current', defaultFetcher)
  const currentProject = data?.project

  // Update current project if user is admin
  const { data: user } = useAuth()
  const editorRef = useRef<Editor>(null)
  const { mutate } = useSWRConfig()

  async function updateCurrentProject() {
    if (editorRef.current) {
      const response = await fetch(`/api/project/${currentProject.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contents: editorRef.current.getInstance().getHTML() }),
      })

      if (response.ok) {
        toast.success('현재 프로젝트 수정에 성공했습니다')
        mutate('/api/project/current')
      } else {
        const result = await response.json()
        toast.warn(result.message)
      }
    }
  }

  return (
    <PageHead title="현재 프로젝트 - Be:MySeason" description={description}>
      {user?.isAdmin === 1 && <button onClick={updateCurrentProject}>수정하기</button>}
      {currentProject ? (
        user?.isAdmin ? (
          <ToastEditor editorRef={editorRef} initialValue={currentProject.description} />
        ) : (
          <ToastViewer initialValue={currentProject.description} />
        )
      ) : error ? (
        'error'
      ) : (
        'loading'
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

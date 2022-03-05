import type { Editor } from '@toast-ui/react-editor'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { ReactElement, useRef } from 'react'
import { toast } from 'react-toastify'
import PageHead from 'src/components/PageHead'
import useAuth from 'src/hooks/useAuth'
import NavigationLayout from 'src/layouts/NavigationLayout'
import { defaultFetcher } from 'src/utils'
import styled from 'styled-components'
import useSWR, { useSWRConfig } from 'swr'

const ToastEditor = dynamic(() => import('src/components/ToastEditor'), { ssr: false })
const ToastViewer = dynamic(() => import('src/components/ToastViewer'), { ssr: false })

const description = ''

export default function ProjectBeforePage() {
  const router = useRouter()
  const projectId = (router.query.id ?? '') as string

  // Fetch project
  const { data, error } = useSWR(
    () => (projectId ? `/api/project/${projectId}` : null),
    defaultFetcher
  )
  const project = data?.project
  const previousProject = data?.previousProject
  const nextProject = data?.nextProject

  // Update project if user is admin
  const { data: user } = useAuth()
  const editorRef = useRef<Editor>(null)
  const { mutate } = useSWRConfig()

  async function updateProject() {
    if (editorRef.current) {
      const response = await fetch(`/api/project/${projectId}`, {
        method: 'PUT',
        headers: { 'Project-Type': 'application/json' },
        body: JSON.stringify({ projects: editorRef.current.getInstance().getHTML() }),
      })

      if (response.ok) {
        toast.success('수정에 성공했습니다')
        mutate(`/api/project/${projectId}`)
      } else {
        const result = await response.json()
        toast.warn(result.message)
      }
    }
  }

  return (
    <PageHead title="프로젝트 - Be:MySeason" description={description}>
      {project ? (
        <>
          {user?.isAdmin ? (
            <>
              <button onClick={updateProject}>수정하기</button>
              <ToastEditor editorRef={editorRef} initialValue={project.description} />
            </>
          ) : (
            <ToastViewer initialValue={project.description} />
          )}

          {nextProject ? (
            <Link href={`/project/${nextProject.id}`} passHref>
              <a>
                <div>{nextProject.title}</div>
              </a>
            </Link>
          ) : (
            <div>다음글이 없습니다.</div>
          )}
          {previousProject ? (
            <Link href={`/project/${previousProject.id}`} passHref>
              <a>
                <div>{previousProject.title}</div>
              </a>
            </Link>
          ) : (
            <div>이전글이 없습니다.</div>
          )}
        </>
      ) : error ? (
        <div>error</div>
      ) : (
        <div>loading</div>
      )}

      <Link href="/project/before" passHref>
        <a>목록</a>
      </Link>
    </PageHead>
  )
}

ProjectBeforePage.getLayout = function getLayout(page: ReactElement) {
  return <NavigationLayout>{page}</NavigationLayout>
}

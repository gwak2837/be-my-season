import type { Editor } from '@toast-ui/react-editor'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import { ReactElement, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import PageHead from 'src/components/PageHead'
import useRequireAdmin from 'src/hooks/useRequireAdmin'
import NavigationLayout from 'src/layouts/NavigationLayout'
import ProjectLayout from 'src/layouts/ProjectLayout'
import styled from 'styled-components'
import { useSWRConfig } from 'swr'

import { OrangeButton } from '../introduce'

const ToastEditor = dynamic(() => import('src/components/ToastEditor'), { ssr: false })

const FlexBetweenCenter = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  padding: 1rem 0;
`

const FlexGap = styled.div`
  display: flex;
  gap: 1rem;
`

const Input = styled.input`
  border: 1px solid #c4c4c4;
  padding: 0.5rem 1rem;
  width: 100%;
`

const description = ''

export default function ProjectCreationPage() {
  const router = useRouter()
  const { mutate } = useSWRConfig()

  useRequireAdmin()

  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useForm({
    defaultValues: {
      title: '',
    },
  })

  // Create project
  const editorRef = useRef<Editor>(null)
  const [isCreationLoading, setIsCreationLoading] = useState(false)

  async function createContent({ title }: any) {
    if (editorRef.current) {
      setIsCreationLoading(true)

      const response = await fetch('/api/project', {
        method: 'POST',
        headers: {
          authorization: sessionStorage.getItem('jwt') ?? localStorage.getItem('jwt') ?? '',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          description: editorRef.current.getInstance().getHTML(),
        }),
      })

      if (response.ok) {
        toast.success('프로젝트를 생성했습니다')
        router.replace('/project')
        mutate('/api/project/current')
      } else {
        toast.warn(await response.text())
      }

      setIsCreationLoading(false)
    }
  }

  return (
    <PageHead title="컨텐츠 작성 - Be:MySeason" description={description}>
      <form onSubmit={handleSubmit(createContent)}>
        <FlexBetweenCenter>
          <OrangeButton disabled={isCreationLoading} type="submit">
            작성하기
          </OrangeButton>
          <Input
            placeholder="제목을 입력해주세요"
            {...register('title', { required: '제목을 입력해주세요' })}
          />
        </FlexBetweenCenter>

        <ToastEditor editorRef={editorRef} />
      </form>
    </PageHead>
  )
}

ProjectCreationPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <NavigationLayout>
      <ProjectLayout>{page}</ProjectLayout>
    </NavigationLayout>
  )
}

import type { Editor } from '@toast-ui/react-editor'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import { ReactElement, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import PageHead from 'src/components/PageHead'
import useRequireAdmin from 'src/hooks/useRequireAdmin'
import ContentLayout from 'src/layouts/ContentLayout'
import NavigationLayout from 'src/layouts/NavigationLayout'
import styled from 'styled-components'

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
`

const description = ''

export default function ContentCreationPage() {
  const router = useRouter()
  useRequireAdmin()

  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useForm({
    defaultValues: {
      title: '',
      type: 0,
    },
  })

  // Create content
  const editorRef = useRef<Editor>(null)
  const [isCreationLoading, setIsCreationLoading] = useState(false)

  async function createContent({ type, title }: any) {
    if (editorRef.current) {
      setIsCreationLoading(true)

      const response = await fetch('/api/content', {
        method: 'POST',
        headers: {
          authorization: sessionStorage.getItem('jwt') ?? localStorage.getItem('jwt') ?? '',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          description: editorRef.current.getInstance().getHTML(),
          type,
        }),
      })

      if (response.ok) {
        toast.success('컨텐츠를 생성했습니다')
        router.replace('/content')
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
          <FlexGap>
            <select disabled={isCreationLoading} {...register('type')}>
              <option value={0}>Column</option>
              <option value={1}>Interview</option>
            </select>
            <Input
              placeholder="제목을 입력해주세요"
              {...register('title', { required: '제목을 입력해주세요' })}
            />
          </FlexGap>
          <OrangeButton disabled={isCreationLoading} type="submit">
            작성하기
          </OrangeButton>
        </FlexBetweenCenter>

        <ToastEditor editorRef={editorRef} />
      </form>
    </PageHead>
  )
}

ContentCreationPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <NavigationLayout>
      <ContentLayout>{page}</ContentLayout>
    </NavigationLayout>
  )
}

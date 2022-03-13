import { useRouter } from 'next/router'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import useAuth from 'src/hooks/useAuth'
import { FlexEndCenter, OrangeButton, WhiteButton } from 'src/pages/introduce'
import { useSWRConfig } from 'swr'

import { CreationTextArea, Input2 } from './ReviewCreationForm'

function QnACard({ qna }: any) {
  const router = useRouter()
  const programId = (router.query.id ?? '') as string

  const { mutate } = useSWRConfig()
  const { data: user } = useAuth()

  // Update QnA
  const { handleSubmit, register, reset } = useForm({
    defaultValues: {
      title: qna.title,
      description: qna.description,
    },
  })

  const [isUpdateLoading, setIsUpdateLoading] = useState(false)

  async function updateQnA({ title, description }: any) {
    setIsUpdateLoading(true)

    const response = await fetch(`/api/program/${programId}/qna`, {
      method: 'PUT',
      headers: {
        authorization: sessionStorage.getItem('jwt') ?? localStorage.getItem('jwt') ?? '',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: qna.id,
        title,
        description,
      }),
    })

    if (response.ok) {
      toast.success('QnA를 수정했습니다')
      mutate(`/api/program/${programId}/qna`)
    } else {
      toast.warn(await response.text())
    }

    setIsUpdateLoading(false)
    setIsUpdateMode(false)
  }

  // Delete QnA
  const [isDeletionLoading, setIsDeletionLoading] = useState(false)

  async function deleteQnA() {
    setIsDeletionLoading(true)

    const response = await fetch(`/api/program/${programId}/qna?qnaId=${qna.id}`, {
      method: 'DELETE',
      headers: {
        authorization: sessionStorage.getItem('jwt') ?? localStorage.getItem('jwt') ?? '',
      },
    })

    if (response.ok) {
      toast.success('QnA를 삭제했습니다')
      mutate(`/api/program/${programId}/qna`)
    } else {
      toast.warn(await response.text())
    }

    setIsDeletionLoading(false)
  }

  // Toggle editor/viewer mode
  const [isUpdateMode, setIsUpdateMode] = useState(false)

  function beingUpdate(e: any) {
    e.preventDefault()
    setIsUpdateMode(true)
  }

  function cancelUpdating() {
    setIsUpdateMode(false)
    reset()
  }

  return (
    <li>
      <form onSubmit={handleSubmit(updateQnA)}>
        <div>
          {isUpdateMode ? (
            <>
              <Input2 {...register('title')} />
              <CreationTextArea {...register('description')} />
            </>
          ) : (
            <>
              <h4>{qna.title}</h4>
              <p>{qna.description}</p>
            </>
          )}
        </div>

        {user.userId === qna.user__id && (
          <FlexEndCenter>
            {isUpdateMode ? (
              <>
                <WhiteButton disabled={isUpdateLoading} onClick={cancelUpdating} type="reset">
                  취소
                </WhiteButton>
                <OrangeButton disabled={isUpdateLoading} type="submit">
                  완료
                </OrangeButton>
              </>
            ) : (
              <>
                <WhiteButton disabled={isDeletionLoading} onClick={deleteQnA} type="button">
                  삭제
                </WhiteButton>
                <OrangeButton onClick={beingUpdate} type="button">
                  수정
                </OrangeButton>
              </>
            )}
          </FlexEndCenter>
        )}
      </form>
    </li>
  )
}

export default QnACard

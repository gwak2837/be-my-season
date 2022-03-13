import { useRouter } from 'next/router'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import useAuth from 'src/hooks/useAuth'
import { OrangeButton } from 'src/pages/introduce'
import { submitWhenShiftEnter } from 'src/utils'
import { useSWRConfig } from 'swr'

import { CreationTextArea, FlexWrap, Input2 } from './ReviewCreationForm'

function QnACreationForm() {
  const router = useRouter()
  const programId = (router.query.id ?? '') as string

  const { data: user } = useAuth()
  const { mutate } = useSWRConfig()
  const [isCreationLoading, setIsCreationLoading] = useState(false)

  const {
    formState: { errors },
    handleSubmit,
    register,
    reset,
  } = useForm({
    defaultValues: {
      title: '',
      description: '',
    },
  })

  function checkLogin() {
    if (!user?.userId) {
      router.replace('/login')
      sessionStorage.setItem('redirectionUrlAfterLogin', router.asPath)
    }
  }

  // Create QnA
  async function createQnA({ title, description }: any) {
    setIsCreationLoading(true)

    const response = await fetch(`/api/program/${programId}/qna`, {
      method: 'POST',
      headers: {
        authorization: sessionStorage.getItem('jwt') ?? localStorage.getItem('jwt') ?? '',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title, description }),
    })

    if (response.ok) {
      toast.success('QnA를 작성했습니다')
      mutate(`/api/program/${programId}/qna`)
    } else {
      const result = await response.json()
      toast.warn(result.message)
    }

    setIsCreationLoading(false)
    reset()
  }

  return user?.userId ? (
    <form onSubmit={handleSubmit(createQnA)}>
      <h5>QnA 쓰기</h5>
      <FlexWrap>
        <Input2
          disabled={isCreationLoading}
          placeholder="QnA 제목을 입력해주세요"
          {...register('title', {
            required: 'QnA 제목을 입력해주세요',
            minLength: {
              value: 5,
              message: 'QnA 제목을 5글자 이상 입력해주세요',
            },
            maxLength: {
              value: 100,
              message: 'QnA 제목을 100글자 이하로 입력해주세요',
            },
          })}
        />
        <OrangeButton disabled={isCreationLoading} onClick={checkLogin} type="submit">
          생성
        </OrangeButton>
      </FlexWrap>
      <CreationTextArea
        disabled={isCreationLoading}
        onKeyDown={submitWhenShiftEnter}
        placeholder="QnA 내용을 입력해주세요"
        {...register('description', {
          required: 'QnA 내용을 입력해주세요',
          minLength: {
            value: 10,
            message: 'QnA 내용을 10글자 이상 입력해주세요',
          },
          maxLength: {
            value: 1000,
            message: 'QnA 내용을 1000글자 이하로 입력해주세요',
          },
        })}
      />
    </form>
  ) : null
}

export default QnACreationForm

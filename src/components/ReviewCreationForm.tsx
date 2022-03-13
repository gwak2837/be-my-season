import { useRouter } from 'next/router'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import useAuth from 'src/hooks/useAuth'
import { TextArea } from 'src/pages/contact/faq'
import { OrangeButton } from 'src/pages/introduce'
import { NumberInput } from 'src/pages/program/create'
import { submitWhenShiftEnter } from 'src/utils'
import styled from 'styled-components'
import { useSWRConfig } from 'swr'

export const FlexWrap = styled.div`
  display: flex;
  flex-flow: row wrap;
  gap: 1rem;
  margin: 1rem 0;

  > input:first-child {
    flex-grow: 1;
  }
`

const FlexCenterGap = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`

export const Input2 = styled.input`
  padding: 0.5rem 1rem;
  border: none;
  box-shadow: 0 0 0 1px #bebebe;
`

export const CreationTextArea = styled(TextArea)`
  min-height: 3rem;
`

function ReviewCreationForm() {
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
      point: 0,
    },
  })

  function checkLogin() {
    if (!user?.userId) {
      router.replace('/login')
      sessionStorage.setItem('redirectionUrlAfterLogin', router.asPath)
    }
  }

  // Create review
  async function createReview({ title, description, point }: any) {
    setIsCreationLoading(true)

    const response = await fetch(`/api/program/${programId}/review`, {
      method: 'POST',
      headers: {
        authorization: sessionStorage.getItem('jwt') ?? localStorage.getItem('jwt') ?? '',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title, description, point }),
    })

    if (response.ok) {
      toast.success('리뷰를 작성했습니다')
      mutate(`/api/program/${programId}/review`)
    } else {
      toast.warn(await response.text())
    }

    setIsCreationLoading(false)
    reset()
  }

  return user?.userId ? (
    <form onSubmit={handleSubmit(createReview)}>
      <h5>리뷰 쓰기</h5>
      <FlexWrap>
        <Input2
          disabled={isCreationLoading}
          placeholder="리뷰 제목을 입력해주세요"
          {...register('title', {
            required: '리뷰 제목을 입력해주세요',
            minLength: {
              value: 5,
              message: '리뷰 제목을 5글자 이상 입력해주세요',
            },
            maxLength: {
              value: 100,
              message: '리뷰 제목을 100글자 이하로 입력해주세요',
            },
          })}
        />
        <FlexCenterGap>
          <NumberInput
            disabled={isCreationLoading}
            placeholder="리뷰 점수를 입력해주세요"
            type="number"
            {...register('point', {
              required: '리뷰 점수를 입력해주세요',
              min: {
                value: 1,
                message: '리뷰 점수를 1점 이상 입력해주세요',
              },
              max: {
                value: 5,
                message: '리뷰 점수를 5점 이하로 입력해주세요',
              },
            })}
          />
          <OrangeButton disabled={isCreationLoading} onClick={checkLogin} type="submit">
            작성하기
          </OrangeButton>
        </FlexCenterGap>
      </FlexWrap>
      <CreationTextArea
        disabled={isCreationLoading}
        onKeyDown={submitWhenShiftEnter}
        placeholder="리뷰 내용을 입력해주세요"
        {...register('description', {
          required: '리뷰 내용을 입력해주세요',
          minLength: {
            value: 10,
            message: '리뷰 내용을 10글자 이상 입력해주세요',
          },
          maxLength: {
            value: 1000,
            message: '리뷰 내용을 1000글자 이하로 입력해주세요',
          },
        })}
      />
    </form>
  ) : null
}

export default ReviewCreationForm

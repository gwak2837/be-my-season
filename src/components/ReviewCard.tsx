import { useRouter } from 'next/router'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import useAuth from 'src/hooks/useAuth'
import { FlexEndCenter, OrangeButton, WhiteButton } from 'src/pages/introduce'
import { NumberInput } from 'src/pages/program/create'
import FilledStar from 'src/svgs/filled-star.svg'
import Star from 'src/svgs/star.svg'
import { submitWhenShiftEnter } from 'src/utils'
import styled from 'styled-components'
import { useSWRConfig } from 'swr'

import { CreationTextArea, FlexWrap, Input2 } from './ReviewCreationForm'

const FlexBetweenCenter = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  align-items: center;
  gap: 0 0.5rem;
`

const FlexCenterGap = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin: 0.5rem 0;

  > svg {
    width: 1.5rem;
  }
`

function ReviewCard({ review }: any) {
  const router = useRouter()
  const programId = (router.query.id ?? '') as string

  const { mutate } = useSWRConfig()
  const { data: user } = useAuth()

  // Update review
  const { handleSubmit, register, reset } = useForm({
    defaultValues: {
      title: review.title,
      description: review.description,
      point: review.point,
    },
  })

  const [isUpdateLoading, setIsUpdateLoading] = useState(false)

  async function updateReview({ title, description, point }: any) {
    setIsUpdateLoading(true)

    const response = await fetch(`/api/program/${programId}/review`, {
      method: 'PUT',
      headers: {
        authorization: sessionStorage.getItem('jwt') ?? localStorage.getItem('jwt') ?? '',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: review.id,
        title,
        description,
        point,
      }),
    })

    if (response.ok) {
      toast.success('리뷰를 수정했습니다')
      mutate(`/api/program/${programId}/review`)
    } else {
      toast.warn(await response.text())
    }

    setIsUpdateLoading(false)
    setIsUpdateMode(false)
  }

  // Delete review
  const [isDeletionLoading, setIsDeletionLoading] = useState(false)

  async function deleteReview() {
    setIsDeletionLoading(true)

    const response = await fetch(`/api/program/${programId}/review?reviewId=${review.id}`, {
      method: 'DELETE',
      headers: {
        authorization: sessionStorage.getItem('jwt') ?? localStorage.getItem('jwt') ?? '',
      },
    })

    if (response.ok) {
      toast.success('리뷰를 삭제했습니다')
      mutate(`/api/program/${programId}/review`)
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
      <form onSubmit={handleSubmit(updateReview)}>
        <div>
          {isUpdateMode ? (
            <>
              <FlexWrap>
                <Input2
                  disabled={isUpdateLoading}
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
                <NumberInput
                  disabled={isUpdateLoading}
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
              </FlexWrap>
              <CreationTextArea
                disabled={isUpdateLoading}
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
            </>
          ) : (
            <>
              <FlexBetweenCenter>
                <FlexCenterGap>
                  {Array.from(Array(review.point).keys()).map((key) => (
                    <FilledStar key={key} />
                  ))}
                  {Array.from(Array(5 - review.point).keys()).map((key) => (
                    <Star key={key} />
                  ))}
                </FlexCenterGap>
                <FlexCenterGap>
                  <h5>{review.user__nickname}</h5>
                  <h5>{new Date(review.creation_time).toLocaleString()}</h5>
                </FlexCenterGap>
              </FlexBetweenCenter>
              <h4>{review.title}</h4>
              <p>{review.description}</p>
            </>
          )}
        </div>

        {user.userId === review.user__id && (
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
                <WhiteButton disabled={isDeletionLoading} onClick={deleteReview} type="button">
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

export default ReviewCard

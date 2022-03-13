import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import useAuth from 'src/hooks/useAuth'
import { TextArea, applyLineBreak } from 'src/pages/contact/faq'
import { HorizontalBorder } from 'src/pages/content/[id]'
import { FlexEndCenter, OrangeButton, WhiteButton } from 'src/pages/introduce'
import { Input } from 'src/pages/register'
import DownFilledArrow from 'src/svgs/down-filled-arrow.svg'
import UpFilledArrow from 'src/svgs/up-filled-arrow.svg'
import { resizeTextareaHeight, submitWhenShiftEnter } from 'src/utils'
import styled from 'styled-components'
import { useSWRConfig } from 'swr'

const MinWidthForm = styled.form`
  min-width: 15rem;
`

const FlexBetweenCenter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const Grid = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 1rem;
`

const P = styled.p`
  margin: 1rem 0;
`

const HorizontalBorderGrey = styled(HorizontalBorder)`
  border-color: #eee;
`

function decodeFAQType(type: number) {
  switch (type) {
    case 0:
      return '결제 관련'
    case 1:
      return '환불 관련'
    case 2:
      return '프로그램'
    default:
      return ''
  }
}

function FAQCard({ faq }: any) {
  const { data: user } = useAuth()
  const { mutate } = useSWRConfig()

  // Toggle editor/viewer mode
  const [isUpdateMode, setIsUpdateMode] = useState(false)

  function beingUpdate(e: any) {
    e.preventDefault()
    setIsUpdateMode(true)
  }

  function cancelUpdating() {
    setIsUpdateMode(false)
  }

  // Toggle opening body
  const [isOpen, setIsOpen] = useState(false)

  function toggleOpen() {
    if (!isUpdateMode) {
      setIsOpen((prev) => !prev)
    }
  }

  // Update FAQ
  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useForm({
    defaultValues: {
      category: faq.category,
      title: faq.title,
      description: faq.description,
    },
  })

  const [isUpdateLoading, setIsUpdateLoading] = useState(false)

  async function updateContent({ category, title, description }: any) {
    setIsUpdateLoading(true)

    const response = await fetch(`/api/faq/${faq.id}`, {
      method: 'PUT',
      headers: {
        authorization: sessionStorage.getItem('jwt') ?? localStorage.getItem('jwt') ?? '',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        category,
        title,
        description,
      }),
    })

    if (response.ok) {
      toast.success('수정에 성공했습니다')
      mutate(`/api/faq`)
      setIsUpdateMode(false)
    } else {
      toast.warn(await response.text())
    }

    setIsUpdateLoading(false)
  }

  // Delete content
  const [isDeletionLoading, setIsDeletionLoading] = useState(false)

  async function deleteContent(e: any) {
    e.preventDefault()

    setIsDeletionLoading(true)

    const response = await fetch(`/api/faq/${faq.id}`, {
      method: 'DELETE',
      headers: {
        authorization: sessionStorage.getItem('jwt') ?? localStorage.getItem('jwt') ?? '',
      },
    })

    if (response.ok) {
      toast.success('삭제에 성공했습니다')
      mutate('/api/faq')
    } else {
      toast.warn(await response.text())
    }

    setIsDeletionLoading(false)
  }

  return (
    <MinWidthForm onSubmit={handleSubmit(updateContent)}>
      <HorizontalBorder />
      <FlexBetweenCenter onClick={toggleOpen}>
        <Grid>
          {isUpdateMode ? (
            <>
              <select disabled={isUpdateLoading} {...register('category')}>
                <option value={0}>Payment</option>
                <option value={1}>Refund</option>
                <option value={2}>Program</option>
              </select>
              <Input
                disabled={isUpdateLoading}
                placeholder="FAQ 제목을 입력해주세요"
                {...register('title', {
                  required: 'FAQ 제목을 입력해주세요',
                  minLength: {
                    value: 5,
                    message: 'FAQ 제목을 5글자 이상 입력해주세요',
                  },
                  maxLength: {
                    value: 100,
                    message: 'FAQ 제목을 100글자 이하로 입력해주세요',
                  },
                })}
              />
            </>
          ) : (
            <>
              <h4>{decodeFAQType(faq.category)}</h4>
              <div>{faq.title}</div>
            </>
          )}
        </Grid>
        <button>{isOpen ? <UpFilledArrow /> : <DownFilledArrow />}</button>
      </FlexBetweenCenter>

      {isOpen && (
        <>
          <HorizontalBorderGrey />
          {isUpdateMode ? (
            <TextArea
              disabled={isUpdateLoading}
              onKeyDown={submitWhenShiftEnter}
              onInput={resizeTextareaHeight}
              placeholder="FAQ 내용을 입력해주세요"
              {...register('description', {
                required: 'FAQ 내용을 입력해주세요',
                minLength: {
                  value: 10,
                  message: 'FAQ 내용을 10글자 이상 입력해주세요',
                },
                maxLength: {
                  value: 1000,
                  message: 'FAQ 내용을 1000글자 이하로 입력해주세요',
                },
              })}
            />
          ) : (
            <P>{applyLineBreak(faq.description)}</P>
          )}

          <FlexEndCenter>
            {user?.isAdmin &&
              (isUpdateMode ? (
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
                  <WhiteButton disabled={isDeletionLoading} onClick={deleteContent} type="button">
                    삭제하기
                  </WhiteButton>
                  <OrangeButton disabled={isDeletionLoading} onClick={beingUpdate} type="button">
                    수정하기
                  </OrangeButton>
                </>
              ))}
          </FlexEndCenter>
        </>
      )}
    </MinWidthForm>
  )
}

export default FAQCard

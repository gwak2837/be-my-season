/* eslint-disable jsx-a11y/label-has-associated-control */
import Link from 'next/link'
import { useState } from 'react'
import PageHead from 'src/components/PageHead'

const description = ''

export default function FAQPage() {
  const [title, setTitle] = useState('')
  const [contents, setContents] = useState('')

  return (
    <PageHead title="자주 묻는 질문 - " description={description}>
      <Link href="/faq" passHref>
        <a>FAQ</a>
      </Link>

      <label>제목</label>
      <input onChange={(e) => setTitle(e.target.value)} value={title} />
      <label>내용</label>
      <input onChange={(e) => setContents(e.target.value)} value={contents} />

      <button
        onClick={() => {
          fetch('/api/post/create', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ title, contents }),
          })
        }}
      >
        제출
      </button>

      <A>Hello worlasdsadd!!!!</A>
      <A>Hello worlasdsadd!!!!</A>
      <A>Hello worlasdsadd!!!!</A>
      <A>Hello worlasdsadd!!!!</A>
      <A>Hello worlasdsadd!!!!</A>
      <A>Hello worlasdsadd!!!!</A>
      <A>Hello worlasdsadd!!!!</A>
      <B>Hello worlasdsadd!!!!</B>
    </PageHead>
  )
}

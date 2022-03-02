import Link from 'next/link'
import { ReactElement, useState } from 'react'
import PageHead from 'src/components/PageHead'
import NavigationLayout from 'src/layouts/NavigationLayout'
import styled from 'styled-components'

const description = ''

export default function RegisterPage() {
  function register(input: any) {
    fetch('/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ input }),
    })
  }

  return (
    <PageHead title="회원가입 - Be:MySeason" description={description}>
      <form onSubmit={register}>
        <input />
        <input />
        <button type="submit">회원가입</button>
      </form>

      <Link href="/register" passHref>
        <a>아이디/비밀번호 찾기</a>
      </Link>

      <Link href="/login" passHref>
        <a>로그인</a>
      </Link>
    </PageHead>
  )
}

RegisterPage.getLayout = function getLayout(page: ReactElement) {
  return <NavigationLayout>{page}</NavigationLayout>
}

import { ReactElement } from 'react'
import PageHead from 'src/components/PageHead'
import NavigationLayout from 'src/layouts/NavigationLayout'

const description = ''

export default function FindPage() {
  return (
    <PageHead title="아이디/비밀번호 찾기 - Be:MySeason" description={description}>
      <div>123</div>
    </PageHead>
  )
}

FindPage.getLayout = function getLayout(page: ReactElement) {
  return <NavigationLayout>{page}</NavigationLayout>
}

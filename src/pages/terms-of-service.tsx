import { ReactElement } from 'react'
import PageHead from 'src/components/PageHead'
import NavigationLayout from 'src/layouts/NavigationLayout'

const description = ''

export default function TermsOfServicePage() {
  return (
    <PageHead title="이용약관 - Be:MySeason" description={description}>
      이용약관
    </PageHead>
  )
}

TermsOfServicePage.getLayout = function getLayout(page: ReactElement) {
  return <NavigationLayout>{page}</NavigationLayout>
}

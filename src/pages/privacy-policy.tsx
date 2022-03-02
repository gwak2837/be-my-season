import { ReactElement } from 'react'
import PageHead from 'src/components/PageHead'
import NavigationLayout from 'src/layouts/NavigationLayout'

const description = ''

export default function PrivacyPolicyPage() {
  return (
    <PageHead title="개인정보처리방침 - Be:MySeason" description={description}>
      개인정보처리방침
    </PageHead>
  )
}

PrivacyPolicyPage.getLayout = function getLayout(page: ReactElement) {
  return <NavigationLayout>{page}</NavigationLayout>
}

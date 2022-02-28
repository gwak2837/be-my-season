import { ReactElement } from 'react'
import PageHead from 'src/components/PageHead'
import CommunityLayout from 'src/layouts/CommunityLayout'
import NavigationLayout from 'src/layouts/NavigationLayout'

const description = ''

export default function CommunityAfterPage() {
  return (
    <PageHead title="커뮤니티 - Be:MySeason" description={description}>
      커뮤니티 id
    </PageHead>
  )
}

CommunityAfterPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <NavigationLayout>
      <CommunityLayout>{page}</CommunityLayout>
    </NavigationLayout>
  )
}
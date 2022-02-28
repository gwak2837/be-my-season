import { ReactElement } from 'react'
import PageHead from 'src/components/PageHead'
import NavigationLayout from 'src/layouts/NavigationLayout'

const description = ''

export default function ContentPage() {
  return (
    <PageHead title="컨텐츠 - Be:MySeason" description={description}>
      컨텐츠 id
    </PageHead>
  )
}

ContentPage.getLayout = function getLayout(page: ReactElement) {
  return <NavigationLayout>{page}</NavigationLayout>
}
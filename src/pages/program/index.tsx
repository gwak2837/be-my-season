import Image from 'next/image'
import { ReactElement } from 'react'
import PageHead from 'src/components/PageHead'
import IntroduceLayout from 'src/layouts/IntroduceLayout'
import NavigationLayout from 'src/layouts/NavigationLayout'
import styled from 'styled-components'

const description = ''

export default function ProgramsPage() {
  return (
    <PageHead title="프로그램 - Be:MySeason" description={description}>
      프로그램
    </PageHead>
  )
}

ProgramsPage.getLayout = function getLayout(page: ReactElement) {
  return <NavigationLayout>{page}</NavigationLayout>
}

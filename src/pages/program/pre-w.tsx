import Image from 'next/image'
import { ReactElement } from 'react'
import PageHead from 'src/components/PageHead'
import NavigationLayout from 'src/layouts/NavigationLayout'
import ProgramLayout from 'src/layouts/ProgramLayout'
import styled from 'styled-components'

const description = ''

export default function PreWProgramsPage() {
  return (
    <PageHead title="Pre-W - Be:MySeason" description={description}>
      프로그램
    </PageHead>
  )
}

PreWProgramsPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <NavigationLayout>
      <ProgramLayout>{page}</ProgramLayout>
    </NavigationLayout>
  )
}

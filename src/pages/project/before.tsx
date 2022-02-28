import Image from 'next/image'
import { ReactElement } from 'react'
import PageHead from 'src/components/PageHead'
import NavigationLayout from 'src/layouts/NavigationLayout'
import ProjectLayout from 'src/layouts/ProjectLayout'
import styled from 'styled-components'

const description = ''

export default function ProjectBeforePage() {
  return (
    <PageHead title="과거 - Be:MySeason" description={description}>
      과거
    </PageHead>
  )
}

ProjectBeforePage.getLayout = function getLayout(page: ReactElement) {
  return (
    <NavigationLayout>
      <ProjectLayout>{page}</ProjectLayout>
    </NavigationLayout>
  )
}

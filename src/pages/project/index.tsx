import Image from 'next/image'
import { ReactElement } from 'react'
import PageHead from 'src/components/PageHead'
import NavigationLayout from 'src/layouts/NavigationLayout'
import ProjectLayout from 'src/layouts/ProjectLayout'
import styled from 'styled-components'

const description = ''

export default function ProjectPage() {
  return (
    <PageHead title="현재 - Be:MySeason" description={description}>
      현재
    </PageHead>
  )
}

ProjectPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <NavigationLayout>
      <ProjectLayout>{page}</ProjectLayout>
    </NavigationLayout>
  )
}

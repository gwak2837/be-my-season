import Image from 'next/image'
import { ReactElement } from 'react'
import PageHead from 'src/components/PageHead'
import NavigationLayout from 'src/layouts/NavigationLayout'
import styled from 'styled-components'

const description = ''

export default function ProjectBeforePage() {
  return (
    <PageHead title="프로젝트 - Be:MySeason" description={description}>
      id
    </PageHead>
  )
}

ProjectBeforePage.getLayout = function getLayout(page: ReactElement) {
  return <NavigationLayout>{page}</NavigationLayout>
}

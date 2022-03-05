import Image from 'next/image'
import { ReactElement, useState } from 'react'
import PageHead from 'src/components/PageHead'
import ProjectCard from 'src/components/ProjectCard'
import NavigationLayout from 'src/layouts/NavigationLayout'
import ProjectLayout from 'src/layouts/ProjectLayout'
import { defaultFetcher } from 'src/utils'
import styled from 'styled-components'
import useSWR from 'swr'

import { buttonCount } from '../content'

export const Ul = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 2rem 1rem;
`

const description = ''

export default function ProjectBeforePage() {
  const [buttonIndex, setButtonIndex] = useState(0)
  const [page, setPage] = useState(1)
  const { data, error } = useSWR(`/api/project?page=${page - 1}`, defaultFetcher)

  return (
    <PageHead title="지난 프로젝트 - Be:MySeason" description={description}>
      <Ul>
        {data
          ? data.projects.map((project: any) => <ProjectCard key={project.id} project={project} />)
          : error
          ? 'error'
          : 'loading'}
      </Ul>

      <ol>
        <button onClick={() => setButtonIndex(buttonIndex - 1)}>{'<'}</button>
        {Array.from(Array(buttonCount).keys()).map((key) => (
          <button key={key} onClick={() => setPage(buttonCount * buttonIndex + key + 1)}>
            {buttonCount * buttonIndex + key + 1}
          </button>
        ))}
        <button onClick={() => setButtonIndex(buttonIndex + 1)}>{'>'}</button>
      </ol>
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

import Image from 'next/image'
import { ReactElement, useState } from 'react'
import PageHead from 'src/components/PageHead'
import ProjectCard from 'src/components/ProjectCard'
import NavigationLayout from 'src/layouts/NavigationLayout'
import ProjectLayout from 'src/layouts/ProjectLayout'
import LeftArrow from 'src/svgs/left-arrow.svg'
import RightArrow from 'src/svgs/right-arrow.svg'
import { defaultFetcher } from 'src/utils'
import styled from 'styled-components'
import useSWR from 'swr'

import { Button, Ol, buttonCount } from '../content'

export const Ul = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 2rem 1rem;
`

const description = ''

export default function ProjectBeforePage() {
  const [page, setPage] = useState(1)
  const { data: projects, error } = useSWR(`/api/project?page=${page - 1}`, defaultFetcher)

  // Buttons
  const [big, setBig] = useState(0)

  function goToPreviousPage() {
    setBig(big - 1)
    setPage(buttonCount * big)
  }

  function goToNextPage() {
    setBig(big + 1)
    setPage((buttonCount + 1) * big)
  }

  return (
    <PageHead title="지난 프로젝트 - Be:MySeason" description={description}>
      <Ul>
        {projects ? (
          projects.length > 0 ? (
            projects.map((project: any) => <ProjectCard key={project.id} project={project} />)
          ) : (
            <div>프로젝트가 없습니다</div>
          )
        ) : error ? (
          'error'
        ) : (
          'loading'
        )}
      </Ul>

      <Ol>
        <Button disabled={big === 0} onClick={goToPreviousPage}>
          <LeftArrow />
        </Button>
        {Array.from(Array(buttonCount).keys()).map((key) => (
          <Button key={key} onClick={() => setPage(buttonCount * big + key + 1)}>
            {buttonCount * big + key + 1}
          </Button>
        ))}
        <Button onClick={goToNextPage}>
          <RightArrow />
        </Button>
      </Ol>
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

import Image from 'next/image'
import Link from 'next/link'
import { SquareFrame } from 'src/styles/common'

type Props = {
  project: any
}

function ProjectCard({ project }: Props) {
  return (
    <li>
      <Link href={`/project/${project.id}`} passHref>
        <a>
          <SquareFrame>
            <Image src="/images/logo-transparent.png" alt="logo" layout="fill" objectFit="cover" />
          </SquareFrame>
          <div>{project.title}</div>
          <div>{new Date(project.creation_time).toLocaleDateString()}</div>
        </a>
      </Link>
    </li>
  )
}

export default ProjectCard

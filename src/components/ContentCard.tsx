import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { SquareFrame } from 'src/styles/common'

export function decodeType(type: number) {
  switch (type) {
    case 0:
      return 'Column'
    case 1:
      return 'Interview'
    default:
      return ''
  }
}

type Props = {
  content: any
  showType?: boolean
}

function ContentCard({ content, showType }: Props) {
  return (
    <li>
      <Link href={`/content/${content.id}`} passHref>
        <a>
          <SquareFrame>
            <Image src="/images/logo-transparent.png" alt="logo" layout="fill" objectFit="cover" />
          </SquareFrame>
          <div>
            {showType && `[${decodeType(content.type)}]`} {content.title}
          </div>
          <div>{new Date(content.creation_time).toLocaleDateString()}</div>
        </a>
      </Link>
    </li>
  )
}

export default ContentCard

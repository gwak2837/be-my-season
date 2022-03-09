import Image from 'next/image'
import Link from 'next/link'
import { SquareFrame } from 'src/styles/common'

export function decodeCommunityType(type: number) {
  switch (type) {
    case 0:
      return '예정'
    case 1:
      return '진행중'
    case 2:
      return '완료'
    default:
      return ''
  }
}

type Props = {
  community: any
  showType?: boolean
}

function CommunityCard({ community, showType }: Props) {
  return (
    <li>
      <Link href={`/community/${community.id}`} passHref>
        <a>
          <SquareFrame>
            <Image src="/images/logo-transparent.png" alt="logo" layout="fill" objectFit="cover" />
          </SquareFrame>
          <div>
            {showType && `[${decodeCommunityType(community.type)}]`} {community.title}
          </div>
          <div>{new Date(community.creation_time).toLocaleDateString()}</div>
        </a>
      </Link>
    </li>
  )
}

export default CommunityCard

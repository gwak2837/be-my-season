import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { SquareFrame } from 'src/styles/common'
import { formatNumber } from 'src/utils'

export function decodeType(type: number) {
  switch (type) {
    case 0:
      return 'before'
    case 1:
      return 'ing'
    case 2:
      return 'after'
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
            {showType && `[${decodeType(community.type)}]`} {community.title}
          </div>
          <div>{formatNumber(community.price)}원</div>
        </a>
      </Link>
    </li>
  )
}

export default CommunityCard

import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { SquareFrame } from 'src/styles/common'
import { formatNumber } from 'src/utils'

export function decodeProgramType(type: number) {
  switch (type) {
    case 0:
      return 'Pre-W'
    case 1:
      return 'Re-W'
    case 2:
      return 'Re-turnship'
    default:
      return ''
  }
}

type Props = {
  program: any
  showType?: boolean
}

function ProgramCard({ program, showType }: Props) {
  return (
    <li>
      <Link href={`/program/${program.id}`} passHref>
        <a>
          <SquareFrame>
            <Image src="/images/logo-transparent.png" alt="logo" layout="fill" objectFit="cover" />
          </SquareFrame>
          <div>
            {showType && `[${decodeProgramType(program.type)}]`} {program.title}
          </div>
          <div>{formatNumber(program.price)}원</div>
        </a>
      </Link>
    </li>
  )
}

export default ProgramCard

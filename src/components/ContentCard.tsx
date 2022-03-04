import Image from 'next/image'
import { useRouter } from 'next/router'
import { SquareFrame } from 'src/styles/common'

function decodeType(type: number) {
  switch (type) {
    case 0:
      return 'Column'
    case 1:
      return 'Interview'
  }
}

type Props = {
  content: any
  showType?: boolean
}

function ContentCard({ content, showType }: Props) {
  const router = useRouter()

  function goToContentPage() {
    router.push(`/content/${content.id}`)
  }

  return (
    <li onClick={goToContentPage}>
      <SquareFrame>
        <Image src="/images/logo-transparent.png" alt="logo" layout="fill" objectFit="cover" />
      </SquareFrame>
      <div>
        {showType && `[${decodeType(content.type)}]`} {content.title}
      </div>
      <div>{new Date(content.creation_time).toLocaleDateString()}</div>
    </li>
  )
}

export default ContentCard

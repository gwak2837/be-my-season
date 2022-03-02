import Checkbox from 'src/svgs/Checkbox'
import { DisplayNoneInput } from 'src/pages/login'
import styled from 'styled-components'
import { ReactNode, useState } from 'react'

const Ul = styled.ul`
  display: flex;
  justify-content: space-around;
  align-items: center;

  > li {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 1rem;
    cursor: pointer;
  }
`

type Props = {
  values: any[]
  initialValue: any
  onChange: (newValue: any) => void
}

function SingleSelectionCheckbox({ values, initialValue, onChange }: Props) {
  const [checkedValue, setCheckedValue] = useState(initialValue)

  return (
    <Ul>
      {values.map((value) => (
        <li
          key={value}
          onClick={() => {
            setCheckedValue(value)
            onChange(value)
          }}
        >
          <DisplayNoneInput type="checkbox" />
          <Checkbox isChecked={checkedValue === value} />
          {value}
        </li>
      ))}
    </Ul>
  )
}

export default SingleSelectionCheckbox

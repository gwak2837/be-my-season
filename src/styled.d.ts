// https://styled-components.com/docs/api#create-a-declarations-file
/* eslint-disable @typescript-eslint/no-empty-interface */
import 'styled-components'
import { Theme } from 'src/models/config'

declare module 'styled-components' {
  export interface DefaultTheme extends Theme {}
}

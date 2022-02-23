import 'react-toastify/dist/ReactToastify.min.css'
import 'normalize.css'

import type { NextPage } from 'next'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import type { ReactElement, ReactNode } from 'react'
import React from 'react'
import { ToastContainer, cssTransition } from 'react-toastify'
import { RecoilRoot } from 'recoil'
import { theme } from 'src/models/config'
import { GlobalStyle } from 'src/styles/global'
import { ThemeProvider } from 'styled-components'

const fade = cssTransition({
  enter: 'fadeIn',
  exit: 'fadeOut',
})

type AppPropsWithLayout = AppProps & {
  Component: NextPage & {
    getLayout?: (page: ReactElement) => ReactNode
  }
}

export default function AlpacaSalonApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      <main>
        <ThemeProvider theme={theme}>
          <GlobalStyle />
          <RecoilRoot>
            {getLayout ? getLayout(<Component {...pageProps} />) : <Component {...pageProps} />}
          </RecoilRoot>
        </ThemeProvider>
      </main>
      <ToastContainer autoClose={2000} hideProgressBar position="top-center" transition={fade} />
    </>
  )
}

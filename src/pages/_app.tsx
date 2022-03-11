import 'react-toastify/dist/ReactToastify.min.css'
import 'normalize.css'
import 'src/styles/toast.css'

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
import Script from 'next/script'

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

      <Script id="show-banner" strategy="lazyOnload">
        {`
          (function() {
            var w = window;
            if (w.ChannelIO) {
              return (window.console.error || window.console.log || function(){})('ChannelIO script included twice.');
            }
            var ch = function() {
              ch.c(arguments);
            };
            ch.q = [];
            ch.c = function(args) {
              ch.q.push(args);
            };
            w.ChannelIO = ch;
            function l() {
              if (w.ChannelIOInitialized) {
                return;
              }
              w.ChannelIOInitialized = true;
              var s = document.createElement('script');
              s.type = 'text/javascript';
              s.async = true;
              s.src = 'https://cdn.channel.io/plugin/ch-plugin-web.js';
              s.charset = 'UTF-8';
              var x = document.getElementsByTagName('script')[0];
              x.parentNode.insertBefore(s, x);
            }
            if (document.readyState === 'complete') {
              l();
            } else if (window.attachEvent) {
              window.attachEvent('onload', l);
            } else {
              window.addEventListener('DOMContentLoaded', l, false);
              window.addEventListener('load', l, false);
            }
          })();
          ChannelIO('boot', {
            "pluginKey": "fec9b3ef-3877-4495-8d82-1c8567b512c1"
          });
        `}
      </Script>

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

import Document, { DocumentContext, Head, Html, Main, NextScript } from 'next/document'
import {
  APPLICATION_SHORT_NAME,
  AUTHOR,
  CANONICAL_URL,
  KEYWORDS,
  SUBJECT,
  theme,
} from 'src/models/config'
import { ServerStyleSheet } from 'styled-components'

export default class AlpacaSalonDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const sheet = new ServerStyleSheet()
    const originalRenderPage = ctx.renderPage

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) => sheet.collectStyles(<App {...props} />),
        })

      const initialProps = await Document.getInitialProps(ctx)
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      }
    } finally {
      sheet.seal()
    }
  }

  render() {
    return (
      <Html>
        <Head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
          <link
            href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@100;300;400;500;700;900&family=Roboto:wght@100;300;400;500;700;900&display=swap"
            rel="stylesheet"
          />
          <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
          <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
          <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
          <link rel="manifest" href="/site.webmanifest" />
          <link rel="mask-icon" href="/safari-pinned-tab.svg" color={theme.primary} />
          <link rel="shortcut icon" href="/images/shortcut-icon.png" />
          <link rel="canonical" href={CANONICAL_URL} />
          <meta name="author" content={AUTHOR} />
          <meta name="keywords" content={KEYWORDS} />
          <meta name="application-name" content={APPLICATION_SHORT_NAME} />
          <meta name="msapplication-TileColor" content={theme.primary} />
          <meta name="theme-color" content={theme.primary} />
          <meta name="mobile-web-app-capable" content="yes" />
          <meta name="apple-mobile-web-app-title" content={APPLICATION_SHORT_NAME} />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta name="apple-mobile-web-app-status-bar-style" content="black" />
          <meta name="generator" content="Next.js" />
          <meta name="subject" content={SUBJECT} />
          <meta name="rating" content="general" />
          <meta name="robots" content="index,follow" />
          <meta name="revisit-after" content="7 days" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

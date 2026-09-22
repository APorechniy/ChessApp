import React from "react";
import Document, { Html, Head, Main, NextScript } from "next/document";
import { ServerStyleSheet } from "styled-components";

export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) =>
            sheet.collectStyles(<App {...props} />),
        });

      const initialProps = await Document.getInitialProps(ctx);
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      };
    } finally {
      sheet.seal();
    }
  }

  render() {
    const SHOW_METRIKA = process.env.NEXT_ENV && process.env.NODE_ENV === "production"
    return (
      <Html lang="ru">
        <Head>
          <link
            rel="icon"
            type="image/x-icon"
            href="/favicon.ico"
            sizes="16x16"
          ></link>

          <link
            rel="icon"
            type="image/x-icon"
            href="/favicon.ico"
            sizes="32x32"
          ></link>

          <link
            rel="icon"
            type="image/x-icon"
            href="/favicon.ico"
            sizes="48x48"
          ></link>

          <link
            rel="icon"
            type="image/x-icon"
            href="/favicon.ico"
            sizes="96x96"
          ></link>

          <link
            rel="icon"
            type="image/x-icon"
            href="/favicon.ico"
            sizes="144x144"
          ></link>

          <link
            rel="icon"
            type="image/x-icon"
            href="/favicon.ico"
            sizes="192x192"
          ></link>

          <link
            rel="icon"
            type="image/x-icon"
            href="/favicon.ico"
            sizes="512x512"
          ></link>

          <meta
            name="viewport"
            content="width=device-width, initial-scale=1"
          ></meta>

          <meta name="author" lang="ru" content="Porechnyy Alexandr" />
          <meta httpEquiv="content-type" content="text/html; charset=UTF-8" />
          <meta name="resource-type" content="Homepage" />
          <meta name="robots" content="index,follow" />
          <meta httpEquiv="content-language" content="ru" />
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
          <link href="https://fonts.googleapis.com/css2?family=Chivo:ital,wght@0,100..900;1,100..900&family=Manrope:wght@200..800&family=Montserrat:ital,wght@0,100..900;1,100..900&family=Oswald:wght@200..700&family=Roboto:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet" />
        </Head>
        <body>
          <Main></Main>
          <NextScript />
          <script src="https://yookassa.ru/checkout-widget/v1/checkout-widget.js"></script>
          {SHOW_METRIKA &&
            <>
              <script
                type="text/javascript"
                dangerouslySetInnerHTML={{
                  __html: `(function(m,e,t,r,i,k,a){
                    m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
                    m[i].l=1*new Date();
                    for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
                    k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)
                })(window, document,'script','https://mc.yandex.ru/metrika/tag.js?id=106697518', 'ym');

                ym(106697518, 'init', {ssr:true, webvisor:true, clickmap:true, ecommerce:"dataLayer", referrer: document.referrer, url: location.href, accurateTrackBounce:true, trackLinks:true});
              `,
                }}
              ></script>

              <noscript><div><img src="https://mc.yandex.ru/watch/106697518" style={{ position: "absolute", left: "-9999px" }} alt="" /></div></noscript>
            </>
          }
        </body>
      </Html>
    );
  }
}

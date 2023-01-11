import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {

  // static async getInitialProps(ctx: DocumentContext):Promise<DocumentInitialProps>{
  //   const initialProps = await Document.getInitialProps(ctx);
  //   return( ...initialProps);
  // }
  return (
    <Html lang="en">
      <Head />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link href="https://fonts.googleapis.com/css2?family=Noto+Sans:wght@300;400;500;700&display=swap" rel="stylesheet" />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

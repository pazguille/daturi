import { Head } from '$fresh/runtime.ts';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';

export default function Layout({ children }) {
  return (
    <>
      <Head>
        <meta charset="utf-8" />
        <title>Daturi - Convert images to Base64</title>
        <meta name="description" content="Convert images to Base64" />
        <meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=5" />
        <meta name="google-site-verification" content="mCcIVhEmfxncp5QuidL59_Bwdgt1Nl7gSkgWDZLSOGE" />
        <meta name="HandheldFriendly" content="True" />
        <link rel="shortcut icon" href="src/favicon.svg" />
        <link rel="preconnect" href="https://www.google-analytics.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link rel="preload" href="https://fonts.gstatic.com/s/pacifico/v17/FwZY7-Qmy14u9lezJ-6H6MmBp0u-.woff2" as="font" crossOrigin="anonymous" />
        <link rel="preload" href="https://s3.amazonaws.com/github/ribbons/forkme_right_darkblue_121621.png" as="image" />
        <link rel="preload" href="css/background.webp" as="image" />
        <link rel="stylesheet" href="css/normalize.css" />
        <link rel="stylesheet" href="css/upfile.min.css" />
        <link rel="stylesheet" href="css/app.css" />
      </Head>
      <Header />
      <main>
        {children}
      </main>
      <Footer />
      <script src="/js/upfile.min.js" defer></script>
      <script src="/js/app.full.js" defer></script>
    </>
  );
}

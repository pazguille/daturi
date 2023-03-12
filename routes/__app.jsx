import { Head } from "$fresh/runtime.ts";

export default function App({ Component }) {
  return (
    <>
      <Head>
        <title>APP</title>
      </Head>
      <Component />
    </>
  );
}

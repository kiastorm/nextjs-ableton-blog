import App from "next/app";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { Hydrate, QueryClient, QueryClientProvider } from "react-query";
import { TinaEditProvider } from "tinacms/dist/edit-state";
import { Layout } from "~/components/layout/layout";
import { AudioPlayerProvider } from "react-use-audio-player";

import { ExperimentalGetTinaClient } from "~/.tina/__generated__/types";

import "../globals.css";
import { staticRequest } from "tinacms";
import { GlobalContextProvider } from "~/global-context";
import { GlobalProvider } from "~/global-provider";

const branch = "main";
// When working locally, hit our local filesystem.
// On a Vercel deployment, hit the Tina Cloud API
const apiURL =
  process.env.NODE_ENV == "development"
    ? "http://localhost:4001/graphql"
    : `https://content.tinajs.io/content/${process.env.NEXT_PUBLIC_TINA_CLIENT_ID}/github/${branch}`;

const MyApp = ({ Component, pageProps, tinaProps, ...rest }: any) => {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <AudioPlayerProvider>
          <GlobalProvider tinaProps={tinaProps}>
            <TinaEditProvider
              showEditButton={true}
              editMode={
                <TinaCMS
                  apiURL={apiURL}
                  mediaStore={async () => {
                    // Load media store dynamically so it only loads in edit mode
                    const pack = await import("next-tinacms-cloudinary");
                    return pack.TinaCloudCloudinaryMediaStore;
                  }}
                >
                  <Layout>
                    <Component {...pageProps} />
                  </Layout>
                </TinaCMS>
              }
            >
              <Layout>
                <Component {...pageProps} />
              </Layout>
            </TinaEditProvider>
          </GlobalProvider>
        </AudioPlayerProvider>
      </Hydrate>
    </QueryClientProvider>
  );
};

// @ts-ignore FIXME: default export needs to be 'ComponentType<{}>
const TinaCMS = dynamic(() => import("tinacms"), { ssr: false });

MyApp.getInitialProps = async (appContext: any) => {
  const client = ExperimentalGetTinaClient();
  const getMusicList = await client.getMusicList({});
  const getPostList = await client.getPostList({});
  // calls page's `getInitialProps` and fills `appProps.pageProps`
  const appProps = await App.getInitialProps(appContext);

  return {
    ...appProps,
    tinaProps: {
      getMusicList,
      getPostList,
    },
  };
};

export default MyApp;

import "../styles/globals.css";
import type { AppProps } from "next/app";
import { UserProvider } from "@auth0/nextjs-auth0";
import { ChakraProvider } from "@chakra-ui/react";
import { myTheme } from "src/styles/theme";
import { useEffect, useState } from "react";
import { Hydrate, QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import axios from "axios";

const {AXIOS_URL_BASE} = process.env;
axios.defaults.baseURL = AXIOS_URL_BASE || "http://127.0.0.1:3000/api"

function MyApp({ Component, pageProps }: any) {
  const queryClient = new QueryClient();
  const [showChild, setShowChild] = useState(false);

  useEffect(() => {
    setShowChild(true);
  }, []);

  if (!showChild) {
    return null;
  }

  if (typeof window === "undefined") {
    return <></>;
  } else {
    return (
      <QueryClientProvider client={queryClient}>
        <ChakraProvider>
          <UserProvider>
            <Hydrate state={pageProps.dehydratedState}>
              <Component {...pageProps} />
            </Hydrate>
            <ReactQueryDevtools />
          </UserProvider>
        </ChakraProvider>
      </QueryClientProvider>
    );
  }
}

export default MyApp;

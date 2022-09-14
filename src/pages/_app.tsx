import "../styles/globals.css";
import type { AppProps } from "next/app";
import { UserProvider } from "@auth0/nextjs-auth0";
import { ChakraProvider } from "@chakra-ui/react";
import { myTheme } from "src/styles/theme";
import { useEffect, useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

function MyApp({ Component, pageProps }: AppProps) {
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
            <Component {...pageProps} />
            <ReactQueryDevtools />
          </UserProvider>
        </ChakraProvider>
      </QueryClientProvider>
    );
  }
}
export default MyApp;

import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { Provider } from "react-redux";
import { AuthContextProvider } from "../context/AuthContext";
import { QueryClientProvider, QueryClient } from "react-query";

import Head from "next/head";
import store from "../store/store";
import axios from "axios";
import Navbar from "../components/Layout/Navbar";
import NProgress from "nprogress";
import Router from "next/router";

const queryClient = new QueryClient();
axios.defaults.withCredentials = true;

Router.events.on("routeChangeStart", (url) => {
  // console.log(`Loading: ${url}`);
  NProgress.start();
});
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

import GetCurrentUser from "../components/Users/GetCurrentUser";

const MyApp = ({ Component, pageProps }) => {
  const theme = extendTheme({
    colors: {
      maku: {
        50: "#FFF5F5",
        100: "#FED7D7",
        200: "#FEB2B2",
        300: "#FC8181",
        400: "#F56565",
        500: "#FC8181",
      },
    },
  });

  return (
    <AuthContextProvider>
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <ChakraProvider theme={theme}>
            <Head>
              <link
                rel="shortcut icon"
                href="favicon.png"
                type="image/x-icon"
              />
              <link rel="stylesheet" type="text/css" href="./nprogress.css" />
            </Head>
            <GetCurrentUser />
            <Navbar />
            <Component {...pageProps} />
          </ChakraProvider>
        </Provider>
      </QueryClientProvider>
    </AuthContextProvider>
  );
};

export default MyApp;

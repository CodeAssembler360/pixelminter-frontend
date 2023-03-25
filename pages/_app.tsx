import React, { useEffect } from "react";
import Router from "next/router";
import NProgress from "nprogress";
import { ThemeProvider } from "styled-components";
import { HelmetProvider } from "react-helmet-async";
import { ThirdwebProvider as ThirdWebProvider } from "@3rdweb/react";
import { WalletLinkConnector } from '@web3-react/walletlink-connector'
import { WalletConnectConnector } from '@web3-react/walletconnect-connector'
import { InjectedConnector } from '@web3-react/injected-connector'
import { useWeb3React } from '@web3-react/core'
import { GlobalMeta } from "utils/meta";
import GlobalStyles from "utils/globalStyles";
import { theme } from "utils/theme";
import "normalize.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-quill/dist/quill.snow.css";
Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());
import { Provider } from "react-redux";
import { AppWrapper } from "state";
import { UserContext, UserContextProvider } from "context/UserContext";
import { store } from "app/store";
import "../public/styles/global.css";
import { useDispatch } from "react-redux";
import { walletRequest } from "app/WalletSlice";

// const canUseDOM = typeof window !== "undefined";
// const useIsomorphicLayoutEffect = canUseDOM
//   ? React.useLayoutEffect
//   : React.useEffect;

function App({ Component, pageProps }) {
  // const [mounted, setMounted] = React.useState(false);

  // useIsomorphicLayoutEffect(() => {
  //   setMounted(true);
  // }, []);
 
  const supportedChainIds = [1, 137];

  const connectors = {
    injected: {},
    walletconnect: {},
    walletlink: {
      appName: "pixeltrue",
      url: "https://pixeltrue.com",
      darkMode: false,
    },
  };

  return (
   <Provider store={store}>
     <UserContextProvider>
      {/* <ThemeProvider theme={theme} key={String(mounted)}> */}
      <HelmetProvider>
        <ThirdWebProvider
          connectors={connectors}
          supportedChainIds={supportedChainIds}
        >
          <ThemeProvider theme={theme}>
            <GlobalMeta />
            <GlobalStyles />
            <Component {...pageProps} />
          </ThemeProvider>
        </ThirdWebProvider>
      </HelmetProvider>
    </UserContextProvider>
   </Provider>
  );
}

export default App;

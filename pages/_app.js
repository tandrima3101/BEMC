import Head from "next/head";
import React, { Fragment, useEffect, useState } from "react";
import { Provider } from 'react-redux'
import withRedux from 'next-redux-wrapper'
import PreLoader from "../src/components/PreLoader";
import "../styles/globals.css";
import "bootstrap/dist/css/bootstrap.css";
import { store } from "../redux/store";
import { PersistGate } from 'redux-persist/integration/react'
import {
  persistStore
} from 'redux-persist'
import {useSelector} from 'react-redux'


let persistor = persistStore(store)

const MyApp = ({ Component, pageProps }) => {
  
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoader(false);
    }, 1000);
  }, [loader]);

  const authCheck=()=>{
    console.log("oo>>>islogin")
  }

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Fragment>
          <Head>
            <title>BEMC Booking</title>
            <link
              rel="shortcut icon"
              href="assets/images/logo/logo-2.png"
              type="image/png"
              style={{ width: '100px' }}
            />
            <link
              href="https://fonts.googleapis.com/css2?family=Mulish:wght@400;500;600&family=Quicksand:wght@300;400;500;600;700&display=swap"
              rel="stylesheet"
            />
          </Head>
          {loader && <PreLoader />}
          <Component {...pageProps} />
        </Fragment>
      </PersistGate>
    </Provider>
  );
};

// const makeStore = () => store;
// export default withRedux(makeStore)(MyApp);
export default MyApp

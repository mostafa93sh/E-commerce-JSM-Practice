import React from "react";

import dynamic from "next/dynamic";
import StateContext from "../context/StateContext";
import { Layout } from "../component";

import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  const LayoutD = dynamic(() => import("../component/Layout"));
  return (
    <StateContext>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </StateContext>
  );
}

export default MyApp;

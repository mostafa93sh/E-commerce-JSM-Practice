import Head from "next/head";
import React, { Fragment } from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";

const Layout = ({ children }) => {
  return (
    <Fragment>
      <div className='layout'>
        <Head>
          <title>My first ecommerce</title>
        </Head>
        <header>
          <Navbar />
        </header>
        <main className='main-container'>{children}</main>
        <footer>
          <Footer />
        </footer>
      </div>
    </Fragment>
  );
};

export default Layout;

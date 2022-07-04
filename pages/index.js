
import React from 'react';
import Head from 'next/head';
import { Home } from "component";

const HomePage = () => {

	return (
    <div>
      <Head>
        <title>NFT Viewer</title>
      </Head>
      <Home />
    </div>
  );
};
export default HomePage;

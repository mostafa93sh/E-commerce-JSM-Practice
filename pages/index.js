import React, { Fragment } from "react";
import { Products, HeroBanner, Footerbanner } from "../component";
import { client } from "../lib/client";

function Home({ products, bannerData }) {
  return (
    <Fragment>
      <HeroBanner heroBanner={bannerData.length && bannerData[0]} />
      <div className='products-heading'>
        <h2>Best Selling Products</h2>
        <p>Speaker of many variants</p>
      </div>
      <div className='products-container'>
        {products?.map((product) => (
          <Products key={product._id} product={product} />
        ))}
      </div>
      <Footerbanner footerBanner={bannerData && bannerData[0]} />
    </Fragment>
  );
}

export async function getServerSideProps() {
  const query = `*[_type == "product"]`;
  const products = await client.fetch(query);
  const bannerQuery = `*[_type == "banner"]`;
  const bannerData = await client.fetch(bannerQuery);

  return {
    props: { products, bannerData },
  };
}

export default Home;

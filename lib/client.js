import sanityClient from "@sanity/client";
import ImageUrlBuilder from "@sanity/image-url";

export const client = sanityClient({
  projectId: "p827p0v2",
  dataset: "production",
  apiVersion: "2022-10-12",
  useCdn: true,
  token: process.env.NEXT_PUBLIC_SANITY_TOKEN,
});

const bulider = ImageUrlBuilder(client);

export const urlFor = (source) => bulider.image(source);

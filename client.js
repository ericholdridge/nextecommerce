// client.js
import sanityClient from "@sanity/client";

export default sanityClient({
  projectId: "nqmw43nk", // you can find this in sanity.json
  dataset: "production", // or the name you chose in step 1
  useCdn: false, // `false` if you want to ensure fresh data
  watchMode: true,
});

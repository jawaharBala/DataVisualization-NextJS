import { Loader } from "@googlemaps/js-api-loader";
import { env } from "process";
const key: string | any = env.GOOGLE_APIKEY;
const mapLoader = new Loader({
  apiKey: key,
  version: "weekly",
  libraries: ["places", "visualization"],
});
export default mapLoader;

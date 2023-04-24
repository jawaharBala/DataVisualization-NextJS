import { GoogleMap, useLoadScript } from "@react-google-maps/api";
import { env } from "process";
const APIKey: string | any = env.GOOGLE_APIKEY;

const mapStyles = {
  width: "100%",
  height: "100%",
};

const GoogleMaps = () => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: APIKey,
  });
  return (
    <>
      {isLoaded ? (
        <GoogleMap></GoogleMap>
      ) : (
        <h2>Google API hasnt been loaded</h2>
      )}
    </>
  );
};
export default GoogleMaps;

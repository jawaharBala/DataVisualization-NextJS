import { useEffect, useState } from "react";
import {
  Map,
  GoogleApiWrapper,
  Marker,
  InfoWindow,
  IMarkerProps,
} from "google-maps-react";
import { useSelector } from "react-redux";
import "./googleMaps.css";
import { Climatedata } from "@/utils/interfaces";
import Controls from "./controls";
import { MarkerIcon, encodeSvg } from "../../../public/dynamic icons/svgIcon";

const MapContainer = ({ google }: any) => {
  const data = useSelector((store: any) => {
    return store.custom.data as Climatedata[];
  });

  const decadeYears = useSelector((store: any) => {
    return store.custom.decadeYears as number[];
  });
  const [markerData, setMarkerData] = useState<Climatedata[]>();
  const [initialCenter, setInitialCenter] = useState<any>({
    lat: 45.43341,
    lng: -73.86586,
  });

  const [infoToolTip, setInfoToolTip] = useState({
    selectedPlace: {} as Climatedata,
    activeMarker: {} as google.maps.Marker,
    showingInfoWindow: false as boolean,
  });

  useEffect(() => {
    {
      data?.length > 0 &&
        setInitialCenter({ lat: data[0].Lat, lng: data[0].Long });
    }
    {
      decadeYears?.length > 0 && getDataForCurrentDecade(decadeYears[0]);
    }
  }, [data]);

  const getDataForCurrentDecade = (year: number) => {
    let finalData = [...data];
    finalData = finalData?.filter((climateData) => {
      return climateData.Year === year;
    });
    setMarkerData(finalData);
  };

  const mapStyles = {
    width: "100%",
    height: "650px",
  };
  const displayTooltip = (props: IMarkerProps | any, marker: any) => {
    setInfoToolTip({
      selectedPlace: props.name.store,
      activeMarker: marker,
      showingInfoWindow: true,
    });
  };
  const SVGMarker = encodeSvg(MarkerIcon("red"));
  return (
    <>
      <Controls getDataForCurrentDecade={getDataForCurrentDecade} />
      {markerData!?.length > 0 && (
        <Map
          google={google}
          zoom={5}
          style={mapStyles}
          initialCenter={initialCenter}
         
        >
          {markerData?.map((store: Climatedata, index: number) => {
            return (
              <Marker
                icon={SVGMarker}
                onMouseover={displayTooltip}
                key={index}
                position={{
                  lat: store.Lat,
                  lng: store.Long,
                }}
                name={{ store }}
                
              ></Marker>
            );
          })}
          {infoToolTip.showingInfoWindow && (
            <InfoWindow
              marker={infoToolTip.activeMarker}
              visible={infoToolTip.showingInfoWindow}
            >
              <div>
                <h3 className="Marker-data">
                  Asset Name: {infoToolTip.selectedPlace["Asset Name"]}
                </h3>
                <h3 className="Marker-data">
                  Business Category:
                  {infoToolTip.selectedPlace["Business Category"]}
                </h3>
              </div>
            </InfoWindow>
          )}
        </Map>
      )}
    </>
  );
};

export default GoogleApiWrapper({
  apiKey: process.env.NEXT_PUBLIC_GOOGLE_APIKEY as string,
})(MapContainer);

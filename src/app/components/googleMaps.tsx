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
  const colors: string[] = [
    "#b71c1c",
    "#880e4f",
    "#4a148c",
    "#311b92",
    "#1a237e",
    "#006064",
    "#1b5e20",
    "#827717",
    "#3e2723",
    "3212121",
  ];
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
      selectedPlace: props.name.data,
      activeMarker: marker,
      showingInfoWindow: true,
    });
  };
  const SVGMarker = (data: Climatedata) => {
    let markerColor;
    let diff: number = 1 - data["Risk Rating"];
    if (diff > 0.9) {
      markerColor = colors[0];
    } else if (diff > 0.8) {
      markerColor = colors[1];
    } else if (diff > 0.7) {
      markerColor = colors[2];
    } else if (diff > 0.6) {
      markerColor = colors[3];
    } else if (diff > 0.5) {
      markerColor = colors[4];
    } else if (diff > 0.4) {
      markerColor = colors[5];
    } else if (diff > 0.3) {
      markerColor = colors[6];
    } else if (diff > 0.2) {
      markerColor = colors[7];
    } else if (diff > 0.1) {
      markerColor = colors[8];
    } else {
      markerColor = colors[9];
    }

    return encodeSvg(MarkerIcon(markerColor));
  };
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
          {markerData?.map((data: Climatedata, index: number) => {
            return (
              <Marker
                icon={SVGMarker(data)}
                onMouseover={displayTooltip}
                key={index}
                position={{
                  lat: data.Lat,
                  lng: data.Long,
                }}
                name={{ data }}
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

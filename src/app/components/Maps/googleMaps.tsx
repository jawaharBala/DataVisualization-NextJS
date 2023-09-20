import { useEffect, useState } from "react";
import {
  Map,
  GoogleApiWrapper,
  Marker,
  InfoWindow,
  IMarkerProps,
} from "google-maps-react";
import { useSelector, useDispatch } from "react-redux";
import "./googleMaps.css";
import { Climatedata } from "@/models/interfaces";
import Controls from "../Map controls/controls";
import {
  MarkerIcon,
  encodeSvg,
} from "../../../../public/dynamic icons/dynamicIcons";
import Pagination from "../Pagination/pagination";
import React from "react";


const MapContainer = ({ google }: any) => {
  const dispatch = useDispatch();
  const data = useSelector((store: any) => {
    return store.custom.data as Climatedata[];
  });
  const decadeData = useSelector((store: any) => {
    return store.custom.decadeData as Climatedata[];
  });
  const [pageData, setPageData] = useState<Climatedata[]>();
  const [initialCenter, setInitialCenter] = useState<any>({
    lat: 45.43341,
    lng: -73.86586,
  });
  const [infoToolTip, setInfoToolTip] = useState<any>({
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
  }, [data]);

  const mapStyles = {
    width: "100%",
    height: "650px",
  };
  const displayTooltip = (
    props: IMarkerProps | any,
    marker: any,
    data: Climatedata
  ) => {
    setInfoToolTip({
      selectedPlace: data,
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

  const markerInfo = () => {
    return (
      <InfoWindow
        marker={infoToolTip!?.activeMarker}
        visible={infoToolTip!?.showingInfoWindow}
      >
        <div>
          <h3 className="Marker-data">
            Asset Name: {infoToolTip!?.selectedPlace["Asset Name"]}
          </h3>
          <h3 className="Marker-data">
            Business Category:
            {infoToolTip!?.selectedPlace["Business Category"]}
          </h3>
        </div>
      </InfoWindow>
    );
  };
  return (
    <>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-evenly",
        }}
      >
        <Controls />
        <Pagination data={decadeData} setData={setPageData} />
      </div>

      {pageData!?.length > 0 && (
        <Map
          google={google}
          zoom={10}
          style={mapStyles}
          initialCenter={initialCenter}
        >
          {pageData?.map((data: Climatedata): any => {
            return (
              <Marker
                icon={SVGMarker(data)}
                onClick={(props: IMarkerProps | any, marker: any) =>
                  displayTooltip(props, marker, data)
                }
                key={data.id}
                position={{
                  lat: data.Lat,
                  lng: data.Long,
                }}
              />
            );
          })}
          {markerInfo()}
        </Map>
      )}
    </>
  );
};

export default React.memo( GoogleApiWrapper({
  apiKey: process.env.NEXT_PUBLIC_GOOGLE_APIKEY as string,
})(MapContainer));

import { useEffect, useState } from "react";
import {
  Map,
  GoogleApiWrapper,
  Marker,
  InfoWindow,
  IMarkerProps,
  IInfoWindowProps,
} from "google-maps-react";
import { useDispatch, useSelector } from "react-redux";
import "./googleMaps.css";
import { Climatedata } from "@/utils/interfaces";

const MapContainer = ({ google }: any) => {
  const data = useSelector((store: any) => {
    return store.custom.data as Climatedata[];
  });

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
    let data1: number[] = [];
    data.map((e)=>{
            // console.log(e["Risk Rating"])

     return  data1.push(e["Risk Rating"]);
    });
   console.log(new Set([...data1]))

  }, [data]);


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
  return (
    <>
      {data.length > 0 && (
        <Map
          google={google}
          zoom={5}
          style={mapStyles}
          initialCenter={initialCenter}
        >
          {data.map((store: Climatedata, index: number) => {
            return (
              <Marker
                onMouseover={displayTooltip}           
                key={index}
                position={{
                  lat: store.Lat,
                  lng: store.Long,
                }}
                name={{store}}            
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

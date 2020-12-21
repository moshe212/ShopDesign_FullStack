import React, { useState, useEffect } from "react";
import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react";
import "./Map.css";
import mapStyle from "./StyleMap";

const MapContainer = (props) => {
  const [marker, setMarker] = useState();

  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      const element = document.querySelector('[title="BusPosition"]');
      if (element) element.click();
    }, 1000);
  }, []);

  return (
    <Map
      google={props.google}
      styles={mapStyle}
      style={{
        width: "100%",
        height: "100%",
        position: "relative",
        borderRadius: "20px",
      }}
      initialCenter={{
        lat: props.coordinates[0].lat,
        lng: props.coordinates[0].lng,
      }}
      disableDefaultUI={true}
      className={"map"}
      zoom={10}
    >
      <Marker
        title={"בית"}
        name={"Home"}
        position={{
          lat: props.coordinates[0].lat,
          lng: props.coordinates[0].lng,
        }}
        icon={{
          url: "/Images/Home.svg",
          anchor: new props.google.maps.Point(
            props.coordinates[0].lat,
            props.coordinates[0].lng
          ),
          scaledSize: new props.google.maps.Size(
            props.coordinates[0].lat,
            props.coordinates[0].lng
          ),
        }}
      />

      <Marker
        title={"ביה'ס"}
        name={"School"}
        position={{
          lat: props.coordinates[1].lat,
          lng: props.coordinates[1].lng,
        }}
        icon={{
          url: "/Images/School.svg",
          anchor: new props.google.maps.Point(
            props.coordinates[1].lat,
            props.coordinates[1].lng
          ),
          scaledSize: new props.google.maps.Size(
            props.coordinates[1].lat,
            props.coordinates[1].lng
          ),
        }}
      />

      <Marker
        title={"BusPosition"}
        name={"Bus position"}
        position={{
          lat: props.coordinates[2].lat,
          lng: props.coordinates[2].lng,
        }}
        icon={{
          url: "/Images/Bus.svg",
          anchor: new props.google.maps.Point(
            props.coordinates[2].lat,
            props.coordinates[2].lng
          ),
          scaledSize: new props.google.maps.Size(
            props.coordinates[2].lat,
            props.coordinates[2].lng
          ),
        }}
        onClick={(p, m, e) => {
          setMarker(m);
          setVisible(!visible);
        }}
      />

      <InfoWindow visible={visible} marker={marker}>
        <div className="PopUp">
          <div>
            <img className="BusImg" src="/Images/BusImage.svg" alt=""></img>
          </div>
          <div className="BusHour">9:30</div>
        </div>

        <div className="Text"> יציאה</div>
      </InfoWindow>
    </Map>
  );
};

export default GoogleApiWrapper({
  apiKey: "AIzaSyBRcSVADr0_EbDMWNQP94bV-M2AJQSXUmU",
  language: "He",
})(MapContainer);

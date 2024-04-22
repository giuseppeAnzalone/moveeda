import styles from "./index.module.scss";
import { useEffect, useState } from "react";
import {
  APIProvider,
  useMapsLibrary,
  Map,
  Marker,
} from "@vis.gl/react-google-maps";
import Loader from "../loader";

const EventMap = ({ address }) => {
  return (
    <APIProvider apiKey={"AIzaSyAQgE-rnrch3_VqsWbr8PLDM19qs0seHa4"}>
      <Geocoding address={address} />
    </APIProvider>
  );
};

function Geocoding({ address }) {
  const geocodingApiLoaded = useMapsLibrary("geocoding");
  const [geocodingService, setGeocodingService] = useState();
  const [_lat, setLat] = useState(0);
  const [_lng, setLng] = useState(0);

  useEffect(() => {
    if (!geocodingApiLoaded) return;
    setGeocodingService(new window.google.maps.Geocoder());
  }, [geocodingApiLoaded]);

  useEffect(() => {
    if (!geocodingService || !address) return;

    geocodingService.geocode({ address }, (results, status) => {
      if (results && status === "OK") {
        setLat(results[0].geometry.location.lat());
        setLng(results[0].geometry.location.lng());
      }
    });
  }, [geocodingService, address]);

  if (!geocodingService) return <Loader />;

  return (
    <Map
      className={styles.Map}
      center={{ lat: _lat, lng: _lng }}
      zoom={15}
      gestureHandling={"greedy"}
      disableDefaultUI={false}
    >
      <Marker position={{ lat: _lat, lng: _lng }} />
    </Map>
  );
}

export default EventMap;

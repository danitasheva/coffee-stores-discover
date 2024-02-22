"use client";

import { useState } from "react";

type PositionType = { coords: { latitude: number; longitude: number } };

const useTrackLocation = () => {
  const [isLocating, setIsLocating] = useState(false);
  const [longLat, setLongLat] = useState("");
  const [locationErrorMessage, setLocationErrorMessage] = useState("");

  function success(position: PositionType) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    setLongLat(`${longitude},${latitude}`);
    setLocationErrorMessage("");
    setIsLocating(false);
    console.log(`Latitude: ${latitude} °, Longitude: ${longitude} °`);
  }

  function error() {
    setIsLocating(false);
    console.error("Unable to retrieve your location");
    setLocationErrorMessage("Unable to retrieve your location");
  }

  const handleTrackLocation = () => {
    if (!navigator.geolocation) {
      console.log("Geolocation is not supported by your browser");
      setLocationErrorMessage("Geolocation is not supported by your browser");
    } else {
      console.log("Locating…");
      setIsLocating(true);
      setLocationErrorMessage("");
      navigator.geolocation.getCurrentPosition(success, error);
    }
  };

  return {
    longLat,
    isLocating,
    locationErrorMessage,
    handleTrackLocation,
  };
};

export default useTrackLocation;

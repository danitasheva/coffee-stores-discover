"use client";

import React, { useEffect, useState } from "react";
import Banner from "./banner.client";
import useTrackLocation from "@/hooks/useTrackLocation";
import { CoffeeStoreType } from "@/types";
import Card from "./card.server";
import { fetchCoffeeStores } from "@/lib/coffee-stores";

export default function NearbyCoffeeStores() {
  const { handleTrackLocation, isLocating, longLat, locationErrorMessage } =
    useTrackLocation();

  const [coffeeStores, setCoffeeStores] = useState([]);

  const handleOnClick = () => {
    console.log("Hi button clicked");
    handleTrackLocation();
  };

  useEffect(() => {
    async function coffeeStoresByLocation() {
      const limit = 10;
      if (longLat) {
        try {
          const response = await fetch(
            `api/getCoffeeStoresByLocation?longLat=${longLat}&limit=${limit}`
          );
          const coffeeStores = await response.json();
          setCoffeeStores(coffeeStores);
        } catch (err) {
          console.error("Error: ", err);
        }
      }
    }

    coffeeStoresByLocation();
  }, [longLat]);

  return (
    <div>
      <Banner
        handleOnClick={handleOnClick}
        buttonText={isLocating ? "Locating..." : "View stores nearby"}
      />
      {/* Location: {longLat} */}
      {locationErrorMessage && <p>Error: {locationErrorMessage} </p>}
      {coffeeStores.length > 0 && (
        <div className="xl:mt-8">
          <h2 className="mt-8 pb-8 text-4xl font-bold text-white">
            Stores near me
          </h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-2 lg:grid-cols-3 lg:gap-6">
            {coffeeStores?.map(
              (coffeeStore: CoffeeStoreType, index: number) => (
                <Card
                  key={`${coffeeStore.name}-${coffeeStore.id}`}
                  name={coffeeStore.name}
                  image={coffeeStore.image}
                  href={`/coffee-store/${coffeeStore.id}?id=${index}`}
                />
              )
            )}
          </div>
        </div>
      )}
    </div>
  );
}

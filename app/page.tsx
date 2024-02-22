import NearbyCoffeeStores from "@/components/nearby-coffee-stores.client";
import Card from "@/components/card.server";
import { CoffeeStoreType } from "@/types";

import { fetchCoffeeStores } from "@/lib/coffee-stores";
import { Metadata } from "next";
import { getDomain } from "@/utils";

async function getData() {
  if (
    !process.env.MAPBOX_API ||
    !process.env.UNSPLASH_ACCESS_KEY ||
    !process.env.AIRTABLE_TOKEN
  ) {
    throw new Error("One of the API keys is not configured.");
  }
  const CALGARY_LONG_LAT = "-114.06744489183353%2C51.04488475866248";
  return await fetchCoffeeStores(CALGARY_LONG_LAT, 6);
}

export const metadata: Metadata = {
  title: "Coffee Connoisseur",
  description: "Discover coffee stores near you",
  metadataBase: getDomain(),
  alternates: {
    canonical: "/",
  },
};

export default async function Home() {
  const data = await getData();
  // console.log("data", data);
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 ">
      <NearbyCoffeeStores />
      <div className="xl:mt-8">
        <h2 className="mt-8 pb-8 text-4xl font-bold text-white">
          Calgary Downtown Stores
        </h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-2 lg:grid-cols-3 lg:gap-6">
          {data?.map((coffeeStore: CoffeeStoreType, index: number) => (
            <Card
              key={`${coffeeStore.name}-${coffeeStore.id}`}
              name={coffeeStore.name}
              image={coffeeStore.image}
              href={`/coffee-store/${coffeeStore.id}?id=${index}`}
            />
          ))}
        </div>
      </div>
    </main>
  );
}

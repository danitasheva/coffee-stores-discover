import Link from "next/link";
import Image from "next/image";
import React from "react";
import { fetchCoffeeStoreById, fetchCoffeeStores } from "@/lib/coffee-stores";
import { CoffeeStoreType, ServerParamsType } from "@/types";
import { createCoffeeStore } from "@/lib/airtable";
import Upvote from "@/components/upvote.client";
import { title } from "process";
import { describe } from "node:test";
import { getDomain } from "@/utils";
import { Metadata } from "next";

async function getData(id: string, queryId: string) {
  const coffeeStoreFromMapbox = await fetchCoffeeStoreById(id, queryId);
  const _createCoffeeStore = await createCoffeeStore(coffeeStoreFromMapbox, id);

  const voting = _createCoffeeStore ? _createCoffeeStore[0].voting : 0;

  return coffeeStoreFromMapbox
    ? {
        ...coffeeStoreFromMapbox,
        voting,
      }
    : {};
}

export async function generateStaticParams() {
  const CALGARY_LONG_LAT = "-114.06744489183353%2C51.04488475866248";
  const coffeeStores = await fetchCoffeeStores(CALGARY_LONG_LAT, 6);

  const test = coffeeStores.map((store: CoffeeStoreType) => ({
    id: store.id,
  }));
  console.log("test", test);
  return test;
}

export async function generateMetadata({
  params,
  searchParams,
}: ServerParamsType) {
  const coffeeStore = await fetchCoffeeStoreById(params.id, searchParams.id);
  const { name = "" } = coffeeStore;
  return {
    title: name,
    description: `${name} - Coffee Store`,
    metadataBase: getDomain(),
    alternates: {
      canonical: `/coffee-store/${params.id}`,
    },
  };
}

export default async function Page(props: {
  params: { id: string };
  searchParams: { id: string };
}) {
  const {
    params: { id },
    searchParams: { id: queryId },
  } = props;

  const coffeeStore = await getData(id, queryId);

  const { name = "", address = "", image = "", voting } = coffeeStore;
  console.log("props ***", props);
  console.log("queryId ***", queryId);
  return (
    <div className="h-full pb-80">
      <div className="m-auto grid max-w-full px-12 py-12 lg:max-w-6xl lg:grid-cols-2 lg:gap-4">
        <div>
          <div className="mb-2 mt-24 text-lg font-bold">
            <Link href="/">← Back to home</Link>
          </div>
          <div className="my-4">
            <h1 className="text-4xl">{name}</h1>
          </div>
          <Image
            src={
              image ||
              "https://images.unsplash.com/photo-1504753793650-d4a2b783c15e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80"
            }
            width={740}
            height={360}
            className="max-h-[420px] min-w-full max-w-full rounded-lg border-2 sepia lg:max-w-[470px] object-cover"
            alt={"Coffee Store Image"}
            objectFit="cover"
            priority={true}
          />
        </div>
        <div className={`glass mt-12 flex-col rounded-lg p-4 lg:mt-48`}>
          {address && (
            <div className="mb-4 flex">
              <Image
                src="/static/icons/places.svg"
                width="24"
                height="24"
                alt="places icon"
              />
              <p className="pl-2">{address}</p>
            </div>
          )}
          <Upvote voting={voting} id={id} />
        </div>
      </div>
    </div>
  );
}

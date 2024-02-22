"use client";

import { MouseEventHandler } from "react";
import Image from "next/image";

export default function Banner({
  handleOnClick,
  buttonText,
}: {
  handleOnClick: MouseEventHandler<HTMLButtonElement> | undefined;
  buttonText: string;
}) {
  return (
    <div className="mb-12 grid lg:mb-24 lg:grid-cols-2">
      <div className="z-20 flex flex-col px-2 md:pt-12">
        <h1 className="my-2 flex flex-wrap">
          <span className="pr-2 text-white">Coffee</span>{" "}
          <span className="text-gray-900">Connoisseur</span>
        </h1>
        <h2 className="font-sans text-gray-900 font-semibold lg:text-2xl md:mt-5">
          Discover your local coffee shops
        </h2>
        <div className="mt-12">
          <button onClick={handleOnClick}>{buttonText} </button>
        </div>
      </div>
      <div className="absolute top-2 z-10 md:top-0 md:mt-12 md:pl-10 md:pt-0 lg:right-1/4 lg:flex lg:pl-20">
        <Image
          src="/static/hero-image.png"
          width={800}
          height={300}
          alt="hero image"
          priority={true}
        />
      </div>
    </div>
  );
}

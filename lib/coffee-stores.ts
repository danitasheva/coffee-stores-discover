import { MapboxType } from "@/types";

const getListOfCoffeeStorePhotos = async () => {
  try {
    const response = await fetch(
      `https://api.unsplash.com/search/photos/?client_id=${process.env.UNSPLASH_ACCESS_KEY}&query="coffee shop"&page=1&perPage=10&orientation=landscape`
    );
    const photos = await response.json();
    const results = photos?.results || [];
    return results?.map((result: { urls: any }) => result.urls["small"]);
  } catch (err) {
    console.error("Error getting photos", err);
  }
};

const transformCoffeeData = (
  index: number,
  result: MapboxType,
  photos: Array<string>
) => {
  return {
    id: result.id,
    address: result.properties?.address || "",
    name: result.text,
    image: photos.length > 0 ? photos[index] : "",
  };
};

export const fetchCoffeeStores = async (longLat: string, limit: number) => {
  try {
    const response = await fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/coffee.json?limit=${limit}&proximity=${longLat}&access_token=${process.env.MAPBOX_API}`
    );
    const data = await response.json();
    const photos = await getListOfCoffeeStorePhotos();

    return data?.features?.map(
      (result: MapboxType, index: number) =>
        transformCoffeeData(index, result, photos) || []
    );
  } catch (err) {
    console.error("Error fetching coffee stores ", err);
    return [];
  }
};

export async function fetchCoffeeStoreById(id: string, queryId: string) {
  console.log("queryId", queryId);
  try {
    const response = await fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${id}.json?limit=6&proximity=ip&access_token=${process.env.MAPBOX_API}`
    );
    const data = await response.json();
    console.log("data", data);
    const photos = await getListOfCoffeeStorePhotos();
    console.log("photos", photos);
    const transormedData = data?.features?.map(
      (result: MapboxType, index: number) =>
        transformCoffeeData(parseInt(queryId), result, photos)
    );
    console.log("transormedData", transormedData[0]);

    return transormedData.length > 0 ? transormedData[0] : {};
  } catch (err) {
    console.error("Something went wrong ", err);
    return [];
  }
}

import { AirtableRecordType, CoffeeStoreType } from "@/types";

var Airtable = require("airtable");
var base = new Airtable({ apiKey: process.env.AIRTABLE_TOKEN }).base(
  "appYJRNBldabuI4c1"
);

const table = base("coffee-stores");

const getMinifiedRecords = (records: Array<AirtableRecordType>) => {
  return records.map((record: AirtableRecordType) => {
    return {
      recordId: record.id,
      ...record.fields,
    };
  });
};

const findRecordByFilter = async (id: string) => {
  const findRecords = await table
    .select({
      filterByFormula: `id="${id}"`,
    })
    .firstPage();

  return getMinifiedRecords(findRecords);
};

export async function createCoffeeStore(
  coffeeStore: CoffeeStoreType,
  id: string
) {
  const { name, address, voting = 0, image } = coffeeStore;

  try {
    if (id) {
      const records = await findRecordByFilter(id);
      if (records.length === 0) {
        const createRecords = await table.create([
          {
            fields: {
              id,
              name,
              address,
              voting,
              image,
            },
          },
        ]);
        if (createRecords.length > 0) {
          console.log("Created a store with id", id);
          return getMinifiedRecords(createRecords);
        }
      } else {
        console.log("Coffee store exists");
        return records;
      }
    } else {
      console.error("Missing store id");
    }
  } catch (err) {
    console.error("Error creating or finding a store", err);
  }
}

export const updateCoffeeStore = async (id: string) => {
  try {
    if (id) {
      const records = await findRecordByFilter(id);
      if (records.length !== 0) {
        const record = records[0];
        const updatedVoting = record.voting + 1;

        const updatedRecords = await table.update([
          {
            id: record.recordId,
            fields: {
              voting: updatedVoting,
            },
          },
        ]);

        if (updatedRecords.length > 0) {
          console.log("Created a store with id", id);
          return getMinifiedRecords(updatedRecords);
        }
      } else {
        console.log("Coffee store does not exist");
      }
    } else {
      console.error("Store id is missing");
    }
  } catch (error) {
    console.error("Error upvoting a coffee store", error);
  }
};

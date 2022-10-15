import random from "random";
import { DrinkResponse } from "../api/drink/[id].get";
import { client } from "./db/main";

export async function getDrinkFromSeed(seed:number): Promise<DrinkResponse> {
    const drinks_index = client.index('drinks')
    const drinks_stats = await drinks_index.getStats()
    const number_of_documents = drinks_stats.numberOfDocuments
    const ret_id = seed % number_of_documents
    const document = await drinks_index
        .getDocument(ret_id)
    return document as DrinkResponse
}
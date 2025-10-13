import { db } from "@/db";
import { artworksTable } from "@/db/schema";

export async function getArtworks({orderBy}: {orderBy: boolean}) {
    const artworks = await orderBy ? db.select().from(artworksTable).orderBy(artworksTable.name) : db.select().from(artworksTable)
    return artworks
}
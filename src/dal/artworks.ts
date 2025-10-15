//getting artworks
//get specific artwork
//create
//edit
//delete

import { db } from "@/db";
import { artworksTable } from "@/db/schema";
import { artworkInsertSchemaType } from "@/zod-schemas/artwork";
import { eq } from "drizzle-orm";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";

export async function getArtworks({orderBy}: {orderBy?: boolean}) {
    const artworks = await orderBy ? db.select().from(artworksTable).orderBy(artworksTable.name) : db.select().from(artworksTable)
    return artworks
}

export async function getArtworkById(id: number) {
    const artworkSelect = await db.select().from(artworksTable).where(eq(artworksTable.id, id))
    return artworkSelect[0]
}

export async function createArtwork(newArtwork: artworkInsertSchemaType) {
    const {isAuthenticated} = getKindeServerSession()
    if(!(await isAuthenticated())) redirect("/")
    return await db.insert(artworksTable).values(newArtwork).returning({ insertedId: artworksTable.id})
}

export async function updateArtwork(id: number, data: {
    name: string
    year: number
    image?: File | undefined
}, imagePath: string) {
    const {isAuthenticated} = getKindeServerSession()
    if(!(await isAuthenticated())) redirect("/")
    return await db.update(artworksTable).set({
        name: data.name,
        year: data.year,
        imagePath
    }).where(eq(artworksTable.id, id))
}

export async function deleteArtwork(id: number) {
    const {isAuthenticated} = getKindeServerSession()
    if(!(await isAuthenticated())) redirect("/")
    return await db.delete(artworksTable).where(eq(artworksTable.id, id)).returning()
}
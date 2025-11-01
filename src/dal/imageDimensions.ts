import { db } from "@/db";
import { imageDimensionsTable } from "@/db/schema";
import { imageDimensionsInsertSchemaType } from "@/zod-schemas/imageDimensions";
import { eq } from "drizzle-orm";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";

export async function getImageDimensionsByImageId(imageId: number) {
    const dimensionsSelect = await db.select({width: imageDimensionsTable.width, height: imageDimensionsTable.height})
        .from(imageDimensionsTable).where(eq(imageDimensionsTable.imageId, imageId))
    return dimensionsSelect[0]
}

export async function insertImageDimensions(dimensionsWithId: imageDimensionsInsertSchemaType) {
    const {isAuthenticated} = getKindeServerSession()
    if(!(await isAuthenticated())) redirect("/")
    return await db.insert(imageDimensionsTable).values(dimensionsWithId).returning({
            insertedWidth: imageDimensionsTable.width,
            insertedHeight: imageDimensionsTable.height
    })
}

export async function deleteImageDimensions(imageId: number) {
    const {isAuthenticated} = getKindeServerSession()
        if(!(await isAuthenticated())) redirect("/")
        return await db.delete(imageDimensionsTable).where(eq(imageDimensionsTable.imageId, imageId)).returning()
}
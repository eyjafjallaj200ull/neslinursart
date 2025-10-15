"use server"

//import { flattenValidationErrors } from "next-safe-action"
import z from "zod"
import fs from "fs/promises"
import { createArtworkSchema } from "@/zod-schemas/artwork"
//import { actionClient } from "@/lib/safe-action"
//import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"
//import { redirect } from "next/navigation"
import { ActionResponse } from "@/types/action-response"
import { createArtwork } from "@/dal/artworks"

// export const createArtworkAction = actionClient
//     .metadata({ actionName: "createArtworkAction" })
//     .inputSchema(artworkInsertSchema, {
//         handleValidationErrorsShape: async (ve) => flattenValidationErrors(ve).fieldErrors
//     })
//     .action( async ({
//         parsedInput: artworksTable
//     }: {
//         parsedInput: artworkInsertSchemaType
//     }) => {

//         const { isAuthenticated } = getKindeServerSession()

//         const isAuth = await isAuthenticated()

//         if (!isAuth) redirect('/login')


//         const result = db.insert(artworksTable).values({
//             name: artworksTable.name,
//             year: artworksTable.year,
//             imagePath: artworksTable.imagePath
//         }).returning({ insertedId: artworksTable.id})

//     })



export async function createArtworkAction(prevState: ActionResponse | null, formData: FormData) : Promise<ActionResponse> {
  const formDataObject = Object.fromEntries(formData.entries())
  const validatedFields = createArtworkSchema.safeParse(formDataObject)
  const NonImageInputs = {
    name: formDataObject.name,
    year: formDataObject.year
  }

  if (!validatedFields.success) {
    return {
      success: false,
      message: "An error occurred",
      errors: z.flattenError(validatedFields.error).fieldErrors,
      inputs: NonImageInputs
    }
  }
  const data = validatedFields.data;

  await fs.mkdir("public/images", { recursive: true })
  const imagePath = `${crypto.randomUUID()}-${data.image.name}`
  await fs.writeFile(
    `public/images/${imagePath}`,
    Buffer.from(await data.image.arrayBuffer())
  )

  const newArtwork = {
    name: data.name,
    year: data.year,
    imagePath: imagePath
  }

  const result = await createArtwork(newArtwork)
  console.log(result)
  return {
    success: true,
    message: `Artwork ID #${result[0].insertedId} created successfully`
  }
}

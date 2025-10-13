import { artworksTable } from "@/db/schema";
import { createSelectSchema, createInsertSchema, createUpdateSchema  } from "drizzle-zod";
import z from "zod/v4";

export const artworkSelectSchema = createSelectSchema(artworksTable)
export const artworkInsertSchema = createInsertSchema(artworksTable)
export const artworkUpdateSchema = createUpdateSchema(artworksTable)

export type artworkSelectSchemaType = z.infer<typeof artworkSelectSchema>
export type artworkInsertSchemaType = z.infer<typeof artworkInsertSchema>
export type artworkUpdateSchemaType = z.infer<typeof artworkUpdateSchema>

const fileSchema = z.instanceof(File, { message: "Required" })
const imageSchema = fileSchema.refine(
  file => file.size === 0 || file.type.startsWith("image/")
)

export const createArtworkSchema = z.object({
  name: z.string().min(1),
  year: z.coerce.number().int().min(2000),
  image: imageSchema
}) 

export type createArtworkSchemaType = z.infer<typeof createArtworkSchema>

export const editArtworkSchema = createArtworkSchema.extend({
  image: imageSchema.optional()
})
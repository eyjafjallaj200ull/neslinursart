import { imageDimensionsTable } from "@/db/schema";
import { createSelectSchema, createInsertSchema  } from "drizzle-zod";
import z from "zod/v4";

export const imageDimensionsSelectSchema = createSelectSchema(imageDimensionsTable)
export const imageDimensionsInsertSchema = createInsertSchema(imageDimensionsTable)

export type imageDimensionsSelectSchemaType = z.infer<typeof imageDimensionsSelectSchema>
export type imageDimensionsInsertSchemaType = z.infer<typeof imageDimensionsInsertSchema>
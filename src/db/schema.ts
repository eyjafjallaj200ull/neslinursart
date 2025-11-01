import { relations } from "drizzle-orm"
import { pgTable, serial, varchar, integer } from "drizzle-orm/pg-core"

export const artworksTable = pgTable("artworks", {
    id: serial("id").primaryKey(),
    name: varchar("name").notNull(),
    year: integer("year").notNull(),
    imagePath: varchar("image_path").notNull()
})

export const imageDimensionsTable = pgTable("image_dimensions", {
    imageId: integer("image_id").notNull(),
    width: integer("width").notNull(),
    height: integer("height").notNull()
})

export const artworksRelations = relations(artworksTable, 
    ({one}) => ({
        dimensions: one(imageDimensionsTable)
    })
)

export const imageDimensionsRelations = relations(imageDimensionsTable,
    ({one}) => ({
        artwork: one(artworksTable, {
            fields: [imageDimensionsTable.imageId],
            references: [artworksTable.id]
        })
    })
 )
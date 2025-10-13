import { pgTable, serial, varchar, integer } from "drizzle-orm/pg-core"

export const artworksTable = pgTable("artworks", {
    id: serial("id").primaryKey(),
    name: varchar("name").notNull(),
    year: integer("year").notNull(),
    imagePath: varchar("image_path").notNull()
})

//export type newArtworkType = typeof artworksTable.$inferInsert
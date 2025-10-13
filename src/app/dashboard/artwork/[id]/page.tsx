import { db } from "@/db"
import { artworksTable } from "@/db/schema"
import { eq } from "drizzle-orm"
import ArtworkForm from "../../_components/ArtworkForm"

export default async function EditArtworkPage({
    params
} : {
    params: Promise<{id: string}>
}) {
    const { id } = await params
    const artworkSelect = await db.select().from(artworksTable).where(eq(artworksTable.id, Number(id)))
    const artwork = artworkSelect[0]
    return <ArtworkForm artwork={artwork} />
}
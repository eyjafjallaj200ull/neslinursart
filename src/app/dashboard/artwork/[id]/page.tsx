import ArtworkForm from "../../_components/ArtworkForm"
import { getArtworkById } from "@/dal/artworks"

export default async function EditArtworkPage({
    params
} : {
    params: Promise<{id: string}>
}) {
    const { id } = await params
    const artwork = await getArtworkById(Number(id))
    return <ArtworkForm artwork={artwork} />
}
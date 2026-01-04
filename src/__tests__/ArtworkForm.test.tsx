import { render, screen, fireEvent } from "@testing-library/react"
import ArtworkForm from "@/app/dashboard/_components/ArtworkForm"

//just testing the workflow

describe("ArtworkForm", () => {
    it("renders form with empty fields when no artwork prop is provided", () => {
        render(<ArtworkForm />)
        const titleInput = screen.getByLabelText("Title") as HTMLInputElement
        const yearInput = screen.getByLabelText("Year") as HTMLInputElement
        const imageInput = screen.getByLabelText("Image") as HTMLInputElement
        expect(titleInput.value).toBe("")
        expect(yearInput.value).toBe("")
        expect(imageInput.value).not.toBe("")
    })

    it("renders form with artwork data when artwork prop is provided", () => {
        const mockArtwork = {
            id: 1,
            name: "Steamy Forest",
            year: 2021,
            imagePath: "steamy-forest.jpg"
        }
        render(<ArtworkForm artwork={mockArtwork} />)
        const titleInput = screen.getByLabelText("Title") as HTMLInputElement
        const yearInput = screen.getByLabelText("Year") as HTMLInputElement
        const imageInput = screen.getByLabelText("Image") as HTMLInputElement
        const displayedImage = screen.getByAltText("Steamy Forest") as HTMLImageElement
        expect(titleInput.value).toBe("Steamy Forest")
        expect(yearInput.value).toBe("2021")
        expect(imageInput.value).toBe("")
        expect(displayedImage.src).toContain("/steamy-forest.jpg")
    })
})
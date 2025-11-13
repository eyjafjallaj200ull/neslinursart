import { render, screen } from "@testing-library/react"
import GalleryImage from "@/components/Portfolio/GalleryImage"

describe("GalleryImage", () => {
    it("renders image with correct src, alt, title, year, and dimensions", () => {
        const props = {
            src: "/images/test-image.jpg",
            alt: "Test Image",
            title: "Test Title",
            year: 2023,
            dimensions: { width: 600, height: 400 }
        }
        render(<GalleryImage {...props} />)

        const image = screen.getByRole("img") as HTMLImageElement
        expect(image).toBeInTheDocument()
        expect(image.width).toBe(props.dimensions.width)
        expect(image.height).toBe(props.dimensions.height)
    })

    it("displays title and year correctly", () => {
        const props = {
            src: "/images/test-image.jpg",
            alt: "Test Image",
            title: "Test Title",
            year: 2023,
            dimensions: { width: 600, height: 400 }
        }
        render(<GalleryImage {...props} />)
        const titleElements = screen.getAllByText("Test Title")
        const yearElements = screen.getAllByText("2023")
        titleElements.forEach(title => expect(title).toBeInTheDocument())
        yearElements.forEach(year => expect(year).toBeInTheDocument())
    })
})
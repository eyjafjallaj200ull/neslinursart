import { render, screen, fireEvent } from "@testing-library/react"
import Lightbox from "@/components/Portfolio/Lightbox"
import { vi } from "vitest"
import userEvent from "@testing-library/user-event"

// Mock next/navigation
const mockSearchParams = new Map()

const mockRouter = {
    push: vi.fn().mockImplementation(path => {
        const url = new URL('http://localhost' + path)
        const imageId = url.searchParams.get('imageId')
        mockSearchParams.set('imageId', imageId ? imageId : null)
    }),
    replace: vi.fn().mockImplementation(path => {
        const url = new URL('http://localhost' + path)
        const imageId = url.searchParams.get('imageId')
        mockSearchParams.set('imageId', imageId ? imageId : null)
    })
}

vi.mock("next/navigation", () => ({
    useRouter: () => mockRouter,
    useSearchParams: () => ({
        get: (param: string) => mockSearchParams.get(param)
    })
}))

const showModalMock = vi.fn()
const closeMock = vi.fn()

// Add dialog element mock - Is this a good idea?
HTMLDialogElement.prototype.showModal = showModalMock
HTMLDialogElement.prototype.close = closeMock


// Mock test data
const mockArtworks = [
    { id: 1, name: "Artwork 1", year: 2020, imagePath: "/artwork1.jpg" },
    { id: 2, name: "Artwork 2", year: 2021, imagePath: "/artwork2.jpg" },
    { id: 3, name: "Artwork 3", year: 2022, imagePath: "/artwork3.jpg" }
]

const mockDimensions = [
    { id: 1, dimensions: { width: 800, height: 600 } },
    { id: 2, dimensions: { width: 800, height: 600 } },
    { id: 3, dimensions: { width: 800, height: 600 } }
]

describe("Lightbox", () => {
    beforeEach(() => {
        mockSearchParams.clear()
        vi.clearAllMocks()
        showModalMock.mockClear()
        closeMock.mockClear()
    })

    it("renders a closed dialog when no imageId", () => {
        render(<Lightbox artworks={mockArtworks} dimensionsArray={mockDimensions} />)
        const dialog = screen.getByRole("dialog", {hidden: true})
        expect(dialog).not.toHaveAttribute("open")
    })

    it("opens dialog and shows content when imageId is present", () => {
        mockSearchParams.set("imageId", "1")
        render(<Lightbox artworks={mockArtworks} dimensionsArray={mockDimensions} />)
        
        expect(showModalMock).toHaveBeenCalled()
        
        // Check for content
        expect(screen.getByAltText("Artwork 1")).toBeInTheDocument()
        expect(screen.getByTestId("Previous")).toBeInTheDocument()
        expect(screen.getByTestId("Next")).toBeInTheDocument()
        expect(screen.getByTestId("Close")).toBeInTheDocument()
    })

    it("changes image when next button is clicked", async () => {
        const user = userEvent.setup()
        mockRouter.push("/portfolio?imageId=1")
        const {rerender} = render(<Lightbox artworks={mockArtworks} dimensionsArray={mockDimensions} />)
        
        const nextButton = screen.getByTestId("Next")
        await user.click(nextButton)

        rerender(<Lightbox artworks={mockArtworks} dimensionsArray={mockDimensions} />)
        
        const imageBeforeClick = screen.queryByAltText("Artwork 1")
        const imageAfterClick = screen.getByAltText("Artwork 2")

        expect(imageBeforeClick).not.toBeInTheDocument()
        expect(imageAfterClick).toBeInTheDocument()
        
    })
    it("changes image when prev button is clicked", async () => {
        const user = userEvent.setup()
        mockRouter.push("/portfolio?imageId=2")
        const {rerender} = render(<Lightbox artworks={mockArtworks} dimensionsArray={mockDimensions} />)
        
        const prevButton = screen.getByTestId("Previous")
        await user.click(prevButton)

        rerender(<Lightbox artworks={mockArtworks} dimensionsArray={mockDimensions} />)

        const imageBeforeClick = screen.queryByAltText("Artwork 2")
        const imageAfterClick = screen.getByAltText("Artwork 1")

        expect(imageBeforeClick).not.toBeInTheDocument()
        expect(imageAfterClick).toBeInTheDocument()
    })

    it("closes dialog when close button is clicked", async () => {
        const user = userEvent.setup()
        mockSearchParams.set("imageId", "1")
        const { rerender } = render(<Lightbox artworks={mockArtworks} dimensionsArray={mockDimensions} />)
        
        const closeButton = screen.getByTestId("Close")
        await user.click(closeButton)

        rerender(<Lightbox artworks={mockArtworks} dimensionsArray={mockDimensions} />)

        const image = screen.queryByAltText("Artwork 1")
        expect(image).not.toBeInTheDocument()
    })

    it("wraps to first image when clicking next on last image", async () => {
        const user = userEvent.setup()
        mockRouter.push("/portfolio?imageId=3")
        const {rerender} = render(<Lightbox artworks={mockArtworks} dimensionsArray={mockDimensions} />)
        
        const nextButton = screen.getByTestId("Next")
        await user.click(nextButton)

        rerender(<Lightbox artworks={mockArtworks} dimensionsArray={mockDimensions} />)

        const imageBeforeClick = screen.queryByAltText("Artwork 3")
        const imageAfterClick = screen.getByAltText("Artwork 1")

        expect(imageBeforeClick).not.toBeInTheDocument()
        expect(imageAfterClick).toBeInTheDocument()
    })

    it("wraps to last image when clicking prev on first image", async () => {
        const user = userEvent.setup()
        mockRouter.push("/portfolio?imageId=1")
        const {rerender} = render(<Lightbox artworks={mockArtworks} dimensionsArray={mockDimensions} />)
        
        const prevButton = screen.getByTestId("Previous")
        await user.click(prevButton)

        rerender(<Lightbox artworks={mockArtworks} dimensionsArray={mockDimensions} />)

        const imageBeforeClick = screen.queryByAltText("Artwork 1")
        const imageAfterClick = screen.getByAltText("Artwork 3")

        expect(imageBeforeClick).not.toBeInTheDocument()
        expect(imageAfterClick).toBeInTheDocument()
    })
})
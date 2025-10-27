import { render, screen } from "@testing-library/react"
import HamburgerButton from "@/components/Nav/HamburgerButton"

describe("HamburgerButton", () => {
    it("renders a button", () => {
        render(<HamburgerButton onClick={() => {}} mobileMenuOpen={false} />)
        const button = screen.getByRole("button")
        expect(button).toBeInTheDocument() 
    })
})
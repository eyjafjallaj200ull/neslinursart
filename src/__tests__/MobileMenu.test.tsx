import { render, screen } from "@testing-library/react"
import MobileMenu from "@/components/Nav/MobileMenu"

describe("MobileMenu", () => {
    it("renders navigation links", () => {
        render(<MobileMenu />)
        const homeLink = screen.getByRole("link", { name: /home/i })
        const aboutLink = screen.getByRole("link", { name: /about/i })
        const portfolioLink = screen.getByRole("link", { name: /portfolio/i })
        const etsyShopLink = screen.getByRole("link", { name: /etsy shop/i })
        expect(homeLink).toBeInTheDocument()
        expect(aboutLink).toBeInTheDocument()
        expect(portfolioLink).toBeInTheDocument()
        expect(etsyShopLink).toBeInTheDocument()
    })
})
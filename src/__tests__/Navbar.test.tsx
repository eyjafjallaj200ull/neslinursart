import { render, screen } from "@testing-library/react"
import Navbar from "@/components/Nav/Navbar"
import { vi } from 'vitest'

const mockUseKindeBrowserClient = vi.fn()

// Mock at the top level
vi.mock("@kinde-oss/kinde-auth-nextjs", () => ({
    useKindeBrowserClient: () => mockUseKindeBrowserClient()
}))

describe("Navbar", () => { 
    // good practice 
    beforeEach(() => {
        vi.clearAllMocks()
    })

    it("renders home, about, portfolio, etsy shop nav links", () => {
        mockUseKindeBrowserClient.mockReturnValue({ isAuthenticated: false })
        
        render(<Navbar />)
        const homeLink = screen.getByRole("link", {name: /home/i})
        const aboutLink = screen.getByRole("link", {name: /about/i})
        const portfolioLink = screen.getByRole("link", {name: /portfolio/i})
        const etsyShopLink = screen.getByRole("link", {name: /etsy shop/i})
        expect(homeLink).toBeInTheDocument()
        expect(aboutLink).toBeInTheDocument()
        expect(portfolioLink).toBeInTheDocument()
        expect(etsyShopLink).toBeInTheDocument()
    })

    it("renders dashboard and logout links when authenticated", () => {
        mockUseKindeBrowserClient.mockReturnValue({ isAuthenticated: true })
        
        render(<Navbar />)
        const dashboardLink = screen.getByRole("link", {name: /dashboard/i})
        const logoutLink = screen.getByRole("link", {name: /log out/i})
        expect(dashboardLink).toBeInTheDocument()
        expect(logoutLink).toBeInTheDocument()
    })

    it("does not render dashboard and logout links when not authenticated", () => {
        mockUseKindeBrowserClient.mockReturnValue({ isAuthenticated: false })
        
        render(<Navbar />)
        const dashboardLink = screen.queryByRole("link", {name: /dashboard/i})
        const logoutLink = screen.queryByRole("link", {name: /log out/i})
        expect(dashboardLink).not.toBeInTheDocument()
        expect(logoutLink).not.toBeInTheDocument()
    })
})


/* import {render, screen} from "@testing-library/react"

import Navbar from "@/components/Nav/Navbar"

const useKindeBrowserClientRejectMock = vi.fn().mockRejectedValue(new Error('Async error'))
const useKindeBrowserClientAuthMock = vi.fn()
    .mockReturnValueOnce(() => true)
    .mockReturnValueOnce(() => false)

describe("Navbar", () => {
    // beforeEach(() => {
    //     vi.resetModules()
    // })
    it("throws error when useKindeBrowserClient is not resolved", async () => {
        vi.mock("@kinde-oss/kinde-auth-nextjs", () => ({
            useKindeBrowserClient: () => useKindeBrowserClientRejectMock()
        }))
        await expect(useKindeBrowserClientRejectMock()).rejects.toThrow('Async error')
    })
    it("renders home, about, portfolio, etsy shop nav links", () => {
        render(<Navbar />)
        const homeLink = screen.getByRole("link", {name: /home/i})
        const aboutLink = screen.getByRole("link", {name: /about/i})
        const portfolioLink = screen.getByRole("link", {name: /portfolio/i})
        const etsyShopLink = screen.getByRole("link", {name: /etsy shop/i})
        expect(homeLink).toBeInTheDocument()
        expect(aboutLink).toBeInTheDocument()
        expect(portfolioLink).toBeInTheDocument()
        expect(etsyShopLink).toBeInTheDocument()
    })
    it("renders dashboard and logout links when authenticated", () => {
        vi.mock("@kinde-oss/kinde-auth-nextjs", () => ({
            useKindeBrowserClient: () => ({isAuthenticated: useKindeBrowserClientAuthMock()})
        }))
        render(<Navbar />)
        const dashboardLink = screen.getByRole("link", {name: /dashboard/i})
        const logoutLink = screen.getByRole("link", {name: /log out/i})
        expect(dashboardLink).toBeInTheDocument()
        expect(logoutLink).toBeInTheDocument()
    })
    it("does not render dashboard and logout links when not authenticated", () => {
        vi.mock("@kinde-oss/kinde-auth-nextjs", () => ({
            useKindeBrowserClient: () => ({isAuthenticated: useKindeBrowserClientAuthMock()})
        }))
        render(<Navbar />)
        const dashboardLink = screen.queryByRole("link", {name: /dashboard/i})
        const logoutLink = screen.queryByRole("link", {name: /log out/i})
        expect(dashboardLink).not.toBeInTheDocument()
        expect(logoutLink).not.toBeInTheDocument()
    })
}) */
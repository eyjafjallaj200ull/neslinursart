type Props = {
    onClick: () => void
    mobileMenuOpen: boolean
}

function HamburgerButton({onClick, mobileMenuOpen}: Props) {
  return (
    <button onClick={onClick} className="md:hidden flex flex-col justify-center items-center">
        <span className={`bg-[var(--foreground)] block transition-all duration-300 ease-out 
            h-0.5 w-6 rounded-sm ${mobileMenuOpen ? 
            'rotate-45 translate-y-1' : '-translate-y-0.5'
        }`} >
        </span>
        <span className={`bg-[var(--foreground)] block transition-all duration-300 ease-out 
            h-0.5 w-6 rounded-sm my-0.5 ${mobileMenuOpen ? 
            'opacity-0' : 'opacity-100'
        }`} >
        </span>
        <span className={`bg-[var(--foreground)] block transition-all duration-300 ease-out 
            h-0.5 w-6 rounded-sm ${mobileMenuOpen ? 
            '-rotate-45 -translate-y-1' : 'translate-y-0.5'
        }`} >
        </span>    
    </button>
  )
}

export default HamburgerButton
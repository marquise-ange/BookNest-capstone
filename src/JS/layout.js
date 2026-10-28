
export function renderNavigation(activePage = 'home') {
    const links = [
        { label: 'Home', href: '/index.html', page: 'home' },
        { label: 'About', href: '/about.html', page: 'about' },
        { label: 'Favorites', href: '/favorites.html', page: 'favorites' },
    ]

    return `
    <header class="sticky top-0 z-20 border-b border-[#E5DED1] bg-[#FFFEFA]/95 backdrop-blur">
      <nav
        class="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-4 sm:px-8"
        aria-label="Main navigation"
      >
        <a
          href="/index.html"
          class="text-2xl font-bold tracking-tight text-[#38352F]"
          aria-label="BookNest home"
        >
          BookNest<span class="text-[#A28B6A]">.</span>
        </a>

        <!-- Desktop navigation: visible only on medium screens and larger -->
        <div class="hidden flex-wrap items-center gap-x-6 gap-y-3 text-sm font-medium md:flex">
          ${links.map(link => `
            <a
              href="${link.href}"
              class="${activePage === link.page
            ? 'text-[#38352F] underline decoration-[#A28B6A] decoration-2 underline-offset-8'
            : 'text-[#716B61] hover:text-[#38352F]'
        } transition-colors"
              ${activePage === link.page ? 'aria-current="page"' : ''}
            >
              ${link.label}
            </a>
          `).join('')}
        </div>

        <!-- Hamburger button: visible only on mobile -->
        <button
          id="mobile-menu-button"
          type="button"
          class="flex h-10 w-10 items-center justify-center rounded-lg border border-[#E5DED1] text-[#38352F] transition hover:bg-[#F5F0E6] focus:outline-none focus:ring-2 focus:ring-[#A28B6A] md:hidden"
          aria-label="Open navigation menu"
          aria-controls="mobile-navigation-menu"
          aria-expanded="false"
        >
          <svg
            id="mobile-menu-icon"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            class="h-6 w-6"
            aria-hidden="true"
          >
            <path d="M4 6h16"></path>
            <path d="M4 12h16"></path>
            <path d="M4 18h16"></path>
          </svg>
        </button>
      </nav>

      <!-- Mobile dropdown: hidden until the hamburger is clicked -->
      <div
        id="mobile-navigation-menu"
        class="hidden border-t border-[#E5DED1] bg-[#FFFEFA] px-5 py-3 md:hidden"
      >
        <div class="mx-auto flex max-w-7xl flex-col gap-1 text-sm font-medium">
          ${links.map(link => `
            <a
              href="${link.href}"
              class="rounded-lg px-4 py-3 ${activePage === link.page
                ? 'bg-[#E9E0D1] text-[#38352F]'
                : 'text-[#716B61] hover:bg-[#F5F0E6] hover:text-[#38352F]'
            } transition-colors"
              ${activePage === link.page ? 'aria-current="page"' : ''}
            >
              ${link.label}
            </a>
          `).join('')}
        </div>
      </div>
    </header>
  `
}

export function renderFooter() {
    return `
    <footer class="mt-auto border-t border-[#E5DED1] bg-[#FFFEFA]">
      <div class="mx-auto flex max-w-7xl flex-col gap-4 px-5 py-7 text-sm text-[#716B61] sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <a href="./index.html" class="text-lg font-bold text-[#38352F]">
          BookNest<span class="text-[#A28B6A]">.</span>
        </a>

        <p>&copy; ${new Date().getFullYear()} BookNest. Made for book lovers.</p>

        <div class="flex gap-5">
          <a href="./index.html" class="transition-colors hover:text-[#38352F]">Home</a>
          <a href="./about.html" class="transition-colors hover:text-[#38352F]">About</a>
          <a href="./favorites.html" class="transition-colors hover:text-[#38352F]">Favorites</a>
        </div>
      </div>
    </footer>
  `
}

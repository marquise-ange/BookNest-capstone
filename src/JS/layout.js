export function renderNavigation(activePage = 'home') {
    const links = [
        { label: 'Home', href: '/index.html', page: 'home' },
        { label: 'About', href: '/about.html', page: 'about' },
        { label: 'Favorites', href: '/favorites.html', page: 'favorites' },

    ]

    return `
    <header class="border-b border-[#E5DED1] bg-[#FFFEFA]">
      <nav
        class="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-5 py-5 sm:px-8"
        aria-label="Main navigation">
        <a
          href="/index.html"
          class="text-2xl font-bold tracking-tight text-[#38352F]">
          BookNest<span class="text-[#A28B6A]">.</span>
        </a>

        <div class="flex flex-wrap items-center gap-5 text-sm font-medium sm:gap-8">
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
      </nav>
    </header>
  `
}

export function renderFooter() {
    return `
    <footer class="border-t border-[#E5DED1] bg-[#FFFEFA]">
      <div class="mx-auto flex max-w-7xl flex-col gap-3 px-5 py-8 text-sm text-[#716B61] sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <p>&copy; ${new Date().getFullYear()} BookNest. Made for book lovers.</p>
        <p>Find a story that stays with you.</p>
      </div>
    </footer>
  `
}

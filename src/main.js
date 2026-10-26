
import './style.css'
import { renderNavigation, renderFooter } from './JS/layout.js'

const currentPage = window.location.pathname

let activePage = 'home'
let pageContent = ''

const books = [
  {
    id: 1,
    title: 'The Silent Garden',
    author: 'A. Morgan',
    color: '#D9C6A5',
  },
  {
    id: 2,
    title: 'Beyond the Stars',
    author: 'J. Bennett',
    color: '#C5D0C1',
  },
  {
    id: 3,
    title: 'A River of Stories',
    author: 'L. James',
    color: '#D8B7AC',
  },
  {
    id: 4,
    title: 'The Hidden Library',
    author: 'M. Ellis',
    color: '#C5C1D7',
  },
  {
    id: 5,
    title: 'Letters to Tomorrow',
    author: 'S. Parker',
    color: '#E3D4B8',
  },
  {
    id: 6,
    title: 'The Last Chapter',
    author: 'R. Bennett',
    color: '#BFCED8',
  },
]

if (currentPage.endsWith('/favorites.html')) {
  activePage = 'favorites'

  pageContent = `
    <section class="rounded-2xl bg-[#FFFEFA] p-6 shadow-sm sm:p-10">
      <h1 class="text-3xl font-bold sm:text-4xl">My Favorites</h1>
      <p class="mt-4 leading-7 text-[#716B61]">
        Your favorite books will appear here when you save them.
      </p>
    </section>
  `
} else if (currentPage.endsWith('/about.html')) {
  activePage = 'about'

  pageContent = `
    <section class="rounded-2xl bg-[#FFFEFA] p-6 shadow-sm sm:p-10">
      <h1 class="text-3xl font-bold sm:text-4xl">About BookNest</h1>
      <p class="mt-4 leading-7 text-[#716B61]">
        BookNest helps readers discover new books, explore stories,
        and keep track of their favorite reads.
      </p>
    </section>
  `
} else {
  pageContent = `
    <section class="overflow-hidden rounded-2xl bg-[#FFFEFA] px-6 py-12 shadow-sm sm:px-10 sm:py-16 lg:px-16">
      <div class="max-w-3xl">
        <p class="text-sm font-semibold uppercase tracking-[0.2em] text-[#A28B6A]">
          Discover your next chapter
        </p>

        <h1 class="mt-5 text-4xl font-bold leading-tight tracking-tight text-[#38352F] sm:text-5xl lg:text-6xl">
          Your Next Favorite Book Starts Here.
        </h1>

        <p class="mt-6 max-w-2xl text-base leading-7 text-[#716B61] sm:text-lg">
          Explore new stories, discover different authors, and find books
          that inspire your imagination.
        </p>

        <div class="mt-8 h-1.5 w-20 rounded-full bg-[#A28B6A]"></div>

      </div>
    </section>

    <section class="mt-12 sm:mt-16">
      <div class="mb-6">
        <p class="text-sm font-semibold uppercase tracking-widest text-[#A28B6A]">
          Your next read awaits
        </p>

        <h2 class="mt-2 text-2xl font-bold text-[#38352F] sm:text-3xl">
          Explore Books
        </h2>

        <p class="mt-3 text-[#716B61]">
          Here are a few stories to get you started.
        </p>
      </div>

      <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        ${books.map(book => `
          <article class="group rounded-2xl border border-[#E5DED1] bg-[#FFFEFA] p-4 shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-md">
            <div
              class="flex h-52 items-center justify-center rounded-xl"
              style="background-color: ${book.color}"
              role="img"
              aria-label="Placeholder cover for ${book.title}"
            >
              <div class="mx-6 flex h-40 w-28 flex-col items-center justify-center rounded-md border border-[#38352F]/20 bg-[#FFFEFA]/50 p-3 text-center shadow-sm">
                <span class="text-xs font-semibold uppercase tracking-widest text-[#716B61]">
                  BookNest
                </span>

                <span class="mt-3 text-sm font-bold leading-snug text-[#38352F]">
                  ${book.title}
                </span>

                <span class="mt-2 text-xs text-[#716B61]">
                  ${book.author}
                </span>
              </div>
            </div>

            <div class="pt-4">
              <h3 class="text-lg font-semibold text-[#38352F]">
                ${book.title}
              </h3>

              <p class="mt-1 text-sm text-[#716B61]">
                By ${book.author}
              </p>
            </div>
          </article>
        `).join('')}
      </div>
    </section>
  `
}

document.querySelector('#app').innerHTML = `
  <div class="flex min-h-screen flex-col bg-[#F5F0E6] text-[#38352F]">
    ${renderNavigation(activePage)}

    <main class="mx-auto w-full max-w-7xl flex-1 px-5 py-10 sm:px-8 sm:py-12">
      ${pageContent}
    </main>

    ${renderFooter()}
  </div>
`

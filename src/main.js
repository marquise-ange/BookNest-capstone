
import './style.css'
import { renderNavigation, renderFooter } from './JS/layout.js'
import {
  getFavorites,
  addFavorite,
  removeFavorite,
  isFavorite,
} from './JS/favorites.js'
import { fetchBooks } from './JS/fetchBooks.js'

const currentPage = window.location.pathname
const app = document.querySelector('#app')

let activePage = 'home'
let currentBooks = []
let pageContent = ''
let lastHomeSearch = 'fiction'
let lastBooksSearch = 'fiction'

if (!app) {
  throw new Error('The #app element was not found in the HTML.')
}

function escapeHTML(value = '') {
  return String(value).replace(/[&<>"']/g, character => {
    const entities = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;',
    }
    return entities[character]
  })
}

function renderBookCard(book) {
  const saved = isFavorite(book.id)
  const title = book.title || 'Untitled'
  const bookId = book.id == null ? '' : String(book.id)

  const cover = book.coverUrl
    ? `
      <img
        src="${escapeHTML(book.coverUrl)}"
        alt="Cover of ${escapeHTML(title)}"
        class="h-full w-full object-cover transition duration-300 group-hover:scale-105"
        loading="lazy"
      />
    `
    : `
      <div class="flex h-full items-center justify-center bg-[#E9E0D1] p-5 text-center">
        <span class="font-bold text-[#38352F]">${escapeHTML(title)}</span>
      </div>
    `

  return `
    <article class="group flex h-full flex-col overflow-hidden rounded-2xl border border-[#E5DED1] bg-[#FFFEFA] transition duration-200 hover:-translate-y-1 hover:shadow-lg">
      <div class="h-64 overflow-hidden bg-[#F5F0E6]">${cover}</div>

      <div class="flex flex-1 flex-col p-5">
        <h3 class="text-lg font-bold leading-snug text-[#38352F]">
          ${escapeHTML(title)}
        </h3>

        <p class="mt-2 text-sm text-[#716B61]">
          By ${escapeHTML(book.author || 'Unknown author')}
        </p>

        <p class="mt-2 text-xs text-[#806746]">
          First published: ${escapeHTML(book.firstPublishYear || 'Unknown')}
        </p>

        <button
          type="button"
          class="favorite-button mt-auto min-h-12 w-full rounded-xl border border-[#806746] px-3 py-3 text-sm font-semibold text-[#806746] transition hover:bg-[#806746] hover:text-white"
          data-book-id="${escapeHTML(bookId)}"
          aria-pressed="${saved}"
        >
          ${saved ? '♥ Remove from Favorites' : '♡ Add to Favorites'}
        </button>
      </div>
    </article>
  `
}

function renderBookGrid(bookList = [], isFavoritesPage = false) {
  if (!Array.isArray(bookList) || bookList.length === 0) {
    return `
      <div class="rounded-3xl border border-dashed border-[#C9BBA5] bg-[#FFFEFA] px-6 py-14 text-center">
        <div class="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#E9E0D1] text-2xl" aria-hidden="true">
          📚
        </div>

        <h3 class="mt-5 text-xl font-bold text-[#38352F]">
          No results found
        </h3>

        <p class="mx-auto mt-2 max-w-md leading-7 text-[#716B61]">
          We couldn't find any matching books. Try another title,
          author, or subject.
        </p>
      </div>
    `
  }
  return `
  <div class="grid grid-cols-1 items-stretch gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
    ${bookList.map(renderBookCard).join('')}
  </div>
`
}
function renderLoading() {
  return `
    <div class="flex flex-col items-center justify-center rounded-3xl border border-[#E5DED1] bg-[#FFFEFA] px-6 py-12 text-center">
      <div
        class="h-10 w-10 animate-spin rounded-full border-4 border-[#E5DED1] border-t-[#806746]"
        role="img"
        aria-label="Loading books"
      ></div>

      <p class="mt-4 font-medium text-[#38352F]">
        Finding your next read...
      </p>

      <p class="mt-1 text-sm text-[#716B61]">
        Please wait while we search the library.
      </p>
    </div>
  `
}

function renderLoadError(retryId) {
  return `
    <div class="rounded-3xl border border-[#E5DED1] bg-[#FFFEFA] px-6 py-10 text-center">
      <h3 class="text-xl font-bold text-[#38352F]">
        We couldn't load the books
      </h3>

      <p class="mx-auto mt-2 max-w-md leading-7 text-[#716B61]">
        Please check your internet connection and try again.
      </p>

      <button
        type="button"
        id="${retryId}"
        class="mt-5 rounded-full bg-[#38352F] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#5B5348]"
      >
        Try Again
      </button>
    </div>
  `
}

// HOME PAGE
if (currentPage.endsWith('/index.html') || currentPage === '/') {
  activePage = 'home'
  document.title = 'BookNest | Find Your Next Story'

  pageContent = `
    <section
      class="relative flex min-h-145 items-center overflow-hidden rounded-3xl bg-cover bg-center sm:min-h-165"
      style="background-image: url('/images/home.jpg')"
      aria-label="A welcoming library"
    >
      <div class="absolute inset-0 bg-[#211C16]/65"></div>

      <div class="relative z-10 max-w-3xl px-6 py-16 sm:px-12 sm:py-24 lg:px-16">
        <p class="text-sm font-semibold uppercase tracking-[0.25em] text-[#E9D3AC]">
          Welcome to BookNest
        </p>

        <h1 class="mt-5 text-4xl font-bold leading-tight text-white sm:text-6xl lg:text-7xl">
          Every book opens a new world.
        </h1>

        <p class="mt-6 max-w-2xl text-base leading-8 text-white/90 sm:text-lg">
          Find inspiration, explore new ideas, and make room for
          stories that stay with you. Your next favorite book starts here.
        </p>

        <div class="mt-9 flex flex-wrap gap-4">
          <a
            href="/books.html"
            class="rounded-full bg-[#E9D3AC] px-7 py-3.5 text-sm font-bold text-[#38352F] transition hover:bg-white"
          >
            Explore Books
          </a>

          <a
            href="/about.html"
            class="rounded-full border border-white/80 px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-white hover:text-[#38352F]"
          >
            Our Story
          </a>
        </div>
      </div>
    </section>

    <section class="mt-16 sm:mt-20">
      <div class="mb-8">
        <p class="text-sm font-semibold uppercase tracking-widest text-[#A28B6A]">
          A place for readers
        </p>

        <h2 class="mt-3 text-3xl font-bold text-[#38352F] sm:text-4xl">
          Stories worth discovering
        </h2>

        <p class="mt-3 max-w-2xl leading-7 text-[#716B61]">
          From unforgettable adventures to thoughtful ideas,
          there is always something new waiting on a bookshelf.
        </p>
      </div>

      <form id="home-search-form" class="mb-7 flex flex-col gap-3 sm:flex-row">
        <label for="home-search" class="sr-only">
          Search books by title, author, or subject
        </label>

        <input
          id="home-search"
          type="search"
          placeholder="Search for your next favorite book..."
          class="min-w-0 flex-1 rounded-full border border-[#E5DED1] bg-white px-5 py-3.5 text-[#38352F] outline-none transition focus:border-[#806746] focus:ring-2 focus:ring-[#806746]/20"
          autocomplete="off"
        />

        <button
          type="submit"
          class="rounded-full bg-[#38352F] px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-[#5B5348]"
        >
          Search Books
        </button>
      </form>

      <p id="featured-status" class="mb-5 text-sm text-[#716B61]" aria-live="polite" role="status">
        Loading books...
      </p>

      <div id="featured-books">${renderLoading()}</div>
    </section>

    <section class="mt-16 grid grid-cols-1 items-center gap-8 overflow-hidden rounded-3xl bg-[#FFFEFA] sm:mt-20 lg:grid-cols-2">
      <div class="p-7 sm:p-10 lg:p-12">
        <p class="text-sm font-semibold uppercase tracking-widest text-[#A28B6A]">
          The BookNest story
        </p>

        <h2 class="mt-3 text-3xl font-bold leading-tight text-[#38352F] sm:text-4xl">
          A little space for your love of reading.
        </h2>

        <p class="mt-5 leading-8 text-[#716B61]">
          We believe books can inspire curiosity, introduce us to new
          perspectives, and make ordinary moments special. BookNest is
          being created to make exploring books feel welcoming and enjoyable.
        </p>

        <a
          href="/about.html"
          class="mt-7 inline-flex rounded-full bg-[#38352F] px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-[#5B5348]"
        >
          Learn About Us
        </a>
      </div>

      <img
        src="/images/home2.jpg"
        alt="Books arranged on a bookshelf"
        class="h-72 w-full object-cover sm:h-96 lg:h-full lg:min-h-107.5"
        loading="lazy"
      />
    </section>
  `

  // EXPLORE BOOKS PAGE
} else if (currentPage.endsWith('/books.html')) {
  activePage = 'books'
  document.title = 'Explore Books | BookNest'

  pageContent = `
    <section>
      <div class="overflow-hidden rounded-3xl border border-[#E5DED1] bg-[#FFFEFA]">
        <div class="bg-[#E9E0D1] px-6 py-10 sm:px-10 sm:py-14 lg:px-14">
          <p class="text-sm font-semibold uppercase tracking-[0.2em] text-[#806746]">
            Your next read
          </p>

          <h1 class="mt-3 text-4xl font-bold text-[#38352F] sm:text-5xl">
            Explore Books
          </h1>

          <p class="mt-4 max-w-2xl leading-7 text-[#62594E]">
            Find your next favorite story. Search by book title,
            author, or subject and discover something wonderful to read.
          </p>

          <form id="book-search-form" class="mt-8 flex flex-col gap-3 sm:flex-row">
            <label for="book-search" class="sr-only">
              Search books by title, author, or subject
            </label>

            <input
              id="book-search"
              type="search"
              placeholder="Try Harry Potter, Jane Austen..."
              class="min-w-0 flex-1 rounded-full border border-[#D4C5AE] bg-white px-5 py-4 text-[#38352F] outline-none transition placeholder:text-[#A49A8B] focus:border-[#806746] focus:ring-2 focus:ring-[#806746]/20"
              autocomplete="off"
            />

            <button
              type="submit"
              class="inline-flex items-center justify-center gap-2 rounded-full bg-[#38352F] px-8 py-4 font-semibold text-white transition hover:bg-[#5B5348]"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                class="h-5 w-5"
                aria-hidden="true"
              >
                <circle cx="11" cy="11" r="7"></circle>
                <path d="m20 20-4-4"></path>
              </svg>
              Search Books
            </button>
          </form>

          <p class="mt-3 text-sm text-[#716B61]">
            Discover books from the Open Library collection.
          </p>
        </div>
      </div>

      <div class="mt-10">
        <div class="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p class="text-sm font-semibold uppercase tracking-widest text-[#A28B6A]">
              Find your inspiration
            </p>

            <h2 class="mt-2 text-2xl font-bold text-[#38352F] sm:text-3xl">
              Your Bookshelf
            </h2>
          </div>

          <p class="text-sm text-[#716B61]">
            Search, discover, and save your favorites.
          </p>
        </div>

        <p id="books-status" class="my-6 min-h-6 text-sm text-[#716B61]" aria-live="polite" role="status">
          Loading books...
        </p>

        <div id="books-results">${renderLoading()}</div>
      </div>
    </section>
  `

  // FAVORITES PAGE
} else if (currentPage.endsWith('/favorites.html')) {
  activePage = 'favorites'
  document.title = 'My Favorites | BookNest'

  const savedBooks = getFavorites()
  currentBooks = savedBooks

  pageContent = `
    <section>
      <div class="rounded-3xl bg-[#FFFEFA] p-7 sm:p-12">
        <p class="text-sm font-semibold uppercase tracking-widest text-[#A28B6A]">
          Your personal collection
        </p>

        <h1 class="mt-3 text-4xl font-bold text-[#38352F] sm:text-5xl">
          My Favorites
        </h1>

        <p class="mt-4 leading-7 text-[#716B61]">
          Keep the books you love together in one place.
        </p>

        <p id="favorites-count" class="mt-4 text-sm font-medium text-[#806746]">
          ${savedBooks.length} ${savedBooks.length === 1 ? 'book' : 'books'} saved
        </p>
      </div>

      <div id="favorites-results" class="mt-8">
        ${savedBooks.length
      ? renderBookGrid(savedBooks, true)
      : `
              <div class="rounded-3xl border border-dashed border-[#C9BBA5] bg-[#FFFEFA] px-6 py-12 text-center sm:px-12 sm:py-16">
                <div class="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#E9E0D1] text-2xl" aria-hidden="true">♡</div>
                <h2 class="mt-5 text-2xl font-bold text-[#38352F]">
                  Your favorites list is waiting
                </h2>
                <p class="mx-auto mt-3 max-w-lg leading-7 text-[#716B61]">
                  When you save a book, it will appear here.
                </p>
                <a href="/books.html" class="mt-6 inline-flex rounded-full bg-[#38352F] px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-[#5B5348]">
                  Discover Books
                </a>
              </div>
            `
    }
      </div>
    </section>
  `

  // ABOUT PAGE
} else if (currentPage.endsWith('/about.html')) {
  activePage = 'about'
  document.title = 'About Us | BookNest'

  pageContent = `
    <section class="overflow-hidden rounded-3xl bg-[#FFFEFA]">
      <div class="grid grid-cols-1 lg:grid-cols-2">
        <div class="flex flex-col justify-center p-7 sm:p-12 lg:p-14">
          <p class="text-sm font-semibold uppercase tracking-widest text-[#A28B6A]">
            Our story
          </p>

          <h1 class="mt-3 text-4xl font-bold leading-tight text-[#38352F] sm:text-5xl lg:text-6xl">
            A home for people who love books.
          </h1>

          <p class="mt-6 leading-8 text-[#716B61]">
            BookNest is a welcoming place for readers to explore books,
            discover authors, and find their next favorite story. We believe
            reading can inspire curiosity, encourage imagination, and bring
            new perspectives into our lives.
          </p>
        </div>

        <img
          src="/images/about.jpg"
          alt="A bright library filled with bookshelves"
          class="h-72 w-full object-cover sm:h-96 lg:h-full lg:min-h-135"
          loading="lazy"
        />
      </div>
    </section>

    <section class="mt-12 sm:mt-16">
      <div class="mb-8 max-w-2xl">
        <p class="text-sm font-semibold uppercase tracking-widest text-[#A28B6A]">
          What matters to us
        </p>

        <h2 class="mt-3 text-3xl font-bold text-[#38352F] sm:text-4xl">
          Built around the joy of reading
        </h2>

        <p class="mt-4 leading-7 text-[#716B61]">
          Every part of BookNest is inspired by the simple pleasure
          of finding a book that speaks to you.
        </p>
      </div>

      <div class="grid grid-cols-1 gap-6 md:grid-cols-3">
        <article class="overflow-hidden rounded-2xl border border-[#E5DED1] bg-[#FFFEFA]">
          <img src="/images/about1.jpg" alt="Many books standing on a shelf" class="h-48 w-full object-cover" loading="lazy" />
          <div class="p-6">
            <h3 class="text-xl font-bold text-[#38352F]">Discover Stories</h3>
            <p class="mt-3 text-sm leading-7 text-[#716B61]">
              Explore different titles, authors, and subjects while finding stories that interest you.
            </p>
          </div>
        </article>

        <article class="overflow-hidden rounded-2xl border border-[#E5DED1] bg-[#FFFEFA]">
          <img src="/images/about2.jpg" alt="A notebook and writing materials on a desk" class="h-48 w-full object-cover" loading="lazy" />
          <div class="p-6">
            <h3 class="text-xl font-bold text-[#38352F]">Keep What You Love</h3>
            <p class="mt-3 text-sm leading-7 text-[#716B61]">
              Save books that catch your attention and return to your personal favorites collection.
            </p>
          </div>
        </article>

        <article class="overflow-hidden rounded-2xl border border-[#E5DED1] bg-[#FFFEFA]">
          <img src="/images/about3.jpg" alt="A person enjoying a book" class="h-48 w-full object-cover" loading="lazy" />
          <div class="p-6">
            <h3 class="text-xl font-bold text-[#38352F]">Enjoy the Journey</h3>
            <p class="mt-3 text-sm leading-7 text-[#716B61]">
              Make time for reading, learn something new, and enjoy discovering a story.
            </p>
          </div>
        </article>
      </div>
    </section>

    <section class="mt-12 overflow-hidden rounded-3xl bg-[#E9E0D1] sm:mt-16">
      <div class="grid grid-cols-1 items-center gap-8 p-7 sm:p-10 lg:grid-cols-2 lg:p-12">
        <div>
          <p class="text-sm font-semibold uppercase tracking-widest text-[#806746]">
            Our mission
          </p>

          <h2 class="mt-3 text-3xl font-bold text-[#38352F] sm:text-4xl">
            Helping every reader find their next story.
          </h2>

          <p class="mt-5 leading-8 text-[#62594E]">
            We want BookNest to become a comfortable place to explore books
            and build a collection of meaningful reading discoveries. We are
            continuing to improve the experience one step at a time.
          </p>

          <a href="/books.html" class="mt-7 inline-flex rounded-full bg-[#38352F] px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-[#5B5348]">
            Discover Books
          </a>
        </div>

        <img src="/images/about4.jpg" alt="A peaceful reading space with books" class="h-64 w-full rounded-2xl object-cover sm:h-80" loading="lazy" />
      </div>
    </section>
  `

  // PAGE NOT FOUND
} else {
  activePage = ''
  document.title = 'Page Not Found | BookNest'

  pageContent = `
    <section class="rounded-3xl bg-[#FFFEFA] px-6 py-16 text-center sm:px-12">
      <h1 class="text-4xl font-bold text-[#38352F]">Page not found</h1>
      <p class="mt-4 text-[#716B61]">Sorry, we couldn't find the page you requested.</p>
      <a href="/index.html" class="mt-7 inline-flex rounded-full bg-[#38352F] px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-[#5B5348]">
        Return Home
      </a>
    </section>
  `
}

// Render the shared page layout.
app.innerHTML = `
  <div class="flex min-h-screen flex-col bg-[#F5F0E6]">
    ${renderNavigation(activePage)}
    <main class="mx-auto w-full max-w-7xl flex-1 px-5 py-8 sm:px-8 sm:py-12">
      ${pageContent}
    </main>
    ${renderFooter()}
  </div>
`


/* Mobile hamburger menu behavior */
const mobileMenuButton = document.getElementById('mobile-menu-button')
const mobileNavigationMenu = document.getElementById('mobile-navigation-menu')
const mobileMenuIcon = document.getElementById('mobile-menu-icon')

function setMobileMenuOpen(open) {
  if (!mobileMenuButton || !mobileNavigationMenu) return

  mobileNavigationMenu.classList.toggle('hidden', !open)

  mobileMenuButton.setAttribute('aria-expanded', String(open))
  mobileMenuButton.setAttribute(
    'aria-label',
    open ? 'Close navigation menu' : 'Open navigation menu'
  )

  if (mobileMenuIcon) {
    mobileMenuIcon.innerHTML = open
      ? '<path d="m18 6-12 12"></path><path d="m6 6 12 12"></path>'
      : '<path d="M4 6h16"></path><path d="M4 12h16"></path><path d="M4 18h16"></path>'
  }
}

// Open or close the menu when the hamburger is clicked.
mobileMenuButton?.addEventListener('click', () => {
  const isOpen =
    mobileMenuButton.getAttribute('aria-expanded') === 'true'

  setMobileMenuOpen(!isOpen)
})

// Close the menu after a navigation link is selected.
mobileNavigationMenu?.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    setMobileMenuOpen(false)
  })
})

// Close the menu when Escape is pressed.
document.addEventListener('keydown', event => {
  if (event.key === 'Escape') {
    setMobileMenuOpen(false)
  }
})

// Close the menu when the browser returns to desktop width.
window.addEventListener('resize', () => {
  if (window.innerWidth >= 768) {
    setMobileMenuOpen(false)
  }
})


// Load books from Open Library.
async function loadBooks(searchTerm, resultsId, statusId, retryId) {
  const results = document.getElementById(resultsId)
  const status = document.getElementById(statusId)

  if (!results || !status) return

  status.textContent = `Searching for "${searchTerm}"...`
  results.innerHTML = renderLoading()

  try {
    const books = await fetchBooks(searchTerm)
    currentBooks = Array.isArray(books) ? books : []

    if (currentBooks.length === 0) {
      status.textContent = 'No results found.'
      results.innerHTML = renderBookGrid([])
      return
    }

    status.textContent = `Showing ${currentBooks.length} ${currentBooks.length === 1 ? 'book' : 'books'} for "${searchTerm}".`
    results.innerHTML = renderBookGrid(currentBooks)
  } catch (error) {
    console.error('Could not load books:', error)
    status.textContent = 'We could not load the books. Please try again.'
    results.innerHTML = renderLoadError(retryId)
  }
}

// Load default collections.
if (currentPage.endsWith('/index.html') || currentPage === '/') {
  loadBooks(lastHomeSearch, 'featured-books', 'featured-status', 'retry-home-books')
}

if (currentPage.endsWith('/books.html')) {
  loadBooks(lastBooksSearch, 'books-results', 'books-status', 'retry-explore-books')
}

// Homepage search form.
const homeSearchForm = document.getElementById('home-search-form')

if (homeSearchForm) {
  const homeSearchInput = document.getElementById('home-search')

  homeSearchForm.addEventListener('submit', async event => {
    event.preventDefault()

    const searchTerm = homeSearchInput?.value.trim() || ''
    const status = document.getElementById('featured-status')

    if (!searchTerm) {
      if (status) status.textContent = 'Please enter a book title, author, or subject.'
      homeSearchInput?.focus()
      return
    }

    lastHomeSearch = searchTerm
    await loadBooks(lastHomeSearch, 'featured-books', 'featured-status', 'retry-home-books')
  })
}

// Explore Books search form.
const bookSearchForm = document.getElementById('book-search-form')

if (bookSearchForm) {
  const bookSearchInput = document.getElementById('book-search')

  bookSearchForm.addEventListener('submit', async event => {
    event.preventDefault()

    const searchTerm = bookSearchInput?.value.trim() || ''
    const status = document.getElementById('books-status')

    if (!searchTerm) {
      if (status) status.textContent = 'Please enter a book title, author, or subject.'
      bookSearchInput?.focus()
      return
    }

    lastBooksSearch = searchTerm
    await loadBooks(lastBooksSearch, 'books-results', 'books-status', 'retry-explore-books')
  })
}

// Retry and favorite button handling.
app.addEventListener('click', async event => {
  const target = event.target
  if (!(target instanceof Element)) return

  const retryButton = target.closest('#retry-home-books, #retry-explore-books')

  if (retryButton) {
    if (retryButton.id === 'retry-home-books') {
      await loadBooks(lastHomeSearch, 'featured-books', 'featured-status', 'retry-home-books')
    } else {
      await loadBooks(lastBooksSearch, 'books-results', 'books-status', 'retry-explore-books')
    }
    return
  }

  const favoriteButton = target.closest('.favorite-button')
  if (!favoriteButton) return

  const bookId = favoriteButton.dataset.bookId
  if (!bookId) return

  const savedBook = currentBooks.find(book => String(book.id) === String(bookId))

  if (isFavorite(bookId)) {
    removeFavorite(bookId)
  } else if (savedBook) {
    addFavorite(savedBook)
  } else {
    return
  }

  if (currentPage.endsWith('/favorites.html')) {
    const favorites = getFavorites()
    currentBooks = favorites

    const count = document.getElementById('favorites-count')
    const results = document.getElementById('favorites-results')

    if (count) {
      count.textContent = `${favorites.length} ${favorites.length === 1 ? 'book' : 'books'} saved`
    }

    if (results) {
      results.innerHTML = favorites.length
        ? renderBookGrid(favorites)
        : `
          <div class="rounded-3xl border border-dashed border-[#C9BBA5] bg-[#FFFEFA] px-6 py-12 text-center sm:px-12 sm:py-16">
            <div class="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#E9E0D1] text-2xl" aria-hidden="true">♡</div>
            <h2 class="mt-5 text-2xl font-bold text-[#38352F]">Your favorites list is waiting</h2>
            <p class="mx-auto mt-3 max-w-lg leading-7 text-[#716B61]">When you save a book, it will appear here.</p>
            <a href="/books.html" class="mt-6 inline-flex rounded-full bg-[#38352F] px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-[#5B5348]">Discover Books</a>
          </div>
        `
    }
  } else {
    const pressed = isFavorite(bookId)
    favoriteButton.setAttribute('aria-pressed', String(pressed))
    favoriteButton.textContent = pressed
      ? '♥ Remove from Favorites'
      : '♡ Add to Favorites'
  }
})

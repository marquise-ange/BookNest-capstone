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

// Check that the HTML contains the app container.
if (!app) {
  throw new Error('The #app element was not found in the HTML.')
}

// Escape text from the API before placing it inside HTML.
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

// Reusable book card.
function renderBookCard(book) {
  const saved = isFavorite(book.id)

  const cover = book.coverUrl
    ? `
      <img
        src="${escapeHTML(book.coverUrl)}"
        alt="Cover of ${escapeHTML(book.title)}"
        class="h-full w-full object-cover"
        loading="lazy"
      />
    `
    : `
      <div class="flex h-full items-center justify-center bg-[#E9E0D1] p-5 text-center">
        <span class="font-bold text-[#38352F]">
          ${escapeHTML(book.title)}
        </span>
      </div>
    `

  return `
    <article class="flex h-full flex-col overflow-hidden rounded-2xl border border-[#E5DED1] bg-[#FFFEFA] transition duration-200 hover:-translate-y-1 hover:shadow-lg">
      <div class="h-64 overflow-hidden bg-[#F5F0E6]">
        ${cover}
      </div>

      <div class="flex flex-1 flex-col p-5">
        <h3 class="text-lg font-bold leading-snug text-[#38352F]">
          ${escapeHTML(book.title)}
        </h3>

        <p class="mt-2 text-sm text-[#716B61]">
          By ${escapeHTML(book.author || 'Unknown author')}
        </p>

        <p class="mt-2 text-xs text-[#806746]">
          First published: ${escapeHTML(book.firstPublishYear || 'Unknown')}
        </p>

        <button
          type="button"
          class="favorite-button mt-auto rounded-xl border border-[#806746] px-4 py-3 text-sm font-semibold text-[#806746] transition hover:bg-[#806746] hover:text-white"
          data-book-id="${escapeHTML(book.id)}"
          aria-pressed="${saved}"
        >
          ${saved ? '♥ Remove from Favorites' : '♡ Add to Favorites'}
        </button>
      </div>
    </article>
  `
}

// Responsive book grid.
function renderBookGrid(bookList = []) {
  if (bookList.length === 0) {
    return `
      <div class="rounded-2xl border border-dashed border-[#C9BBA5] p-8 text-center text-[#716B61]">
        No books to display yet.
      </div>
    `
  }

  return `
    <div class="grid grid-cols-1 items-stretch gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      ${bookList.map(renderBookCard).join('')}
    </div>
  `
}

// HOME PAGE
if (
  currentPage.endsWith('/index.html') ||
  currentPage === '/'
) {
  activePage = 'home'
  document.title = 'BookNest | Find Your Next Story'

  const heroImage =
    './public/images/home.jpg'

  pageContent = `
    <section
      class="relative flex min-h-145 items-center overflow-hidden rounded-3xl bg-cover bg-center sm:min-h-165"
      style="background-image: url('${heroImage}')"
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
          stories that stay with you. Your next favorite book
          starts here.
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

      <div
        id="featured-status"
        class="mb-5 text-sm text-[#716B61]"
        aria-live="polite"
      >
        Loading books...
      </div>

      <div id="featured-books">
        ${renderBookGrid()}
      </div>
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
          We believe books can inspire curiosity, introduce us
          to new perspectives, and make ordinary moments special.
          BookNest is being created to make exploring books
          feel welcoming and enjoyable.
        </p>

        <a
          href="/about.html"
          class="mt-7 inline-flex rounded-full bg-[#38352F] px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-[#5B5348]"
        >
          Learn About Us
        </a>
      </div>

      <img
        src="./public/images/home2.jpg"
        alt="Books arranged on a bookshelf"
        class="h-72 w-full object-cover sm:h-96 lg:h-full lg:min-h-107.5"
        loading="lazy"
      />
    </section>
  `

  // BOOKS PAGE
} else if (currentPage.endsWith('/books.html')) {
  activePage = ''
  document.title = 'Explore Books | BookNest'


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
      ? renderBookGrid(savedBooks)
      : `
              <div class="rounded-3xl border border-dashed border-[#C9BBA5] bg-[#FFFEFA] px-6 py-12 text-center sm:px-12 sm:py-16">
                <h2 class="text-2xl font-bold text-[#38352F]">
                  Your favorites list is waiting
                </h2>

                <p class="mx-auto mt-3 max-w-lg leading-7 text-[#716B61]">
                  When you save a book, it will appear here.
                </p>
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
            BookNest is a welcoming place for readers to explorebooks, discover authors, and find their next favorite story. We believe reading can inspire curiosity,
            encourage imagination, and bring new perspectives into our lives.</p>

        </div>

        <img
          src="./public/images/about.jpg"
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
          <img
            src="./public/images/about1.jpg"
            alt="many standing books"
            class="h-48 w-full object-cover"
            loading="lazy"
          />

          <div class="p-6">
            <h3 class="text-xl font-bold text-[#38352F]">
              Discover Stories
            </h3>

            <p class="mt-3 text-sm leading-7 text-[#716B61]">
              Explore different titles, authors, and subjects
              while finding stories that interest you.
            </p>
          </div>
        </article>

        <article class="overflow-hidden rounded-2xl border border-[#E5DED1] bg-[#FFFEFA]">
          <img
            src="./public/images/about2.jpg"
            alt="A notebook and writing materials on a desk"
            class="h-48 w-full object-cover"
            loading="lazy"
          />

          <div class="p-6">
            <h3 class="text-xl font-bold text-[#38352F]">
              Keep What You Love
            </h3>

            <p class="mt-3 text-sm leading-7 text-[#716B61]">
              Save books that catch your attention and return
              to your personal favorites collection.
            </p>
          </div>
        </article>

        <article class="overflow-hidden rounded-2xl border border-[#E5DED1] bg-[#FFFEFA]">
          <img
            src="./public/images/about3.jpg"
            alt="A person enjoying a book"
            class="h-48 w-full object-cover"
            loading="lazy"
          />

          <div class="p-6">
            <h3 class="text-xl font-bold text-[#38352F]">
              Enjoy the Journey
            </h3>

            <p class="mt-3 text-sm leading-7 text-[#716B61]">
              Make time for reading, learn something new,
              and enjoy the experience of discovering a story.
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
            We want BookNest to become a comfortable place to
            explore books and build a collection of meaningful
            reading discoveries. We are continuing to improve
            the experience one step at a time.
          </p>

          <a
            href="/books.html"
            class="mt-7 inline-flex rounded-full bg-[#38352F] px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-[#5B5348]"
          >
            Discover Books
          </a>
        </div>

        <img
          src="./public/images/about4.jpg"
          alt="A peaceful reading space with books"
          class="h-64 w-full rounded-2xl object-cover sm:h-80"
          loading="lazy"
        />
      </div>
    </section>
  `

} else {
  activePage = ''
  document.title = 'Page Not Found | BookNest'

  pageContent = `
    <section class="rounded-3xl bg-[#FFFEFA] px-6 py-16 text-center sm:px-12">
      <h1 class="text-4xl font-bold text-[#38352F]">
        Page not found
      </h1>

      <p class="mt-4 text-[#716B61]">
        Sorry, we couldn't find the page you requested.
      </p>

      <a
        href="/index.html"
        class="mt-7 inline-flex rounded-full bg-[#38352F] px-7 py-3.5 text-sm font-semibold text-white hover:bg-[#5B5348]"
      >
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

// Load books from Open Library.
async function loadBooks(searchTerm, resultsId, statusId) {
  const results = document.getElementById(resultsId)
  const status = document.getElementById(statusId)

  if (!results || !status) return

  status.textContent = 'Loading books...'
  results.innerHTML = ''

  try {
    const books = await fetchBooks(searchTerm)
    currentBooks = books

    status.textContent = `Showing ${books.length} books.`
    results.innerHTML = renderBookGrid(books)
  } catch (error) {
    console.error('Could not load books:', error)

    status.textContent =
      'We could not load the books. Please try again.'

    results.innerHTML = `
      <button
        type="button"
        id="retry-books"
        class="rounded-full bg-[#38352F] px-6 py-3 text-sm font-semibold text-white hover:bg-[#5B5348]"
      >
        Try Again
      </button>
    `
  }
}

// Load featured books on Home.
if (
  currentPage.endsWith('/index.html') ||
  currentPage === '/'
) {
  loadBooks('fiction', 'featured-books', 'featured-status')
}

// Load the initial collection on the Books page.
if (currentPage.endsWith('/books.html')) {
  loadBooks('fiction', 'books-results', 'books-status')
}

// Search books without reloading the page.
const searchForm = document.getElementById('book-search-form')

if (searchForm) {
  searchForm.addEventListener('submit', async event => {
    event.preventDefault()

    const input = document.getElementById('book-search')
    const searchTerm = input.value.trim()

    if (!searchTerm) {
      document.getElementById('books-status').textContent =
        'Please enter a title, author, or subject to search.'
      return
    }

    await loadBooks(searchTerm, 'books-results', 'books-status')
  })
}

// Handle favorites and retry buttons.
app.addEventListener('click', async event => {
  const target = event.target

  if (!(target instanceof Element)) return

  const retryButton = target.closest('#retry-books')

  if (retryButton) {
    if (currentPage.endsWith('/books.html')) {
      const input = document.getElementById('book-search')
      const term = input?.value.trim() || 'fiction'

      await loadBooks(term, 'books-results', 'books-status')
    } else {
      await loadBooks('fiction', 'featured-books', 'featured-status')
    }

    return
  }

  const favoriteButton = target.closest('.favorite-button')

  if (!favoriteButton) return

  const bookId = favoriteButton.dataset.bookId

  const savedBook = currentBooks.find(
    book => String(book.id) === String(bookId)
  )

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

    if (count && results) {
      count.textContent =
        `${favorites.length} ${favorites.length === 1 ? 'book' : 'books'} saved`

      results.innerHTML = favorites.length
        ? renderBookGrid(favorites)
        : `
          <div class="rounded-3xl border border-dashed border-[#C9BBA5] bg-[#FFFEFA] px-6 py-12 text-center sm:px-12 sm:py-16">
            <h2 class="text-2xl font-bold text-[#38352F]">
              Your favorites list is waiting
            </h2>

            <p class="mx-auto mt-3 max-w-lg leading-7 text-[#716B61]">
              When you save a book, it will appear here.
            </p>
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
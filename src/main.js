
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

// Reusable book card
function renderBookCard(book) {
  return `
    <article class="h-full overflow-hidden rounded-2xl border border-[#E5DED1] bg-[#FFFEFA] p-4 transition duration-200 hover:-translate-y-1 hover:shadow-lg">
      <div
        class="flex h-56 items-center justify-center rounded-xl p-4"
        style="background-color: ${book.color}"
        role="img"
        aria-label="Decorative book cover for ${book.title}"
      >
        <div class="flex h-44 w-32 flex-col items-center justify-center border-l-4 border-[#38352F]/20 bg-[#FFFEFA]/80 p-4 text-center shadow-md">
          <span class="text-[10px] font-semibold uppercase tracking-widest text-[#806746]">
            BookNest
          </span>

          <span class="mt-4 text-base font-bold leading-snug text-[#38352F]">
            ${book.title}
          </span>

          <span class="mt-3 text-xs text-[#716B61]">
            ${book.author}
          </span>
        </div>
      </div>

      <div class="px-1 pb-1 pt-5">
        <h3 class="text-lg font-semibold text-[#38352F]">
          ${book.title}
        </h3>

        <p class="mt-1 text-sm text-[#716B61]">
          By ${book.author}
        </p>
      </div>
    </article>
  `
}

// Reusable responsive book grid
function renderBookGrid(bookList = books) {
  return `
    <div class="grid grid-cols-1 items-stretch gap-6 sm:grid-cols-2 lg:grid-cols-3">
      ${bookList.map(book => renderBookCard(book)).join('')}
    </div>
  `
}

// HOME PAGE
if (
  currentPage.endsWith('/index.html') ||
  currentPage.endsWith('/')
) {
  activePage = 'home'

  pageContent = `
    <section class="overflow-hidden rounded-3xl bg-[#E9E0D1] px-6 py-14 sm:px-12 sm:py-20 lg:px-16">
      <div class="max-w-3xl">
        <p class="text-sm font-semibold uppercase tracking-[0.2em] text-[#806746]">
          A little escape, one page at a time
        </p>

        <h1 class="mt-5 text-4xl font-bold leading-tight tracking-tight text-[#38352F] sm:text-5xl lg:text-6xl">
          Find the book that feels like <span class="italic text-[#927653]">you.</span>
        </h1>

        <p class="mt-6 max-w-xl text-base leading-8 text-[#62594E] sm:text-lg">
          Explore new worlds, meet unforgettable characters, and discover
          stories worth keeping. Your next favorite read starts here.
        </p>

        <div class="mt-8 flex flex-wrap gap-4">
          <a
            href="/books.html"
            class="inline-flex rounded-full bg-[#38352F] px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-[#5B5348]"
          >
            Explore Books →
          </a>

          <a
            href="/favorites.html"
            class="inline-flex rounded-full border border-[#B8A990] px-7 py-3.5 text-sm font-semibold text-[#38352F] transition hover:bg-[#FFFEFA]"
          >
            My Favorites
          </a>
        </div>
      </div>
    </section>

    <section class="mt-14 sm:mt-20">
      <div class="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p class="text-sm font-semibold uppercase tracking-widest text-[#A28B6A]">
            Handpicked for curious minds
          </p>

          <h2 class="mt-3 text-3xl font-bold text-[#38352F] sm:text-4xl">
            A few stories to begin with
          </h2>

          <p class="mt-3 leading-7 text-[#716B61]">
            Discover a new story and see where it takes you.
          </p>
        </div>

        <a
          href="/books.html"
          class="font-semibold text-[#806746] hover:text-[#38352F]"
        >
          View all books →
        </a>
      </div>

      ${renderBookGrid()}
    </section>

    <section class="mt-16 rounded-3xl bg-[#FFFEFA] px-6 py-10 sm:mt-20 sm:px-10 sm:py-14">
      <div class="mx-auto max-w-2xl text-center">
        <p class="text-sm font-semibold uppercase tracking-widest text-[#A28B6A]">
          More than just books
        </p>

        <h2 class="mt-3 text-3xl font-bold text-[#38352F] sm:text-4xl">
          Make room for a new story.
        </h2>

        <p class="mt-4 leading-7 text-[#716B61]">
          Discover stories, explore authors, and create a collection
          of books you love.
        </p>

        <a
          href="/about.html"
          class="mt-6 inline-flex rounded-full bg-[#38352F] px-7 py-3 text-sm font-semibold text-white hover:bg-[#5B5348]"
        >
          About BookNest
        </a>
      </div>
    </section>

    <section class="mt-16 rounded-3xl bg-[#E9E0D1] px-6 py-10 text-center sm:mt-20 sm:px-10 sm:py-14">
      <h2 class="text-3xl font-bold text-[#38352F]">
        Let's talk books!
      </h2>

      <p class="mx-auto mt-4 max-w-xl leading-7 text-[#62594E]">
        Have a question or a book recommendation? We'd love to hear from you.
      </p>

      <a
        href="/contact.html"
        class="mt-6 inline-flex rounded-full bg-[#38352F] px-7 py-3.5 text-sm font-semibold text-white hover:bg-[#5B5348]"
      >
        Contact Us
      </a>
    </section>
  `

  // BOOKS PAGE
} else if (currentPage.endsWith('/books.html')) {
  activePage = 'books'

  pageContent = `
    <section>
      <div class="rounded-3xl bg-[#E9E0D1] px-6 py-10 sm:px-10 sm:py-14">
        <p class="text-sm font-semibold uppercase tracking-widest text-[#806746]">
          Your next chapter awaits
        </p>

        <h1 class="mt-3 text-4xl font-bold text-[#38352F] sm:text-5xl">
          Explore Books
        </h1>

        <p class="mt-4 max-w-2xl leading-7 text-[#62594E]">
          Browse our collection of stories and discover a book
          that matches your mood.
        </p>
      </div>

      <div class="mb-8 mt-10">
        <h2 class="text-2xl font-bold text-[#38352F]">
          Our Collection
        </h2>

        <p class="mt-2 text-[#716B61]">
          Showing ${books.length} books
        </p>
      </div>

      ${renderBookGrid()}
    </section>
  `

  // FAVORITES PAGE
} else if (currentPage.endsWith('/favorites.html')) {
  activePage = 'favorites'

  // This is an empty list until we add saving functionality.
  const savedBooks = []

  pageContent = `
    <section>
      <div class="rounded-3xl bg-[#E9E0D1] px-6 py-10 sm:px-10 sm:py-14 lg:px-14 lg:py-16">
        <p class="text-sm font-semibold uppercase tracking-[0.2em] text-[#806746]">
          Your personal collection
        </p>

        <h1 class="mt-3 text-4xl font-bold text-[#38352F] sm:text-5xl lg:text-6xl">
          My Favorite Books
        </h1>

        <p class="mt-5 max-w-2xl leading-8 text-[#62594E]">
          Keep the stories you love in one special place. Your favorite
          books will appear here so you can easily find them again.
        </p>

        <a
          href="/books.html"
          class="mt-7 inline-flex rounded-full bg-[#38352F] px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-[#5B5348]"
        >
          Explore Books →
        </a>
      </div>

      <section class="mt-10 sm:mt-14" aria-labelledby="saved-books-heading">
        <div class="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 id="saved-books-heading" class="text-2xl font-bold text-[#38352F] sm:text-3xl">
              Your Saved Books
            </h2>

            <p class="mt-2 text-sm text-[#716B61]">
              ${savedBooks.length} ${savedBooks.length === 1 ? 'book' : 'books'} saved
            </p>
          </div>
        </div>

        ${savedBooks.length > 0
      ? renderBookGrid(savedBooks)
      : `
              <div class="rounded-3xl border border-dashed border-[#C9BBA5] bg-[#FFFEFA] px-6 py-12 text-center sm:px-12 sm:py-16">
                <div class="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#F5F0E6] text-3xl" aria-hidden="true">
                  ♡
                </div>

                <h3 class="mt-5 text-xl font-bold text-[#38352F] sm:text-2xl">
                  Your favorites list is waiting for its first book
                </h3>

                <p class="mx-auto mt-3 max-w-lg leading-7 text-[#716B61]" aria-live="polite">
                  You haven't saved any books yet. Explore the collection
                  and find a story you love. Your saved books will appear here
                  when the favorites feature is connected.
                </p>

                <a
                  href="/books.html"
                  class="mt-7 inline-flex rounded-full bg-[#38352F] px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-[#5B5348]"
                >
                  Find a Book →
                </a>
              </div>
            `
    }
      </section>
    </section>
  `

  // ABOUT PAGE
} else if (currentPage.endsWith('/about.html')) {
  activePage = 'about'

  pageContent = `
    <section class="overflow-hidden rounded-3xl bg-[#FFFEFA] p-8 sm:p-12 lg:p-16">
      <p class="text-sm font-semibold uppercase tracking-widest text-[#A28B6A]">
        Our story
      </p>

      <h1 class="mt-3 text-4xl font-bold text-[#38352F] sm:text-5xl lg:text-6xl">
        About BookNest
      </h1>

      <p class="mt-6 max-w-3xl text-base leading-8 text-[#716B61] sm:text-lg">
        BookNest is a welcoming place for readers to discover books,
        explore authors, and find their next favorite story. We believe
        that reading should be enjoyable and that access to a good book
        should be easier for everyone.
      </p>

      <div class="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <article class="rounded-2xl bg-[#F5F0E6] p-6">
          <span class="text-2xl" aria-hidden="true">📚</span>
          <h2 class="mt-4 text-lg font-bold text-[#38352F]">
            Discover Books
          </h2>
          <p class="mt-3 text-sm leading-7 text-[#716B61]">
            Browse books, explore titles, and discover stories that
            match your interests.
          </p>
        </article>

        <article class="rounded-2xl bg-[#F5F0E6] p-6">
          <span class="text-2xl" aria-hidden="true">♡</span>
          <h2 class="mt-4 text-lg font-bold text-[#38352F]">
            Keep Favorites
          </h2>
          <p class="mt-3 text-sm leading-7 text-[#716B61]">
            The Favorites page is designed to give you one place to
            return to the books you want to keep.
          </p>
        </article>

        <article class="rounded-2xl bg-[#F5F0E6] p-6">
          <span class="text-2xl" aria-hidden="true">🌱</span>
          <h2 class="mt-4 text-lg font-bold text-[#38352F]">
            Find Reading Resources
          </h2>
          <p class="mt-3 text-sm leading-7 text-[#716B61]">
            Look for legitimate free reading options where available,
            including resources provided by libraries and public-domain
            collections.
          </p>
        </article>
      </div>

      <div class="mt-10 rounded-2xl bg-[#E9E0D1] p-6 sm:p-8">
        <h2 class="text-2xl font-bold text-[#38352F]">
          Our Mission
        </h2>

        <p class="mt-4 max-w-3xl leading-8 text-[#62594E]">
          We want to make the journey from looking for a book to
          discovering a meaningful story simple, welcoming, and enjoyable.
          BookNest is being built to bring book discovery and reading
          resources together in one <br> easy-to-use experience.
        </p>

        <a
          href="/books.html"
          class="mt-6 inline-flex rounded-full bg-[#38352F] px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-[#5B5348]"
        >
          Explore Books →
        </a>
      </div>
    </section>

    <section class="mt-10 rounded-3xl bg-[#FFFEFA] px-6 py-10 text-center sm:mt-14 sm:px-10 sm:py-14">
      <h2 class="text-2xl font-bold text-[#38352F] sm:text-3xl">
        Have a question or suggestion?
      </h2>

      <p class="mx-auto mt-4 max-w-xl leading-7 text-[#716B61]">
        We welcome your feedback and ideas for making BookNest a better
        place to discover books.
      </p>

      <a
        href="/contact.html"
        class="mt-6 inline-flex rounded-full bg-[#38352F] px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-[#5B5348]"
      >
        Contact Us →
      </a>
    </section>
  `

  // CONTACT PAGE
} else if (currentPage.endsWith('/contact.html')) {
  activePage = 'contact'

  pageContent = `
    <section class="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12">
      <div class="rounded-3xl bg-[#E9E0D1] p-8 sm:p-12">
        <p class="text-sm font-semibold uppercase tracking-widest text-[#806746]">
          Let's connect
        </p>

        <h1 class="mt-3 text-4xl font-bold text-[#38352F] sm:text-5xl">
          We'd love to hear from you.
        </h1>

        <p class="mt-5 leading-8 text-[#62594E]">
          Have a question, an idea, or a book recommendation?
          Send us a message. Your feedback helps make BookNest better.
        </p>

        <div class="mt-8 rounded-2xl bg-[#FFFEFA]/70 p-5">
          <h2 class="font-semibold text-[#38352F]">
            Love discovering new books?
          </h2>

          <p class="mt-2 text-sm leading-7 text-[#716B61]">
            Explore our collection and find your next favorite story.
          </p>

          <a
            href="/books.html"
            class="mt-4 inline-block font-semibold text-[#806746] hover:text-[#38352F]"
          >
            Browse Books →
          </a>
        </div>
      </div>

      <form id="contact-form" class="rounded-3xl border border-[#E5DED1] bg-[#FFFEFA] p-6 sm:p-10">
        <h2 class="text-2xl font-bold text-[#38352F]">
          Send us a message
        </h2>

        <div class="mt-6">
          <label for="contact-name" class="text-sm font-medium text-[#38352F]">
            Your name
          </label>

          <input
            id="contact-name"
            name="name"
            type="text"
            autocomplete="name"
            required
            class="mt-2 w-full rounded-xl border border-[#E5DED1] bg-white px-4 py-3 text-sm outline-none focus:border-[#A28B6A]"
            placeholder="Enter your name"
          />
        </div>

        <div class="mt-5">
          <label for="contact-email" class="text-sm font-medium text-[#38352F]">
            Email address
          </label>

          <input
            id="contact-email"
            name="email"
            type="email"
            autocomplete="email"
            required
            class="mt-2 w-full rounded-xl border border-[#E5DED1] bg-white px-4 py-3 text-sm outline-none focus:border-[#A28B6A]"
            placeholder="you@example.com"
          />
        </div>

        <div class="mt-5">
          <label for="contact-message" class="text-sm font-medium text-[#38352F]">
            Your message
          </label>

          <textarea
            id="contact-message"
            name="message"
            rows="5"
            required
            class="mt-2 w-full resize-y rounded-xl border border-[#E5DED1] bg-white px-4 py-3 text-sm outline-none focus:border-[#A28B6A]"
            placeholder="Tell us what's on your mind..."
          ></textarea>
        </div>

        <button
          type="submit"
          class="mt-6 w-full rounded-full bg-[#38352F] px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-[#5B5348]"
        >
          Send Message
        </button>

        <p id="contact-feedback" class="mt-4 text-sm text-[#716B61]" aria-live="polite"></p>
      </form>
    </section>
  `
}

// Shared navigation, main content, and footer on every page
document.querySelector('#app').innerHTML = `
  <div class="flex min-h-screen flex-col bg-[#F5F0E6] text-[#38352F]">
    ${renderNavigation(activePage)}

    <main class="mx-auto w-full max-w-7xl flex-1 px-5 py-8 sm:px-8 sm:py-12">
      ${pageContent}
    </main>

    ${renderFooter()}
  </div>
`

// Frontend demonstration only: this form does not send a real email.
const contactForm = document.querySelector('#contact-form')

if (contactForm) {
  contactForm.addEventListener('submit', event => {
    event.preventDefault()

    document.querySelector('#contact-feedback').textContent =
      'Thank you for your message! This demo form is not connected to message delivery yet.'

    contactForm.reset()
  })
}


import './style.css'
import { renderNavigation, renderFooter } from './JS/layout.js'

const currentPage = window.location.pathname

let activePage = 'home'
let pageContent = ''

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
    <section class="rounded-2xl bg-[#FFFEFA] p-6 shadow-sm sm:p-10">
      <p class="text-sm font-semibold uppercase tracking-widest text-[#A28B6A]">
        Welcome to BookNest
      </p>

      <h1 class="mt-4 max-w-2xl text-3xl font-bold leading-tight sm:text-5xl">
        Your Next Favorite Book Starts Here.
      </h1>

      <p class="mt-4 max-w-xl leading-7 text-[#716B61]">
        Discover new stories, explore different authors, and save the books
        you love.
      </p>

      <div class="mt-6 h-1 w-20 rounded-full bg-[#E5DED1]"></div>
    </section>
  `
}

document.querySelector('#app').innerHTML = `
  <div class="flex min-h-screen flex-col bg-[#F5F0E6] text-[#38352F]">
    ${renderNavigation(activePage)}

    <main class="mx-auto w-full max-w-7xl flex-1 px-5 py-10 sm:px-8">
      ${pageContent}
    </main>

    ${renderFooter()}
  </div>
`

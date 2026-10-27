const STORAGE_KEY = 'booknest-favorites'

// Get all saved favorite books from localStorage
export function getFavorites() {
    try {
        const savedBooks = localStorage.getItem(STORAGE_KEY)

        if (!savedBooks) {
            return []
        }

        const favorites = JSON.parse(savedBooks)

        return Array.isArray(favorites) ? favorites : []
    } catch (error) {
        console.error('Could not read saved favorites:', error)
        return []
    }
}

// Save the updated favorites list
function saveFavorites(favorites) {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites))
        return true
    } catch (error) {
        console.error('Could not save favorites:', error)
        return false
    }
}

// Check whether a book is already a favorite
export function isFavorite(bookId) {
    return getFavorites().some(
        favorite => String(favorite.id) === String(bookId)
    )
}

// Add a book to favorites without creating duplicates
export function addFavorite(book) {
    if (!book || book.id === undefined || book.id === null) {
        return getFavorites()
    }

    const favorites = getFavorites()

    const alreadySaved = favorites.some(
        favorite => String(favorite.id) === String(book.id)
    )

    if (alreadySaved) {
        return favorites
    }

    const updatedFavorites = [...favorites, book]

    if (saveFavorites(updatedFavorites)) {
        return updatedFavorites
    }

    return favorites
}

// Remove a book from favorites using its ID
export function removeFavorite(bookId) {
    const favorites = getFavorites()

    const updatedFavorites = favorites.filter(
        book => String(book.id) !== String(bookId)
    )

    if (updatedFavorites.length === favorites.length) {
        return favorites
    }

    if (saveFavorites(updatedFavorites)) {
        return updatedFavorites
    }

    return favorites
}

// Add a book if it is not saved; otherwise, remove it
export function toggleFavorite(book) {
    if (isFavorite(book.id)) {
        return removeFavorite(book.id)
    }

    return addFavorite(book)
}

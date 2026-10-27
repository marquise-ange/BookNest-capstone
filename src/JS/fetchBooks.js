
const API_URL = 'https://openlibrary.org/search.json'

// Fetch books from the Open Library API
export async function fetchBooks(searchTerm) {
    // Check that the user entered a search term
    if (!searchTerm || !searchTerm.trim()) {
        throw new Error('Please enter a book title to search.')
    }

    // Prepare the search URL
    const params = new URLSearchParams({
        q: searchTerm.trim(),
        fields: 'key,title,author_name,first_publish_year,cover_i',
        limit: '12',
    })

    const url = `${API_URL}?${params.toString()}`

    try {
        // Send the request to the API
        const response = await fetch(url)

        // Check whether the request was successful
        if (!response.ok) {
            throw new Error(`Request failed with status ${response.status}`)
        }

        // Convert the response into JavaScript data
        const data = await response.json()

        // Return book information in a consistent format
        return (data.docs || []).map(book => ({
            id: book.key,
            title: book.title || 'Untitled',
            author: book.author_name?.join(', ') || 'Unknown author',
            firstPublishYear: book.first_publish_year || 'Unknown',
            coverUrl: book.cover_i
                ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
                : null,
        }))
    } catch (error) {
        console.error('Error fetching books:', error)
        throw error
    }
}

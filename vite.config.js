
import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
    plugins: [tailwindcss()],

    build: {
        rollupOptions: {
            input: {
                home: resolve(import.meta.dirname, 'index.html'),
                about: resolve(import.meta.dirname, 'about.html'),
                favorites: resolve(import.meta.dirname, 'favorites.html'),
            },
        },
    },
})

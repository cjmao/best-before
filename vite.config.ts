import { defineConfig } from 'vite'
import pages from '@hono/vite-cloudflare-pages'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => {
	return mode === 'server' ? {
		plugins: [pages()]
	} : {
		build: {
			emptyOutDir: false,
			minify: mode !== 'development',
			sourcemap: mode === 'development',
			watch: mode === 'development' ? {} : null
		},
		plugins: [react()]
	}
})

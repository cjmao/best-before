import { defineConfig } from 'vite'
import pages from '@hono/vite-cloudflare-pages'

export default defineConfig(({ mode }) => {
	return mode !== 'client' ? {
		plugins: [pages()]
	} : {
		build: {
			emptyOutDir: false,
			minify: true
		},
	}
})

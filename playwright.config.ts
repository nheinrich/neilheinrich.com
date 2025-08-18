import { defineConfig } from '@playwright/test';

export default defineConfig({
	webServer: {
		command: 'pnpm run build && pnpm run preview',
		port: 4173
	},
	testDir: 'tests/e2e',
	// Create results and report directories for tracking
	outputDir: 'tests/results',
	reporter: [
		['html', { outputFolder: 'tests/report' }],
		['list']
	],
	use: {
		// Base URL for tests
		baseURL: 'http://localhost:4173',
		// Screenshots on failure
		screenshot: 'only-on-failure',
		// Videos on failure 
		video: 'retain-on-failure'
	}
});

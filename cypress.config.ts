import { defineConfig } from 'cypress';

export default defineConfig({
	projectId: 'solita-academy-project',
	viewportWidth: 1280,
	viewportHeight: 500,
	video: false,
	videosFolder: 'cypress/videos',
	screenshotsFolder: 'cypress/screenshots',
	e2e: {
		baseUrl: 'http://localhost:3000',
		specPattern: 'cypress/e2e/**/*.{js,jsx,ts,tsx}',
	},
});

// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		interface PageData {
			posts?: import('$lib/content').Post[];
			filters?: import('$lib/content').FilterState;
		}
		interface PageState {
			slideOpen?: boolean;
			articleData?: {
				post: import('$lib/content').Post;
			};
			articleSlug?: string;
		}
		// interface Platform {}
	}
}

export {};

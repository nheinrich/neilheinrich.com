<script>
	import Logo from './Logo.svelte';
	import { COLLECTIONS, TOPICS } from '$lib/filters';
</script>

<footer>
	<div class="container">
		<nav class="footer-grid">
			<section class="footer-section">
				<h2>ME</h2>
				<ul>
					<li><a href="/information">INFORMATION</a></li>
					<li class="social-links">
						<a href="https://twitter.com/" target="_blank" rel="noopener noreferrer" aria-label="X (Twitter)">
							<svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" fill="currentColor"/>
							</svg>
						</a>
						<a href="https://instagram.com/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
							<svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM5.838 12a6.162 6.162 0 1 1 12.324 0 6.162 6.162 0 0 1-12.324 0zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm4.965-10.405a1.44 1.44 0 1 1 2.881 0 1.44 1.44 0 0 1-2.881 0z" fill="currentColor"/>
							</svg>
						</a>
						<a href="https://linkedin.com/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
							<svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" fill="currentColor"/>
							</svg>
						</a>
					</li>
				</ul>
			</section>

			<section class="footer-section">
				<h2>BUILDING</h2>
				<ul>
					<li><a href="https://synthesis.tech" target="_blank" rel="noopener noreferrer">SYNTHESIS</a></li>
					<li><a href="https://skelly.so" target="_blank" rel="noopener noreferrer">SKELLY</a></li>
					<li><a href="https://seekingnotseeking.com" target="_blank" rel="noopener noreferrer">SEEKING</a></li>
				</ul>
			</section>

			<section class="footer-section">
				<h2>COLLECTIONS</h2>
				<ul>
					{#each COLLECTIONS as collection}
						<li><a href="/?collections={collection.toLowerCase()}">{collection.toUpperCase()}</a></li>
					{/each}
				</ul>
			</section>

			<section class="footer-section">
				<h2>TOPICS</h2>
				<ul>
					{#each TOPICS as topic}
						<li><a href="/?topics={topic.toLowerCase()}">{topic.toUpperCase()}</a></li>
					{/each}
				</ul>
			</section>
		</nav>

		<div class="footer-meta">
			<p class="copyright">© 2025 NEIL HEINRICH</p>
		</div>
	</div>

	<!-- Large logo positioned at bottom -->
	<div class="footer-logo">
		<Logo />
	</div>
</footer>

<style>
	footer {
		position: relative;
		padding-top: 6rem;
		padding-bottom: 8rem;
		background-color: var(--color-green);
		/* No overflow: hidden to allow logo to extend beyond bounds */
	}

	.container {
		position: relative;
		z-index: 1;
		width: 100%;
		max-width: 88rem;
		margin-left: auto;
		margin-right: auto;
		padding: var(--padding-container);
	}

	.footer-grid {
		display: grid;
		grid-template-columns: 1fr;
		gap: 3rem;
		margin-bottom: 4rem;
	}

	.footer-section h2 {
		margin-bottom: 1.5rem;
		font-size: 1.2rem;
		font-weight: var(--font-weight-bold);
		color: var(--color-tan);
		text-transform: uppercase;
		letter-spacing: 0.05em;
	}

	.footer-section ul {
		list-style: none;
		padding: 0;
		margin: 0;
	}

	.footer-section li {
		line-height: 2.5;
	}

	.footer-section a {
		color: var(--color-tan);
		text-decoration: none;
		text-transform: uppercase;
		font-size: 1rem;
		letter-spacing: 0.03em;
		transition: color var(--transition-duration) ease-out;
	}

	.footer-section a:hover {
		color: var(--color-yellow);
	}

	/* Social icons */
	.social-links {
		display: flex;
		gap: 1.2rem;
		margin-top: 0.5rem;
	}

	.social-links a {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 2rem;
		height: 2rem;
	}

	.social-links svg {
		width: 1.25rem;
		height: 1.25rem;
		transition: transform var(--transition-duration) ease-out;
	}

	.social-links a:hover svg {
		transform: scale(1.1);
	}

	.footer-meta {
		padding-top: 2rem;
		border-top: 1px solid rgba(214, 210, 189, 0.1);
	}

	.copyright {
		text-align: center;
		font-size: 0.875rem;
		color: var(--color-tan);
		opacity: 0.8;
		text-transform: uppercase;
		letter-spacing: 0.05em;
	}

	/* Large logo treatment */
	.footer-logo {
		position: absolute;
		bottom: -50%;
		left: 1.5rem;
		width: 100%;
		max-width: 25rem;
		pointer-events: none;
	}

	@media (min-width: 576px) {
		.footer-logo {
			left: 2.5rem;
		}
	}

	@media (min-width: 992px) {
		.footer-logo {
			left: 4rem;
		}
	}

	.footer-logo :global(.logo) {
		width: 100%;
		height: auto;
		opacity: 0.08;
	}

	.footer-logo :global(.logo path) {
		fill: var(--color-black);
	}

	/* Tablet and up */
	@media (min-width: 768px) {
		.footer-grid {
			grid-template-columns: repeat(2, 1fr);
		}

		.copyright {
			text-align: left;
		}

		.footer-logo {
			max-width: 35rem;
		}
	}

	/* Desktop */
	@media (min-width: 1024px) {
		footer {
			padding-bottom: 10rem;
		}

		.footer-grid {
			grid-template-columns: repeat(4, 1fr);
			gap: 3rem;
		}

		.footer-logo {
			max-width: 45rem;
			bottom: -45%;
		}
	}

	/* Large screens */
	@media (min-width: 1440px) {
		.footer-logo {
			max-width: 55rem;
			bottom: -40%;
		}
	}
</style>

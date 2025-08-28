<script>
	import Logo from './Logo.svelte';
	import NewIcon from './NewIcon.svelte';
	import { COLLECTIONS, TOPICS } from '$lib/filters';
</script>

<footer>
	<div class="container">
		<nav>
			<section>
				<h3>About</h3>
				<ul>
					<li><a href="/information">Information</a></li>
					<li class="socials">
						<a
							href="https://twitter.com/"
							target="_blank"
							rel="noopener noreferrer"
							aria-label="X (Twitter)"
						>
							<NewIcon name="twitter" size="sm" />
						</a>
						<a
							href="https://instagram.com/"
							target="_blank"
							rel="noopener noreferrer"
							aria-label="Instagram"
						>
							<NewIcon name="instagram" size="sm" />
						</a>
						<a
							href="https://linkedin.com/"
							target="_blank"
							rel="noopener noreferrer"
							aria-label="LinkedIn"
						>
							<NewIcon name="linkedin" size="sm" />
						</a>
					</li>
				</ul>
			</section>

			<section>
				<h3>Building</h3>
				<ul>
					<li>
						<a href="https://synthesis.tech" target="_blank" rel="noopener noreferrer">Synthesis</a>
					</li>
					<li><a href="https://skelly.so" target="_blank" rel="noopener noreferrer">Skelly</a></li>
					<li>
						<a href="https://seekingnotseeking.com" target="_blank" rel="noopener noreferrer"
							>Seeking</a
						>
					</li>
				</ul>
			</section>

			<section>
				<h3>Collections</h3>
				<ul>
					{#each COLLECTIONS as collection}
						<li>
							<a href="/?collections={collection.toLowerCase()}">{collection.toUpperCase()}</a>
						</li>
					{/each}
				</ul>
			</section>

			<section>
				<h3>Topics</h3>
				<ul>
					{#each TOPICS as topic}
						<li><a href="/?topics={topic.toLowerCase()}">{topic.toUpperCase()}</a></li>
					{/each}
				</ul>
			</section>
		</nav>

		<div class="meta">
			<p class="copyright">©2025</p>
		</div>
	</div>

	<!-- Large logo positioned at bottom -->
	<div class="logo">
		<Logo />
	</div>
</footer>

<style>
	footer {
		position: relative;
		padding-top: 8rem;
		padding-bottom: 12rem;
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

	nav {
		display: grid;
		grid-template-columns: 1fr;
		gap: 3rem;
		margin-bottom: 6rem;
	}

	h3 {
		margin-bottom: 1.5rem;
		font-size: 1.5rem;
		font-weight: var(--font-weight-normal);
		color: var(--color-tan);
		/* letter-spacing: 0.08em; */
	}

	ul {
		list-style: none;
		padding: 0;
		margin: 0;
	}

	li {
		font-size: var(--font-size-small);
		line-height: 1.75em;
	}

	a {
		color: var(--color-tan);
		text-decoration: none;
		text-transform: uppercase;
		font-size: 0.875rem;
		font-weight: var(--font-weight-regular);
		letter-spacing: 0.05em;
		opacity: 0.85;
		transition: all var(--transition-duration) ease-out;
	}

	a:hover {
		color: var(--color-yellow);
		opacity: 1;
	}

	.socials {
		display: flex;
		gap: 1rem;
		margin-top: 1rem;
	}

	.socials a {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		opacity: 1;
		transition: all var(--transition-duration) ease-out;
	}

	.socials a:hover {
		transform: scale(1.15);
	}

	.meta {
		padding-top: 3rem;
		border-top: 1px solid rgba(214, 210, 189, 0.08);
	}

	.copyright {
		text-align: center;
		font-size: 0.75rem;
		color: var(--color-tan);
		opacity: 0.6;
		text-transform: uppercase;
		letter-spacing: 0.08em;
	}

	/* Large logo treatment */
	.logo {
		position: absolute;
		bottom: -48%;
		left: 1.5rem;
		width: 100%;
		max-width: 35rem;
		pointer-events: none;
	}

	@media (min-width: 576px) {
		.logo {
			left: 2.5rem;
			max-width: 45rem;
		}
	}

	@media (min-width: 992px) {
		.logo {
			left: 4rem;
			max-width: 55rem;
		}
	}

	.logo :global(.logo) {
		width: 100%;
		height: auto;
		opacity: 0.05;
	}

	.logo :global(.logo path) {
		fill: var(--color-black);
	}

	/* Tablet and up */
	@media (min-width: 768px) {
		nav {
			grid-template-columns: repeat(2, 1fr);
		}

		.copyright {
			text-align: left;
		}

		.logo {
			max-width: 35rem;
		}
	}

	/* Desktop */
	@media (min-width: 1024px) {
		footer {
			padding-top: 10rem;
			padding-bottom: 14rem;
		}

		nav {
			grid-template-columns: repeat(4, 1fr);
			column-gap: 4rem;
			margin-bottom: 8rem;
		}

		h3 {
			font-size: var(--font-size-copy);
		}

		a {
			font-size: 0.8rem;
		}

		.logo {
			max-width: 65rem;
			bottom: -45%;
		}
	}

	/* Large screens */
	@media (min-width: 1440px) {
		.logo {
			max-width: 75rem;
			bottom: -42%;
		}
	}
</style>

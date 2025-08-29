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
						<a href="https://synthesis.tech" target="_blank" rel="noopener noreferrer">
							<span class="external-link">Synthesis <NewIcon name="external" size="xs" /></span>
						</a>
					</li>
					<li>
						<a href="https://skelly.so" target="_blank" rel="noopener noreferrer">
							<span class="external-link">Skelly <NewIcon name="external" size="xs" /></span>
						</a>
					</li>
					<li>
						<a href="https://seekingnotseeking.com" target="_blank" rel="noopener noreferrer">
							<span class="external-link">Seeking <NewIcon name="external" size="xs" /></span>
						</a>
					</li>
				</ul>
			</section>

			<section>
				<h3>Collections</h3>
				<ul>
					{#each COLLECTIONS as collection}
						<li>
							<a href="/?collections={collection.toLowerCase()}">{collection}</a>
						</li>
					{/each}
				</ul>
			</section>

			<section>
				<h3>Topics</h3>
				<ul>
					{#each TOPICS as topic}
						<li><a href="/?topics={topic.toLowerCase()}">{topic}</a></li>
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
		padding-top: 12rem;
		padding-bottom: 2rem;
		/* background-color: var(--color-black); */
		overflow: hidden;
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

	section {
		padding-bottom: 0;
	}

	h3 {
		margin-bottom: 2rem;
		font-size: var(--font-size-subheading);
		font-weight: var(--font-weight-normal);
		color: var(--color-yellow);
	}

	ul {
		list-style: none;
		padding: 0;
		margin: 0;
	}

	li {
		font-size: var(--font-size-small);
		line-height: 2em;
	}

	a {
		color: var(--color-tan);
		text-decoration: none;
		/* text-transform: uppercase; */
		font-size: 1.1rem;
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
		gap: 0.5rem;
		margin-top: 1rem;
	}

	.socials a {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		opacity: 1;
		transform: scale(1.35);
		transition: all var(--transition-duration) ease-out;
	}

	.socials a:hover {
		transform: scale(2);
	}

	.external-link {
		display: flex;
		align-items: center;
		gap: 0.25rem;
	}

	.external-link :global(.icon-container) {
		width: 0.75rem;
		height: 0.75rem;
		opacity: 0.7;
	}

	.meta {
	}

	.copyright {
		font-size: 0.75rem;
		color: var(--color-tan);
		opacity: 0.6;
		text-transform: uppercase;
		letter-spacing: 0.08em;
		padding-top: 1rem;
	}

	.logo {
		position: absolute;
		left: 3%;
		bottom: -70%;
		width: 100%;
		max-width: 55rem;
		pointer-events: none;
		opacity: 1;
		height: auto;
	}

	/* .logo svg {
		max-width: 55rem;
	} */

	.logo :global(.logo path) {
		fill: var(--color-black);
		/* opacity: 20%; */
	}

	@media (min-width: 576px) {
	}

	@media (min-width: 992px) {
	}

	@media (min-width: 768px) {
		nav {
			grid-template-columns: repeat(2, 1fr);
		}
	}

	/* Desktop */
	@media (min-width: 1024px) {
		nav {
			grid-template-columns: repeat(4, 1fr);
			column-gap: 4rem;
		}
	}

	/* Large screens */
	@media (min-width: 1440px) {
	}
</style>

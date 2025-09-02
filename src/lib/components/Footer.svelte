<script>
	import Logo from './Logo.svelte';
	import NewIcon from './NewIcon.svelte';
	import { COLLECTIONS, TOPICS } from '$lib/filters';
</script>

<footer>
	<div class="container">
		<div class="content">
			<div class="info">
				<div class="branding">
					<Logo />
					<span class="copyright">&copy; 2025</span>
				</div>
				<h3>Fieldnotes</h3>
				<p class="tagline">A collection of artifacts mined from the depths of rabbit holes.</p>
				<div class="social">
					<a
						href="https://twitter.com/"
						target="_blank"
						rel="noopener noreferrer"
						aria-label="X (Twitter)"
					>
						<NewIcon name="twitter" size="lg" />
					</a>
					<a
						href="https://instagram.com/"
						target="_blank"
						rel="noopener noreferrer"
						aria-label="Instagram"
					>
						<NewIcon name="instagram" size="lg" />
					</a>
					<a
						href="https://linkedin.com/"
						target="_blank"
						rel="noopener noreferrer"
						aria-label="LinkedIn"
					>
						<NewIcon name="linkedin" size="lg" />
					</a>
				</div>
			</div>

			<!-- Navigation columns -->
			<nav>
				<h4>Explore</h4>
				<ul>
					<li><a href="/information">Information</a></li>
					<li><a href="mailto:yo@neilheinrich.com">Contact</a></li>
				</ul>
			</nav>

			<nav>
				<h4>External</h4>
				<ul>
					<li>
						<a href="https://synthesis.tech" target="_blank" rel="noopener noreferrer">
							Synthesis
						</a>
					</li>
					<li>
						<a href="https://skelly.so" target="_blank" rel="noopener noreferrer"> Skelly </a>
					</li>
					<li>
						<a href="https://seekingnotseeking.com" target="_blank" rel="noopener noreferrer">
							Seeking
						</a>
					</li>
				</ul>
			</nav>

			<nav>
				<h4>Collections</h4>
				<ul>
					{#each COLLECTIONS as collection}
						<li>
							<a href="/?collections={collection.toLowerCase()}">{collection}</a>
						</li>
					{/each}
				</ul>
			</nav>

			<nav>
				<h4>Topics</h4>
				<ul>
					{#each TOPICS as topic}
						<li><a href="/?topics={topic.toLowerCase()}">{topic}</a></li>
					{/each}
				</ul>
			</nav>
		</div>
	</div>
</footer>

<style>
	footer {
		background-color: var(--color-green);
	}

	.content {
		display: grid;
		grid-template-columns: 1fr;
		gap: 2rem;
		padding: 8rem 0 6rem;
	}

	.info {
		display: flex;
		flex-direction: column;
		gap: 0.85rem;
	}

	.info :global(.logo) {
		width: auto;
		height: 3rem;
		align-self: flex-start;
		margin-bottom: 0.4rem;
	}
	.branding {
		display: flex;
		flex-direction: row;
		align-items: end;
		gap: 0.4rem;
	}
	.copyright {
		font-size: 0.75rem;
		color: var(--color-tan);
		opacity: 0.3;
		transform: translateX(-0.3rem) translateY(-0.2rem);
	}
	h3 {
		font-size: 1.5rem;
		color: var(--color-yellow);
		line-height: 1.25em;
	}

	.tagline {
		color: var(--color-tan);
		font-size: var(--font-size-small);
		margin: 0;
		opacity: 0.8;
		max-width: 20rem;
	}

	.social {
		display: flex;
		gap: 0.3rem;
		transform: translateX(-0.5rem);
	}

	.social a {
		position: relative;
		color: var(--color-tan);
		opacity: 0.8;
		transition:
			color var(--transition-duration) ease,
			opacity var(--transition-duration) ease;
	}

	.social a :global(.icon-container) {
		width: 38px;
	}

	.social a::after {
		content: '';
		position: absolute;
		bottom: 0.25rem;
		left: 0;
		width: 100%;
		height: 0.185rem;
		background-color: var(--color-scarlet);
		border-radius: 1rem;
		opacity: 0;
		transform: translateY(0.125rem);
		transition:
			opacity 200ms ease-out,
			transform 200ms ease-out;
	}

	.social a:hover {
		opacity: 1;
		color: var(--color-yellow);
	}

	.social a:hover::after {
		opacity: 1;
		transform: translateY(0);
	}

	nav {
		padding-top: 1rem;
	}

	nav h4 {
		color: var(--color-yellow);
		font-size: 1.1rem;
		font-weight: var(--font-weight-bold);
		padding-bottom: 0.5rem;
		margin-bottom: 0.25rem;
		opacity: 0.9;
		border-bottom: 2px solid var(--color-scarlet);
	}

	nav ul {
		display: flex;
		flex-direction: column;
		gap: 0rem;
	}

	nav li {
		line-height: 1em;
	}

	nav a {
		color: var(--color-tan);
		text-decoration: none;
		font-size: var(--font-size-small);
		opacity: 0.8;
		transition:
			color var(--transition-duration) ease,
			opacity var(--transition-duration) ease;
		display: inline-block;
	}

	nav a:hover {
		opacity: 1;
		/* color: var(--color-yellow); */
	}

	@media (min-width: 768px) {
		.content {
			grid-template-columns: 1fr auto auto;
			gap: 2rem 4rem;
			justify-content: start;
		}
	}

	@media (min-width: 1024px) {
		.content {
			grid-template-columns:
				1fr
				minmax(4rem, 9rem)
				minmax(4rem, 9rem)
				minmax(4rem, 9rem)
				minmax(4rem, 9rem);
			gap: 2rem;
			margin-bottom: 3.5rem;
		}
	}
</style>

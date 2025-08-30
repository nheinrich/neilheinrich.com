<script>
	import Logo from './Logo.svelte';
	import NewIcon from './NewIcon.svelte';
	import { COLLECTIONS, TOPICS } from '$lib/filters';
</script>

<footer>
	<div class="container">
		<div class="content">
			<div class="brand">
				<Logo />
				<h3>Fieldnotes</h3>
				<p class="tagline">A collection of artifacts from venturing into rabbit holes.</p>
				<div class="social">
					<a
						href="https://twitter.com/"
						target="_blank"
						rel="noopener noreferrer"
						aria-label="X (Twitter)"
					>
						<NewIcon name="twitter" size="md" />
					</a>
					<a
						href="https://instagram.com/"
						target="_blank"
						rel="noopener noreferrer"
						aria-label="Instagram"
					>
						<NewIcon name="instagram" size="md" />
					</a>
					<a
						href="https://linkedin.com/"
						target="_blank"
						rel="noopener noreferrer"
						aria-label="LinkedIn"
					>
						<NewIcon name="linkedin" size="md" />
					</a>
				</div>
			</div>

			<!-- Navigation columns -->
			<nav>
				<h4>Explore</h4>
				<ul>
					<li><a href="/information">Information</a></li>
					<li><a href="/">All Posts</a></li>
				</ul>
			</nav>

			<nav>
				<h4>Building</h4>
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

		<div class="bottom">
			<p class="copyright">© 2025 Neil Heinrich</p>
		</div>
	</div>
</footer>

<style>
	footer {
		background-color: var(--color-green);
		padding: 6rem 0 2rem;
	}

	.content {
		display: grid;
		grid-template-columns: 1fr;
		gap: 2rem;
		margin-bottom: 3rem;
	}

	.brand {
		display: flex;
		flex-direction: column;
		gap: 0.85rem;
	}

	.brand :global(.logo) {
		width: auto;
		height: 3rem;
		align-self: flex-start;
		margin-bottom: 0.4rem;
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
		color: var(--color-tan);
		opacity: 0.8;
		transition:
			color var(--transition-duration) ease,
			opacity var(--transition-duration) ease;
	}

	.social a:hover {
		opacity: 1;
		color: var(--color-yellow);
	}

	nav {
		padding-top: 4.6rem;
	}
	nav h4 {
		color: var(--color-yellow);
		font-size: var(--font-size-small);
		font-weight: var(--font-weight-bold);
		margin-bottom: 0.7rem;
		opacity: 0.9;
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
		transition: color var(--transition-duration) ease;
		display: inline-block;
	}

	nav a:hover {
		opacity: 1;
		color: var(--color-yellow);
	}

	.bottom {
		border-top: 1px solid rgba(214, 210, 189, 0.1);
		padding-top: 2rem;
	}

	.bottom .copyright {
		color: var(--color-tan);
		font-size: 0.75rem;
		margin: 0;
		opacity: 0.6;
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
			grid-template-columns: 1fr minmax(4rem, 6rem) minmax(4rem, 6rem) minmax(4rem, 6rem) minmax(
					4rem,
					6rem
				);
			gap: 2rem 3rem;
			margin-bottom: 3.5rem;
		}
	}
</style>

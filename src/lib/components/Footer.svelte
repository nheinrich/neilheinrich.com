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
			<div class="nav-column">
				<h4>Explore</h4>
				<ul>
					<li><a href="/information">Information</a></li>
					<li><a href="/">All Posts</a></li>
				</ul>
			</div>

			<div class="nav-column">
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
			</div>

			<div class="nav-column">
				<h4>Collections</h4>
				<ul>
					{#each COLLECTIONS as collection}
						<li>
							<a href="/?collections={collection.toLowerCase()}">{collection}</a>
						</li>
					{/each}
				</ul>
			</div>

			<div class="nav-column">
				<h4>Topics</h4>
				<ul>
					{#each TOPICS as topic}
						<li><a href="/?topics={topic.toLowerCase()}">{topic}</a></li>
					{/each}
				</ul>
			</div>
		</div>

		<!-- Bottom section: Copyright and legal -->
		<div class="footer-bottom">
			<p class="copyright">© 2025 Neil Heinrich</p>
		</div>
	</div>
</footer>

<style>
	footer {
		background-color: var(--color-green);
		padding: 6rem 0 2rem;
	}

	.container {
		width: 100%;
		max-width: 88rem;
		margin: 0 auto;
		padding: 0 2rem;
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
		gap: 1rem;
	}

	.brand :global(.logo) {
		width: auto;
		height: 3rem;
		align-self: flex-start;
		margin-bottom: 0.25rem;
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
		transition: color var(--transition-duration-x2) ease;
	}

	.social a:hover {
		opacity: 1;
		color: var(--color-yellow);
	}

	.nav-column h4 {
		color: var(--color-tan);
		font-size: 0.875rem;
		font-weight: 600;
		margin: 0 0 1rem 0;
		opacity: 0.9;
	}

	.nav-column ul {
		list-style: none;
		padding: 0;
		margin: 0;
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	.nav-column li {
		line-height: 1.5;
	}

	.nav-column a {
		color: var(--color-tan);
		text-decoration: none;
		font-size: 0.8rem;
		opacity: 0.7;
		transition: all 0.2s ease;
		display: inline-block;
	}

	.nav-column a:hover {
		opacity: 1;
		color: var(--color-yellow);
	}

	/* Bottom section */
	.footer-bottom {
		border-top: 1px solid rgba(214, 210, 189, 0.1);
		padding-top: 2rem;
	}

	.copyright {
		color: var(--color-tan);
		font-size: 0.75rem;
		margin: 0;
		opacity: 0.6;
	}

	/* Responsive design */
	@media (min-width: 768px) {
		.footer-content {
			grid-template-columns: 1fr repeat(2, 0.8fr);
			gap: 3rem;
		}
	}

	@media (min-width: 1024px) {
		.container {
			padding: 0 3rem;
		}

		.content {
			grid-template-columns: 1fr repeat(4, 0.6fr);
			gap: 3rem;
			margin-bottom: 3.5rem;
		}
	}

	@media (min-width: 1440px) {
		.container {
			padding: 0 4rem;
		}

		.content {
			gap: 4rem;
		}
	}
</style>

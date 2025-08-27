<script>
	import Logo from './Logo.svelte';
</script>

<footer>
	<div class="container">
		<nav class="footer-grid">
			<section class="footer-section">
				<h2>ME</h2>
				<!-- Links will be added in Phase 2 -->
			</section>

			<section class="footer-section">
				<h2>BUILDING</h2>
				<!-- Links will be added in Phase 2 -->
			</section>

			<section class="footer-section">
				<h2>COLLECTIONS</h2>
				<!-- Dynamic links will be added in Phase 2 -->
			</section>

			<section class="footer-section">
				<h2>TOPICS</h2>
				<!-- Dynamic links will be added in Phase 2 -->
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
		left: 4rem;
		width: 100%;
		max-width: 25rem;
		pointer-events: none;
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

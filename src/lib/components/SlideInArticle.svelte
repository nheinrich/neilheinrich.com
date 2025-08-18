<script>
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';

	// Reactive slide-in state using Svelte 5 runes
	let shouldShow = $derived(!!$page.state?.slideOpen);
	let isOpen = $state(false);
	let articleData = $derived($page.state?.articleData);
	let articleSlug = $derived($page.state?.articleSlug);

	// Handle smooth enter/exit animations with proper closing animation
	let isClosing = $state(false);
	let showCloseButton = $state(false);
	let showContent = $state(false);

	$effect(() => {
		if (shouldShow) {
			// Small delay to ensure DOM is ready before animating in
			isClosing = false;
			showCloseButton = false;
			showContent = false;
			setTimeout(() => {
				isOpen = true;
				// Fade in close button after slide animation completes (300ms)
				setTimeout(() => {
					showCloseButton = true;
					// Fade in content slightly after close button
					setTimeout(() => {
						showContent = true;
					}, 100);
				}, 300);
			}, 10);
		} else {
			if (isOpen) {
				// Hide content and close button immediately when closing starts
				showContent = false;
				showCloseButton = false;
				// Start closing animation
				isClosing = true;
				isOpen = false;
				// Remove from DOM after animation completes
				setTimeout(() => {
					isClosing = false;
				}, 300);
			}
		}
	});

	// Dynamic component loading
	let articleComponent = $state(null);

	// Load the MDX component when article slug changes
	$effect(() => {
		if (articleSlug) {
			import(`../content/posts/${articleSlug}/index.mdx`)
				.then((module) => {
					articleComponent = module.default;
				})
				.catch((error) => {
					console.error('Failed to load article component:', error);
					articleComponent = null;
				});
		} else {
			articleComponent = null;
		}
	});

	function close() {
		// Use native browser back for natural behavior
		history.back();
	}

	function handleBackdropClick(event) {
		// Only close if clicking the backdrop, not the content
		if (event.target === event.currentTarget) {
			close();
		}
	}

	function handleKeydown(event) {
		if (event.key === 'Escape' && isOpen) {
			close();
		}
	}

	// Add global keydown listener when open
	$effect(() => {
		if (shouldShow) {
			document.addEventListener('keydown', handleKeydown);
			// Prevent body scroll when slide-in is open
			document.body.style.overflow = 'hidden';
		} else {
			document.removeEventListener('keydown', handleKeydown);
			document.body.style.overflow = '';
		}

		// Cleanup on unmount
		return () => {
			document.removeEventListener('keydown', handleKeydown);
			document.body.style.overflow = '';
		};
	});
</script>

{#if (shouldShow || isClosing) && articleData}
	<!-- Close button - positioned independently at screen edge -->
	<button
		class="close-btn"
		class:visible={showCloseButton}
		onclick={close}
		aria-label="Close article"
		type="button"
	>
		×
	</button>

	<!-- Slide-in overlay with 120px margin design -->
	<div
		class="slide-container"
		class:open={isOpen}
		onclick={handleBackdropClick}
		onkeydown={handleKeydown}
		role="dialog"
		aria-modal="true"
		aria-labelledby="article-title"
		aria-describedby="article-content"
		tabindex="-1"
	>
		<!-- Clickable margin area (120px) -->
		<div
			class="clickable-margin"
			onclick={close}
			onkeydown={(e) => e.key === 'Enter' && close()}
			role="button"
			tabindex="0"
			aria-label="Close article"
		></div>

		<!-- Main slide panel -->
		<div class="slide-panel">
			<!-- Article content -->
			<article id="article-content" class:visible={showContent}>
				<header>
					<h1 id="article-title">{articleData.post.frontmatter.title}</h1>
					<div class="meta">
						<time datetime={articleData.post.frontmatter.date}>
							{new Date(articleData.post.frontmatter.date).toLocaleDateString('en-US', {
								year: 'numeric',
								month: 'long',
								day: 'numeric'
							})}
						</time>
						{#if articleData.post.frontmatter.updated && articleData.post.frontmatter.updated !== articleData.post.frontmatter.date}
							<span class="updated">
								Updated {new Date(articleData.post.frontmatter.updated).toLocaleDateString(
									'en-US',
									{
										year: 'numeric',
										month: 'long',
										day: 'numeric'
									}
								)}
							</span>
						{/if}
					</div>

					<div class="tags">
						{#if articleData.post.frontmatter.collections}
							{#each articleData.post.frontmatter.collections as collection}
								<span class="tag collection">{collection}</span>
							{/each}
						{/if}
						{#each articleData.post.frontmatter.topics as topic}
							<span class="tag topic">{topic}</span>
						{/each}
						<span class="tag format">{articleData.post.frontmatter.format}</span>
					</div>
				</header>

				<div class="content">
					<!-- Render the dynamically loaded MDX content -->
					{#if articleComponent}
						{@render articleComponent()}
					{:else}
						<p>Loading content...</p>
					{/if}
				</div>
			</article>
		</div>
	</div>
{/if}

<style>
	.slide-container {
		position: fixed;
		top: 0;
		right: 0;
		bottom: 0;
		left: 5rem; /* Homepage shows through - half the original size */
		z-index: 1000;
		pointer-events: none;

		/* Hardware acceleration for smooth animations */
		will-change: transform;
	}

	.slide-container.open {
		pointer-events: auto;
	}

	.clickable-margin {
		position: absolute;
		top: 0;
		left: -60px;
		bottom: 0;
		width: 60px;
		cursor: pointer;
		background: transparent;
		transition: background var(--transition-duration) ease-out;
	}

	.clickable-margin:hover {
		background: transparent;
	}

	.slide-panel {
		position: absolute;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		background: var(--color-black);
		transform: translateX(100%);
		transition: transform 300ms cubic-bezier(0.4, 0, 0.2, 1);
		overflow-y: auto;

		/* Hardware acceleration */
		will-change: transform;
	}

	.slide-container.open .slide-panel {
		transform: translateX(0);
	}

	/* Ensure slide-out animation when closing */
	.slide-container:not(.open) .slide-panel {
		transform: translateX(100%);
	}

	.close-btn {
		position: fixed;
		top: 0rem;
		left: 0rem;
		width: 5rem;
		height: 5rem;
		background: var(--color-scarlet);
		color: var(--color-cream);
		border: none;
		border-radius: 0;
		font-size: 3rem;
		font-weight: var(--font-weight-regular);
		padding-bottom: 6px;
		cursor: pointer;
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 1001;
		opacity: 0;
		transition:
			background-color var(--transition-duration) ease-out,
			opacity 300ms ease-out;
		/* Perfect centering adjustments */
		line-height: 1;
		text-align: center;
	}

	.close-btn.visible {
		opacity: 1;
	}

	.close-btn:hover {
		background: var(--color-yellow);
		color: var(--color-green);
	}

	.close-btn:focus {
		outline: none;
	}

	/* Only show focus outline when navigating with keyboard */
	.close-btn:focus-visible {
		outline: 2px solid var(--color-yellow);
		outline-offset: 2px;
	}

	/* Article content styling */
	article {
		padding: 2rem;
		max-width: 800px;
		margin: 0 auto;
		opacity: 0;
		transition: opacity 400ms ease-out;
	}

	article.visible {
		opacity: 1;
	}

	article header {
		margin-bottom: 2rem;
	}

	article h1 {
		margin-bottom: 1rem;
		color: rgba(255, 255, 255, 0.9);
		font-weight: var(--font-weight-regular);
	}

	.meta {
		margin-bottom: 1rem;
		color: rgba(255, 255, 255, 0.5);
		font-size: var(--font-size-small);
	}

	.updated {
		margin-left: 1rem;
		font-style: italic;
	}

	.tags {
		display: flex;
		gap: 0.5rem;
		flex-wrap: wrap;
		margin-bottom: 2rem;
	}

	.tag {
		padding: 0.2rem 0.6rem;
		border-radius: 0.25rem;
		font-size: 0.8rem;
		font-weight: var(--font-weight-regular);
		text-transform: uppercase;
		letter-spacing: 0.05em;
		background: rgba(255, 255, 255, 0.1);
		color: rgba(255, 255, 255, 0.7);
		border: 1px solid rgba(255, 255, 255, 0.2);
	}

	.content {
		line-height: 1.6;
		color: rgba(255, 255, 255, 0.8);
	}

	/* MDX content styling */
	.content :global(h1),
	.content :global(h2) {
		color: rgba(255, 255, 255, 0.9);
		margin-top: 2rem;
		margin-bottom: 1rem;
		font-size: var(--font-size-subheading);
		font-weight: var(--font-weight-regular);
	}

	.content :global(h1) {
		font-size: var(--font-size-heading);
	}

	.content :global(h3) {
		color: rgba(255, 255, 255, 0.85);
		margin-top: 1.5rem;
		margin-bottom: 0.75rem;
		font-weight: var(--font-weight-regular);
	}

	.content :global(p) {
		margin-bottom: 1rem;
	}

	.content :global(a) {
		color: rgba(255, 255, 255, 0.9);
		text-decoration: underline;
		transition: color var(--transition-duration) ease-out;
	}

	.content :global(a:hover) {
		color: rgba(255, 255, 255, 1);
	}

	.content :global(strong) {
		color: rgba(255, 255, 255, 0.95);
		font-weight: var(--font-weight-bold);
	}

	.content :global(code) {
		background: rgba(255, 255, 255, 0.1);
		padding: 0.2rem 0.4rem;
		border-radius: 0.25rem;
		font-family: 'Söhne Mono', monospace;
		font-size: 0.9em;
	}

	.content :global(ul),
	.content :global(ol) {
		margin-bottom: 1rem;
		padding-left: 1.5rem;
	}

	.content :global(li) {
		margin-bottom: 0.5rem;
		list-style: disc;
	}

	/* Mobile responsiveness */
	@media (max-width: 768px) {
		.slide-container {
			left: 10px; /* Smaller margin on mobile - half size */
		}

		.clickable-margin {
			left: -10px;
			width: 10px;
		}

		.close-btn {
			left: 0.5rem;
			width: 10px;
			height: 10px;
		}

		article {
			padding: 1rem;
		}
	}

	/* Reduced motion support */
	@media (prefers-reduced-motion: reduce) {
		.slide-panel {
			transition: none;
		}

		.close-btn {
			transition: none;
		}
	}
</style>

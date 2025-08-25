<script lang="ts">
	import { preloadData, pushState, goto } from '$app/navigation';
	import FilterBar from '$lib/components/FilterBar.svelte';
	import Icon from '$lib/components/Icon.svelte';
	import NewIcon from '$lib/components/NewIcon.svelte';
	import Arrow from '$lib/components/Arrow.svelte';
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import { getIconForFormat } from '$lib/format';
	import type { PageData } from './$types';

	interface Props {
		data: PageData;
	}

	let { data }: Props = $props();

	// Extract posts and filters from layout data using Svelte 5 runes
	let posts = $derived(data.posts);
	let filters = $derived(data.filters);

	/**
	 * Open article in slide-in using SvelteKit's shallow routing
	 */
	async function openArticleInSlideIn(event: MouseEvent, slug: string) {
		// Check for modifier keys - if present, allow normal navigation
		if (event.shiftKey || event.metaKey || event.ctrlKey) {
			return; // Let the browser handle normal navigation
		}

		// Check for small screens - on mobile, use normal navigation
		if (window.innerWidth < 640) {
			return; // Let the browser handle normal navigation
		}

		// Prevent normal navigation
		event.preventDefault();

		try {
			// Preload the article data efficiently using SvelteKit
			const result = await preloadData(`/content/${slug}`);

			if (result.type === 'loaded' && result.status === 200) {
				// Success! Open in slide-in with shallow routing
				// Only store serializable data, not the component
				pushState(`/content/${slug}`, {
					slideOpen: true,
					articleSlug: slug,
					articleData: {
						post: {
							slug: result.data.post.slug,
							frontmatter: result.data.post.frontmatter,
							content: null // Component will be loaded dynamically in the slide-in
						}
					}
				});
			} else {
				// Fallback to normal navigation if preload fails
				goto(`/content/${slug}`);
			}
		} catch (error) {
			// Fallback to normal navigation on any error
			console.warn('Failed to preload article, falling back to navigation:', error);
			goto(`/content/${slug}`);
		}
	}
</script>

<svelte:head>
	<title>Neil Heinrich - Blog</title>
	<meta name="description" content="Personal blog about building, learning, and creating." />
</svelte:head>

<!-- Header -->
<Header />

<!-- Filter Section -->
<section class="filters">
	<div class="container">
		<!-- Filter controls -->
		<FilterBar {filters} />

		<div style="display: none;">
			{#if filters.collections.length > 0 || filters.topics.length > 0 || filters.format !== 'all'}
				<div class="filter-summary">
					<p>Showing {posts.length} posts</p>
					<div class="active-filters">
						{#each filters.collections as collection}
							<span class="filter-tag collection">{collection}</span>
						{/each}
						{#each filters.topics as topic}
							<span class="filter-tag topic">{topic}</span>
						{/each}
						{#if filters.format !== 'all'}
							<span class="filter-tag format">{filters.format}</span>
						{/if}
					</div>
				</div>
			{/if}
		</div>
	</div>
</section>

<!-- Posts Section -->
<section class="content">
	<!-- Posts List -->
	<div class="list">
		{#each posts as post}
			<a
				href="/content/{post.slug}"
				class="link"
				data-pinned={post.frontmatter.pinned || null}
				onclick={(e) => openArticleInSlideIn(e, post.slug)}
				data-sveltekit-preload-data
			>
				<div class="grid container">
					{#if post.frontmatter.pinned}
						<span class="pin" aria-label="Pinned post">★</span>
					{/if}

					<span class="format">
						<!-- <Icon type={getIconForFormat(post.frontmatter.format)} /> -->
						<NewIcon
							name={getIconForFormat(post.frontmatter.format)}
							size="xl"
							variant="squircle"
							filled
							class="bg-black text-tan"
						/>
					</span>

					<div class="title">
						{#if post.frontmatter.collections && post.frontmatter.collections.length > 0}
							<span class="collection">
								{post.frontmatter.collections.join(', ')}
								<Arrow />
							</span>
						{/if}
						{post.frontmatter.title}
					</div>

					<span class="topics">
						{post.frontmatter.topics.join(', ')}
					</span>

					<span class="year">
						{new Date(post.frontmatter.date).getFullYear()}
					</span>
				</div>
			</a>
		{/each}
	</div>

	{#if posts.length === 0}
		<div class="container">
			<p class="empty">No posts found</p>
		</div>
	{/if}
</section>

<!-- Footer -->
<Footer />

<style>
	/* Section Layout */
	:root {
		--separator-height: 0.25rem;
	}

	.filters {
		padding-bottom: 0;
	}

	.content {
		padding-bottom: 0;
	}

	/* Filter Summary */
	.filter-summary {
		margin-bottom: 2rem;
		padding: 1rem;
		background: rgba(255, 255, 255, 0.05);
		border-radius: 0.5rem;
	}

	.active-filters {
		display: flex;
		gap: 0.5rem;
		flex-wrap: wrap;
		margin-top: 0.5rem;
	}

	.filter-tag {
		padding: 0.2rem 0.6rem;
		border-radius: 0.25rem;
		font-size: 0.8rem;
		font-weight: var(--font-weight-bold);
		text-transform: uppercase;
		letter-spacing: 0.05em;
	}

	.filter-tag.collection {
		background: var(--color-lilac);
		color: var(--color-green);
	}

	.filter-tag.topic {
		background: var(--color-yellow);
		color: var(--color-green);
	}

	.filter-tag.format {
		background: var(--color-scarlet);
		color: var(--color-cream);
	}

	/* Grid Layout */
	.grid {
		display: grid;
		grid-template-columns:
			2.2rem /* format */
			1fr /* title */
			8rem /* topics */
			8rem /* year */;
		gap: 1rem;
		padding-block: 0.9rem 1rem;
		align-items: start;
		color: var(--color-tan);
		font-size: var(--font-size-copy);
	}

	.grid > * {
		white-space: nowrap;
	}

	.list {
		display: flex;
		flex-direction: column;
	}

	.link {
		position: relative;
		text-decoration: none;
		border-top: var(--separator-height) solid var(--color-black);
		transition: background-color var(--transition-duration) ease-out;
	}

	.link:last-child {
		border-bottom: var(--separator-height) solid var(--color-black);
	}

	.link:hover {
		background-color: var(--color-burgundy);
	}

	.link:hover .grid > *,
	.link:hover .title {
		color: var(--color-cream);
	}

	.link[data-pinned='true'] .pin {
		display: block;
	}

	.pin {
		display: none;
		position: absolute;
		left: -2rem;
		color: var(--color-yellow);
		font-size: 0.75rem;
	}

	.title {
		color: var(--color-tan);
		transition: color var(--transition-duration) ease-out;
	}

	.format {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 2.25rem;
		height: 2.25rem;
	}

	.format :global(.squircle) {
		transform: translateY(0.05rem);
	}

	.collection {
		color: var(--color-cream);
		font-weight: var(--font-weight-bold);
		margin-right: 0.5rem;
	}

	.collection :global(svg) {
		margin-left: 0.5rem;
		vertical-align: middle;
		transform: translateY(-1px) scale(0.8);
	}

	.collection :global(path) {
		fill: var(--color-umber);
		transition: fill 400ms ease-out;
	}

	/* .link:hover :global(.squircle.filled::before) {
		background: var(--color-blue);
	} */

	.link:hover :global(.squircle.filled svg path) {
		fill: var(--color-cream);
	}

	.link:hover .collection :global(path) {
		fill: var(--color-blue);
	}

	.topics {
		overflow: hidden;
	}

	.year {
		color: var(--color-cream);
		text-align: right;
		/* font-weight: var(--font-weight-bold); */
	}

	.empty {
		text-align: center;
		padding-block: 3rem;
		color: rgba(255, 255, 255, 0.5);
	}

	/* Mobile responsive */
	@media (max-width: 767px) {
		.grid {
			grid-template-columns: 2rem 1fr;
			gap: 0.75rem;
		}

		.topics,
		.year {
			display: none;
		}

		.title {
			font-size: var(--font-size-small);
		}
	}
</style>

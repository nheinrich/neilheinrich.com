<script lang="ts">
	import { goto } from '$app/navigation';
	import {
		COLLECTIONS,
		TOPICS,
		type FilterState,
		type Collection,
		type Topic,
		type Format
	} from '$lib/content';
	import NewIcon from '$lib/components/NewIcon.svelte';

	interface Props {
		filters: FilterState;
	}

	let { filters = { collections: [], topics: [], format: 'all' } }: Props = $props();

	// Local state synced with URL
	let currentFormat = $state<Format | 'all'>(filters.format);
	let currentCollections = $state<Collection[]>([...filters.collections]);
	let currentTopics = $state<Topic[]>([...filters.topics]);

	// Filter panel state
	let filterOpen = $state(false);

	// Calculate active filter count and text
	const activeFilterCount = $derived(
		currentCollections.length + currentTopics.length + (currentFormat !== 'all' ? 1 : 0)
	);

	const filterButtonText = $derived(() => {
		const count = activeFilterCount;
		if (count === 0) return 'Filter';
		return count === 1 ? '1 filter' : `${count} filters`;
	});

	const hasActiveFilters = $derived(activeFilterCount > 0);

	/**
	 * Update URL with new filter state using SvelteKit navigation
	 * Converts values to lowercase for cleaner URLs
	 */
	function updateURL() {
		const params = new URLSearchParams();

		if (currentCollections.length > 0) {
			params.set('collections', currentCollections.map((c) => c.toLowerCase()).join(','));
		}

		if (currentTopics.length > 0) {
			params.set('topics', currentTopics.map((t) => t.toLowerCase()).join(','));
		}

		if (currentFormat !== 'all') {
			params.set('format', currentFormat.toLowerCase());
		}

		const queryString = params.toString();
		const newUrl = queryString ? `/?${queryString}` : '/';
		goto(newUrl, { replaceState: true });
	}

	function handleFormatChange(format: Format | 'all') {
		currentFormat = format;
		updateURL();
	}

	function toggleCollection(collection: Collection) {
		if (currentCollections.includes(collection)) {
			currentCollections = currentCollections.filter((c) => c !== collection);
		} else {
			currentCollections = [...currentCollections, collection];
		}
		updateURL();
	}

	function toggleTopic(topic: Topic) {
		if (currentTopics.includes(topic)) {
			currentTopics = currentTopics.filter((t) => t !== topic);
		} else {
			currentTopics = [...currentTopics, topic];
		}
		updateURL();
	}

	function clearAll() {
		currentCollections = [];
		currentTopics = [];
		currentFormat = 'all';
		updateURL();
	}

	// Handle click outside to close overlay
	function handleClickOutside(event: MouseEvent) {
		if (filterOpen && !(event.target as Element)?.closest('.filter-button-container')) {
			filterOpen = false;
		}
	}

	// Handle ESC key to close overlay
	function handleEscKey(event: KeyboardEvent) {
		if (event.key === 'Escape' && filterOpen) {
			filterOpen = false;
		}
	}

	// Add/remove event listeners when overlay opens/closes
	$effect(() => {
		if (typeof window !== 'undefined') {
			if (filterOpen) {
				document.addEventListener('click', handleClickOutside);
				document.addEventListener('keydown', handleEscKey);
			} else {
				document.removeEventListener('click', handleClickOutside);
				document.removeEventListener('keydown', handleEscKey);
			}

			return () => {
				document.removeEventListener('click', handleClickOutside);
				document.removeEventListener('keydown', handleEscKey);
			};
		}
	});
</script>

<h1>Fieldnotes</h1>
<div class="header-with-filter">
	<h2>
		<button
			class="word"
			class:active={currentFormat === 'all'}
			onclick={() => handleFormatChange('all')}
		>
			All
		</button>
		<button
			class="word"
			class:active={currentFormat === 'Essay'}
			onclick={() => handleFormatChange('Essay')}
		>
			essays</button
		>,
		<button
			class="word"
			class:active={currentFormat === 'Experiment'}
			onclick={() => handleFormatChange('Experiment')}
		>
			experiments
		</button>
		and
		<button
			class="word"
			class:active={currentFormat === 'Note'}
			onclick={() => handleFormatChange('Note')}
		>
			notes
		</button>.
	</h2>

	<div class="filter-button-container">
		<button
			class="filter-button"
			class:active={hasActiveFilters}
			onclick={() => (filterOpen = !filterOpen)}
			aria-expanded={filterOpen}
			aria-label="Toggle content filters"
		>
			<NewIcon name="filter" size="sm" />
			<!-- {filterButtonText()} -->
		</button>

		<!-- Filter Overlay -->
		{#if filterOpen}
			<div class="filter-overlay">
				<div class="filter-panel" role="dialog" aria-modal="true" aria-labelledby="filter-title">
					<!-- Header Section -->
					<div class="filter-header">
						<h3 class="filter-title" id="filter-title">Filter Fieldnotes</h3>
						<p class="filter-subtitle">Choose collections and topics to narrow your view</p>

						<button
							class="close-button"
							onclick={() => (filterOpen = false)}
							aria-label="Close filter"
						>
							<svg
								width="16"
								height="16"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								stroke-width="2"
							>
								<line x1="18" y1="6" x2="6" y2="18"></line>
								<line x1="6" y1="6" x2="18" y2="18"></line>
							</svg>
						</button>
					</div>

					<!-- Filter Content -->
					<div class="filter-content">
						<!-- Collections Section -->
						<div class="filter-section">
							<h4 class="section-title">Collections</h4>
							<div class="options-grid">
								{#each COLLECTIONS as collection}
									<button
										class="option-button"
										class:selected={currentCollections.includes(collection)}
										onclick={() => toggleCollection(collection)}
										aria-pressed={currentCollections.includes(collection)}
									>
										<span class="option-indicator">
											{#if currentCollections.includes(collection)}
												<svg
													width="12"
													height="12"
													viewBox="0 0 24 24"
													fill="none"
													stroke="currentColor"
													stroke-width="3"
												>
													<polyline points="20,6 9,17 4,12"></polyline>
												</svg>
											{/if}
										</span>
										<span class="option-text">{collection}</span>
									</button>
								{/each}
							</div>
						</div>

						<!-- Topics Section -->
						<div class="filter-section">
							<h4 class="section-title">Topics</h4>
							<div class="options-grid">
								{#each TOPICS as topic}
									<button
										class="option-button"
										class:selected={currentTopics.includes(topic)}
										onclick={() => toggleTopic(topic)}
										aria-pressed={currentTopics.includes(topic)}
									>
										<span class="option-indicator">
											{#if currentTopics.includes(topic)}
												<svg
													width="12"
													height="12"
													viewBox="0 0 24 24"
													fill="none"
													stroke="currentColor"
													stroke-width="3"
												>
													<polyline points="20,6 9,17 4,12"></polyline>
												</svg>
											{/if}
										</span>
										<span class="option-text">{topic}</span>
									</button>
								{/each}
							</div>
						</div>

						<!-- Clear All Section -->
						{#if currentCollections.length > 0 || currentTopics.length > 0}
							<div class="clear-section">
								<button class="clear-all-button" onclick={clearAll}> Clear all filters </button>
							</div>
						{/if}
					</div>
				</div>
			</div>
		{/if}
	</div>
</div>

<style>
	.header-with-filter {
		display: flex;
		align-items: flex-start;
		justify-content: space-between;
		margin-bottom: 3rem;
		gap: 2rem;
	}

	h2 {
		margin: 0;
		flex: 1;
	}

	.filter-button-container {
		position: relative;
		flex-shrink: 0;
		align-self: flex-end;
	}

	.filter-button {
		display: inline-flex;
		width: 2.35rem;
		height: 2.35rem;
		align-items: center;
		justify-content: center;
		padding: 0.25rem 0.4rem;
		background: transparent;
		border: 0.185rem solid var(--color-lilac);
		border-radius: 50%;
		color: var(--color-tan);
		cursor: pointer;
		transition: all var(--transition-duration-x2) ease-out;
		transform: translateY(0.1rem);
	}

	.filter-button :global(svg) {
		fill: rgba(214, 210, 189, 0.3);
	}

	.filter-button:hover {
		border-color: var(--color-scarlet);
		color: var(--color-yellow);
		transform: translateY(0.1rem) scale(1.025);
	}

	.filter-button.active {
		border-color: var(--color-scarlet);
		color: var(--color-scarlet);
		background: rgba(255, 48, 3, 0.1);
	}

	.filter-button.active:hover {
		border-color: var(--color-yellow);
		color: var(--color-yellow);
		background: rgba(250, 215, 20, 0.1);
	}

	.filter-overlay {
		position: absolute;
		top: -1.5rem;
		right: -1.5rem;
		z-index: 1000;
	}

	.word {
		position: relative;
		padding: 0;
		background: none;
		border: none;
		color: inherit;
		cursor: pointer;
		transition: color 200ms ease-out;
	}

	.word::after {
		content: '';
		position: absolute;
		bottom: -0.125rem;
		left: 0;
		width: 100%;
		height: 0.185rem;
		background-color: var(--color-scarlet);
		border-radius: 1rem;
		opacity: 0;
		transform: translateY(0.25rem);
		transition:
			opacity 200ms ease-out,
			transform 200ms ease-out;
	}

	.word:hover::after,
	.word.active::after {
		opacity: 1;
		transform: translateY(0);
	}

	/* Filter Panel */
	.filter-panel {
		background: #000000;
		border: 1px solid rgba(255, 255, 255, 0.2);
		border-radius: 8px;
		box-shadow: 0 4px 16px rgba(0, 0, 0, 0.3);
		min-width: 500px;
		max-width: 600px;
		animation: slideIn 200ms ease-out;
	}

	@keyframes slideIn {
		from {
			opacity: 0;
			transform: translateY(-8px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	/* Header Section */
	.filter-header {
		position: relative;
		padding: 1.5rem 2rem 1rem;
		border-bottom: 1px solid rgba(255, 255, 255, 0.1);
	}

	.filter-title {
		margin: 0 0 0.5rem 0;
		font-size: 1.25rem;
		font-weight: 600;
		color: var(--color-yellow);
		letter-spacing: -0.025em;
	}

	.filter-subtitle {
		margin: 0;
		font-size: 0.875rem;
		color: rgba(255, 255, 255, 0.7);
		line-height: 1.4;
	}

	.close-button {
		position: absolute;
		top: 1.5rem;
		right: 1.5rem;
		display: flex;
		align-items: center;
		justify-content: center;
		width: 32px;
		height: 32px;
		padding: 0;
		background: transparent;
		border: 1px solid rgba(255, 255, 255, 0.2);
		border-radius: 6px;
		color: rgba(255, 255, 255, 0.7);
		cursor: pointer;
		transition: all 200ms ease-out;
	}

	.close-button:hover {
		border-color: var(--color-scarlet);
		color: var(--color-scarlet);
		background: rgba(255, 48, 3, 0.1);
	}

	/* Filter Content */
	.filter-content {
		padding: 1.5rem 2rem 2rem;
	}

	.filter-section {
		margin-bottom: 2rem;
	}

	.filter-section:last-child {
		margin-bottom: 0;
	}

	.section-title {
		margin: 0 0 1rem 0;
		font-size: 0.875rem;
		font-weight: 500;
		color: var(--color-tan);
		text-transform: uppercase;
		letter-spacing: 0.05em;
	}

	/* Options Grid */
	.options-grid {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 0.75rem;
	}

	.option-button {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		padding: 0.75rem 1rem;
		background: rgba(255, 255, 255, 0.03);
		border: 1px solid rgba(255, 255, 255, 0.1);
		border-radius: 6px;
		color: var(--color-tan);
		font-size: 0.875rem;
		font-family: inherit;
		text-align: left;
		cursor: pointer;
		transition: all 200ms ease-out;
		min-height: 44px;
	}

	.option-button:hover {
		border-color: var(--color-yellow);
		background: rgba(250, 215, 20, 0.05);
		color: var(--color-yellow);
	}

	.option-button.selected {
		border-color: var(--color-yellow);
		background: rgba(250, 215, 20, 0.1);
		color: var(--color-yellow);
	}

	.option-button.selected:hover {
		border-color: var(--color-scarlet);
		background: rgba(255, 48, 3, 0.1);
		color: var(--color-scarlet);
	}

	.option-indicator {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 16px;
		height: 16px;
		border: 1px solid rgba(255, 255, 255, 0.3);
		border-radius: 3px;
		flex-shrink: 0;
		transition: all 200ms ease-out;
	}

	.option-button:hover .option-indicator {
		border-color: var(--color-yellow);
	}

	.option-button.selected .option-indicator {
		border-color: var(--color-yellow);
		background: var(--color-yellow);
		color: #000000;
	}

	.option-button.selected:hover .option-indicator {
		border-color: var(--color-scarlet);
		background: var(--color-scarlet);
		color: white;
	}

	.option-text {
		flex: 1;
		font-weight: 500;
	}

	/* Clear Section */
	.clear-section {
		margin-top: 2rem;
		padding-top: 1.5rem;
		border-top: 1px solid rgba(255, 255, 255, 0.1);
	}

	.clear-all-button {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.5rem 1rem;
		background: transparent;
		border: 1px solid rgba(255, 255, 255, 0.2);
		border-radius: 6px;
		color: rgba(255, 255, 255, 0.7);
		font-size: 0.875rem;
		font-family: inherit;
		cursor: pointer;
		transition: all 200ms ease-out;
	}

	.clear-all-button:hover {
		border-color: var(--color-scarlet);
		color: var(--color-scarlet);
		background: rgba(255, 48, 3, 0.1);
	}

	/* Mobile: Stack vertically, show filter button */
	@media (max-width: 767px) {
		.header-with-filter {
			flex-direction: column;
			gap: 1rem;
		}

		.filter-overlay {
			/* Full-screen modal on mobile */
			position: fixed;
			top: 0;
			left: 0;
			right: 0;
			bottom: 0;
			z-index: 1000;
			padding: 1rem;
			background: rgba(0, 0, 0, 0.8);
			backdrop-filter: blur(4px);
		}

		.filter-panel {
			width: 100%;
			height: 100%;
			max-width: none;
			min-width: 0;
			border-radius: 0;
			border: none;
			box-shadow: none;
			display: flex;
			flex-direction: column;
		}

		.filter-header {
			padding: 2rem 1.5rem 1.5rem;
			flex-shrink: 0;
		}

		.filter-content {
			flex: 1;
			padding: 0 1.5rem 2rem;
			overflow-y: auto;
		}

		.options-grid {
			grid-template-columns: 1fr;
			gap: 1rem;
		}

		.option-button {
			padding: 1rem;
			min-height: 56px;
			font-size: 1rem;
		}

		.close-button {
			top: 2rem;
			right: 1.5rem;
			width: 40px;
			height: 40px;
		}
	}
</style>

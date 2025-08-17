<script lang="ts">
	import '$lib/styles/reset.css';
	import '$lib/styles/global.css';
	import SlideInArticle from '$lib/components/SlideInArticle.svelte';

	let { children } = $props();
</script>

{@render children?.()}

<!-- Global slide-in component -->
<SlideInArticle />

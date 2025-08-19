<script lang="ts">
	interface Props {
		size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
		filled?: boolean;
		background?: string;
		class?: string;
		children?: any;
	}

	let {
		size = 'sm',
		filled = false,
		background,
		class: className = '',
		children
	}: Props = $props();
</script>

<div
	class="squircle {className}"
	class:filled
	style="--squircle-size: var(--icon-{size}); {background ? `--bg-color: ${background};` : ''}"
>
	{@render children()}
</div>

<style>
	.squircle {
		position: relative;
		width: var(--squircle-size);
		height: var(--squircle-size);
		display: inline-flex;
		align-items: center;
		justify-content: center;
	}

	.squircle::before {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: var(--color-green);
		/* Use the proper squircle SVG as a mask */
		mask: url('/squircle.svg') center/100% 100% no-repeat;
		-webkit-mask: url('/squircle.svg') center/100% 100% no-repeat;
	}

	.squircle.filled::before {
		background: currentColor;
		transition: background 200ms ease-out;
	}

	.squircle[style*='--bg-color']::before {
		background: var(--bg-color);
	}

	.squircle > :global(*) {
		position: relative;
		z-index: 1;
	}

	/* Ensure icon colors are inherited properly */
	.squircle :global(svg) {
		color: inherit;
	}

	.squircle :global(svg path) {
		fill: currentColor;
		transition: fill 200ms ease-out;
	}
</style>

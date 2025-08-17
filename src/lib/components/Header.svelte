<script>
  import Logo from './Logo.svelte';
</script>

<header>
  <div class="container">
    <a href="/" class="logo-link">
      <Logo />
    </a>
    <a href="/information" class="info button small">Info</a>

    <nav>
      <ul>
        <li>
          <!-- Future navigation items can go here -->
        </li>
      </ul>
    </nav>
  </div>
</header>

<style>
  header {
    margin-bottom: 1.25rem;
  }

  .container {
    display: flex;
    gap: 0.5rem;
    padding-top: 2rem;
  }

  .logo-link :global(.logo) {
    width: 14rem;
    transform: translateX(-2.55rem);
  }

  .info {
    position: relative;
    top: 6.75rem;
    left: -4.25rem;
    z-index: 10;
  }

  nav {
    margin-left: auto;
  }

  nav ul {
    display: flex;
    gap: var(--gap-nav, 1rem);
  }

  nav li {
    line-height: 1em;
  }
</style>
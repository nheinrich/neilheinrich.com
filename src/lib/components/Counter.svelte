<script>
  let count = $state(0);
  
  function increment() {
    count += 1;
  }
  
  function decrement() {
    count -= 1;
  }
  
  function reset() {
    count = 0;
  }
</script>

<div class="counter">
  <h3>Interactive Counter</h3>
  <div class="counter-display">
    <span class="count">{count}</span>
  </div>
  <div class="counter-controls">
    <button onclick={decrement} disabled={count <= 0}>-</button>
    <button onclick={reset}>Reset</button>
    <button onclick={increment}>+</button>
  </div>
</div>

<style>
  .counter {
    padding: 2rem;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 0.5rem;
    text-align: center;
    margin: 2rem 0;
    border: 2px solid var(--color-yellow);
  }
  
  .counter h3 {
    color: var(--color-yellow);
    margin-bottom: 1rem;
    font-size: var(--font-size-subheading);
  }
  
  .counter-display {
    margin-bottom: 1.5rem;
  }
  
  .count {
    font-size: 3rem;
    font-weight: var(--font-weight-bold);
    color: var(--color-cream);
    font-family: 'Söhne Mono', monospace;
  }
  
  .counter-controls {
    display: flex;
    gap: 1rem;
    justify-content: center;
    align-items: center;
  }
  
  .counter-controls button {
    width: 3rem;
    height: 3rem;
    border: 2px solid var(--color-tan);
    background: transparent;
    color: var(--color-tan);
    font-size: 1.5rem;
    font-weight: var(--font-weight-bold);
    border-radius: 0.25rem;
    cursor: pointer;
    transition: all var(--transition-duration) ease-out;
  }
  
  .counter-controls button:hover:not(:disabled) {
    border-color: var(--color-yellow);
    color: var(--color-yellow);
    transform: translateY(-2px);
  }
  
  .counter-controls button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  
  .counter-controls button:focus {
    outline: 2px solid var(--color-yellow);
    outline-offset: 2px;
  }
</style>
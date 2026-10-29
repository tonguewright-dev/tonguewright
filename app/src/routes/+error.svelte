<script lang="ts">
  import { resolve } from '$app/paths';

  let { error } = $props();
</script>

<h1>{error.message}</h1>

<a class="btn font-bold btn-primary" href={resolve('/')}>Return to homepage</a>

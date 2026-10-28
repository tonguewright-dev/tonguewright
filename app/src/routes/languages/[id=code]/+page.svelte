<script lang="ts">
  import { languages } from '#lib/stores.ts';
  import { resolve } from '$app/paths';
  import { page } from '$app/state';
</script>

<div class="breadcrumbs text-sm">
  <ul>
    <li><a href={resolve('/')}>Languages</a></li>
    <li>{$languages.find((l) => l.id === page.params.id)?.name}</li>
  </ul>
</div>

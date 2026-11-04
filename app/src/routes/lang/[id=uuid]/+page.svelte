<script lang="ts">
  import { UUIDv72Base64Url } from '#lib/validation/uuid.ts';
  import { goto } from '$app/navigation';
  import { resolve } from '$app/paths';
  import { page } from '$app/state';
  import { onMount } from 'svelte';

  onMount(() => goto(resolve('/lang/[id=uuid]/about', { id: UUIDv72Base64Url(page.params.id!) })));
</script>

<span class="loading loading-spinner"></span>

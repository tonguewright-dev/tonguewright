<script lang="ts">
  import Icon from '#lib/icons/Icon.svelte';
  import { Icons } from '#lib/icons/index.ts';
  import { languages } from '#lib/stores.ts';
  import { UUIDv72Base64Url } from '#lib/validation/uuid.ts';
  import { resolve } from '$app/paths';
</script>

<div class="breadcrumbs text-sm">
  <ul>
    <li class="font-bold">Languages</li>
  </ul>
</div>

{#snippet create()}
  <a class="btn font-bold btn-primary" href={resolve('/languages/new')}
    ><Icon icon={Icons.CreateLanguage} width={20} />Create a Language</a
  >
{/snippet}

{#if $languages.size}
  {@render create()}
  <ul>
    {#each $languages.values() as lang (lang.id)}
      <li>
        <a href={resolve('/languages/[id=uuid]', { id: UUIDv72Base64Url(lang.id) })}>{lang.name}</a>
      </li>
    {/each}
  </ul>
{:else}
  <p>You haven't created any languages yet.</p>
  {@render create()}
{/if}

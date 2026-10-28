<script lang="ts">
  import Icon from '#lib/icons/Icon.svelte';
  import { Icons } from '#lib/icons/index.ts';
  import { languages } from '#lib/stores.ts';
  import { resolve } from '$app/paths';
</script>

<div class="breadcrumbs text-sm">
  <ul>
    <li>Languages</li>
  </ul>
</div>

{#snippet create()}
  <a class="btn font-bold btn-primary" href={resolve('/languages/new')}
    ><Icon icon={Icons.CreateLanguage} width={20} />Create a Language</a
  >
{/snippet}

{#if $languages?.length}
  {@render create()}
  <ul>
    {#each $languages as lang (lang.id)}
      <li>
        <a href={resolve('/languages/[id=code]', { id: lang.code || lang.id })}>{lang.name}</a>
      </li>
    {/each}
  </ul>
{:else}
  <p>You haven't created any languages yet.</p>
  {@render create()}
{/if}

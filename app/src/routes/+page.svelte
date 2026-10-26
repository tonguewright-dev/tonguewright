<script lang="ts">
  import { languages } from '#lib/stores.ts';
  import { resolve } from '$app/paths';
</script>

<h1>Home</h1>

{#if $languages?.length}
  <ul>
    {#each $languages as lang (lang.id)}
      <li>
        <a href={resolve('/languages/[id=code]', { id: lang.code || lang.id })}>{lang.name}</a>
      </li>
    {/each}
  </ul>
{:else}
  <p>You haven't created any languages yet.</p>
  <a class="btn font-bold btn-primary" href={resolve('/languages/new')}>Create a Language</a>
{/if}

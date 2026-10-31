<script lang="ts">
  import Icon from '#lib/icons/Icon.svelte';
  import { Icons } from '#lib/icons/index.ts';
  import { languages, preferences } from '#lib/stores.ts';
  import { UUIDv72Base64Url } from '#lib/validation/uuid.ts';
  import { resolve } from '$app/paths';

  let view = $state($preferences.languageView ?? 'list');
  $effect(() => {
    $preferences.languageView = view;
  });
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
  <div class="flex flex-row">
    {@render create()}
    <div class="grow"></div>
    <div class="join self-end">
      <label
        class="btn join-item btn-square btn-sm"
        class:bg-accent={view === 'list'}
        aria-label="List"
      >
        <Icon icon={Icons.ViewList} width={20} />
        <input type="radio" name="view" value="list" class="hidden" bind:group={view} />
      </label>
      <label
        class="btn join-item btn-square btn-sm"
        class:bg-accent={view === 'grid'}
        aria-label="Grid"
      >
        <Icon icon={Icons.ViewGrid} width={20} />
        <input type="radio" name="view" value="grid" class="hidden" bind:group={view} />
      </label>
    </div>
  </div>
  <hr class="mt-4 mb-2" />
  {#if view === 'list'}
    <ul class="list rounded-box bg-base-100 shadow-md">
      {#each $languages.values() as lang (lang.id)}
        <li class="list-row">
          <div>
            <a href={resolve('/languages/[id=uuid]', { id: UUIDv72Base64Url(lang.id) })}
              >{lang.name}</a
            >
            {#if lang.code}
              <div class="text-xs font-semibold uppercase opacity-60">{lang.code}</div>
            {/if}
          </div>
        </li>
      {/each}
    </ul>
  {:else if view === 'grid'}
    <div class="grid grid-cols-1 gap-2 md:grid-cols-2">
      {#each $languages.values() as lang (lang.id)}
        <div class="rounded-md border border-base-content/20 p-2 shadow">
          <a href={resolve('/languages/[id=uuid]', { id: UUIDv72Base64Url(lang.id) })}
            >{lang.name}</a
          >
          {#if lang.code}
            <div class="text-xs font-semibold uppercase opacity-60">{lang.code}</div>
          {/if}
        </div>
      {/each}
    </div>
  {/if}
{:else}
  <p>You haven't created any languages yet.</p>
  {@render create()}
{/if}

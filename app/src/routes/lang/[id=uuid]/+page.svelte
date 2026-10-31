<script lang="ts">
  import type { PageData } from './$types';
  import { langTree, languages } from '#lib/stores.ts';
  import Markdown from '#lib/components/Markdown.svelte';
  import { resolve } from '$app/paths';
  import { UUIDv72Base64Url } from '#lib/validation/uuid.ts';

  interface Props {
    data: PageData;
  }

  const { data }: Props = $props();

  const descendants = $derived(
    Array.from($langTree.get(data.language.id!)?.direct ?? [])
      .map((id) => $languages.get(id))
      .filter((l) => !!l)
  );
</script>

<div class="breadcrumbs text-sm">
  <ul>
    <li><a href={resolve('/')}>Languages</a></li>
    <li class="font-bold">{data.language.name}</li>
  </ul>
</div>

<h1 class="mb-0">
  {data.language.name}
</h1>
{#if data.language.code}({data.language.code}){/if}
{#if data.language.ancestorId}
  <h3 class="mt-0">Ancestor</h3>
  <a
    class="btn font-bold btn-secondary"
    href={resolve('/lang/[id=uuid]', { id: UUIDv72Base64Url(data.language.ancestorId) })}
  >
    {$languages.get(data.language.ancestorId)?.name}
  </a>
{/if}
{#if descendants.length}
  <h3 class="mt-2">Descendants</h3>
  <div class="mb-2 flex flex-row flex-wrap gap-1">
    {#each descendants as desc (desc.id)}
      <a
        class="btn font-bold btn-secondary"
        href={resolve('/lang/[id=uuid]', { id: UUIDv72Base64Url(desc.id) })}>{desc.name}</a
      >
    {/each}
  </div>
{/if}
<h3 class="mt-0">Description</h3>
<Markdown label="" bind:value={data.language.description} mode="readonly" />

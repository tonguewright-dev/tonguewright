<script lang="ts">
  import type { PageData } from './$types';
  import { langTree, languages, languageTab } from '#lib/stores.ts';
  import Markdown from '#lib/components/Markdown.svelte';
  import { resolve } from '$app/paths';
  import { UUIDv72Base64Url } from '#lib/validation/uuid.ts';
  import { Icons } from '#lib/icons/index.ts';
  import Icon from '#lib/icons/Icon.svelte';
  import { page } from '$app/state';

  interface Props {
    data: PageData;
  }

  const { data }: Props = $props();

  const descendants = $derived(
    Array.from($langTree.get(data.language.id!)?.direct ?? [])
      .map((id) => $languages.get(id))
      .filter((l) => !!l)
  );

  $languageTab = 'about';
</script>

<div class="flex flex-col">
  <div class="flex flex-row">
    <h1 class="mb-0">
      {data.language.name}
    </h1>
    <a
      class="btn m-1 font-bold btn-primary btn-sm"
      href={resolve('/lang/[id=uuid]/about/edit', { id: UUIDv72Base64Url(page.params.id!) })}
    >
      <Icon icon={Icons.Edit} width={20} />
      Edit
    </a>
  </div>
  {#if data.language.code}
    <span><b>Code</b>: {data.language.code}</span>
  {/if}
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
  <Markdown label="" value={data.language.description} mode="readonly" />
</div>

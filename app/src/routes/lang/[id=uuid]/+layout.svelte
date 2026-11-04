<script lang="ts">
  import { resolve } from '$app/paths';
  import type { Snippet } from 'svelte';
  import type { PageData } from './$types';
  import { page } from '$app/state';
  import { languageTab, type LanguageTab } from '#lib/stores.ts';
  import { UUIDv72Base64Url } from '#lib/validation/uuid.ts';
  import { Icons, type IconType } from '#lib/icons/index.ts';
  import Icon from '#lib/icons/Icon.svelte';

  interface Props {
    children?: Snippet;
    data: PageData;
  }

  let { children, data }: Props = $props();

  const tabs: { key: LanguageTab; title: string; icon: IconType; pending?: boolean }[] = [
    { key: 'about', title: 'About', icon: Icons.About },
    { key: 'phon', title: 'Phonology', icon: Icons.Phonology, pending: true },
    { key: 'lex', title: 'Lexicon', icon: Icons.Lexicon, pending: true },
    { key: 'grammar', title: 'Grammar', icon: Icons.Grammar, pending: true },
    { key: 'text', title: 'Texts', icon: Icons.Texts, pending: true }
  ];

  const currentTab = $derived(tabs.find((t) => t.key === $languageTab));
</script>

<div class="breadcrumbs text-sm">
  <ul>
    <li><a href={resolve('/')}>Languages</a></li>
    <li class="font-bold">{data.language.name}</li>
    <li>
      <span class="font-bold italic">{currentTab?.title}</span>
      {#if currentTab?.pending}
        <span class="ml-1 badge badge-sm badge-warning">Coming Soon</span>
      {/if}
    </li>
  </ul>
</div>

<div role="tablist" class="tabs tabs-lift mb-1 w-full">
  {#each tabs as tab (tab.key)}
    <a
      role="tab"
      class={[
        'tab font-semibold no-underline',
        tab.key === $languageTab && 'tab-active',
        tab.pending && 'text-base-content/50 italic'
      ]}
      href={resolve(`/lang/[id=uuid]/${tab.key}`, { id: UUIDv72Base64Url(page.params.id!) })}
    >
      <Icon icon={tab.icon} width={18} class="mr-1" />
      {tab.title}
    </a>
  {/each}
</div>

{@render children?.()}

<style>
  @media (hover: hover) {
    .tab:hover:not(.tab-active) {
      background-color: color-mix(
        in oklab,
        var(--color-accent) /* var(--color-accent) */ 50%,
        transparent
      );
    }
  }
  .tab-active {
    --tab-bg: var(--color-accent);
  }
</style>

<script lang="ts">
  import './layout.css';
  import favicon from '#lib/assets/favicon.svg';
  import type { LayoutProps } from './$types';
  import { resolve } from '$app/paths';
  import Icon from '#lib/icons/Icon.svelte';
  import { Icons } from '#lib/icons/index.ts';

  let { children }: LayoutProps = $props();

  const currentYear = new Date().getFullYear();
</script>

<svelte:head>
  <link rel="icon" href={favicon} />
</svelte:head>

<div class="flex h-screen flex-col">
  <nav class="navbar bg-primary text-primary-content shadow-sm">
    <a
      class="btn btn-ghost text-xl text-primary-content hover:text-base-content"
      href={resolve('/')}>tonguewright</a
    >
  </nav>
  <div class="m-2 grow">
    {@render children()}
  </div>
  <footer class="flex flex-row items-center bg-neutral p-4 text-neutral-content">
    <aside class="inline-block grow items-center">
      <p>
        © Aidan E. Jones 2026{#if currentYear > 2026}&ndash;{currentYear}{/if}
      </p>
    </aside>
    <nav class="flex flex-row gap-4">
      <a
        class="btn btn-ghost btn-sm hover:bg-secondary"
        href="https://github.com/tonguewright-dev/tonguewright"
      >
        <Icon icon={Icons.GitHub} width={24} />
        GitHub
      </a>
      <a class="btn btn-ghost btn-sm hover:bg-secondary" href="https://discord.gg/6js37gPM3N">
        <Icon icon={Icons.Discord} width={24} />
        Discord
      </a>
    </nav>
  </footer>
</div>

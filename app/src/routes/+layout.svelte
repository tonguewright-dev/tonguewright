<script lang="ts">
  import './layout.css';
  import type { LayoutProps } from './$types';
  import { resolve } from '$app/paths';
  import Icon from '#lib/icons/Icon.svelte';
  import { Icons } from '#lib/icons/index.ts';
  import { version } from '$app/env';
  import { onMount } from 'svelte';
  import { bytesToHumanSize } from '#lib/utils.ts';
  import { isDarkMode, preferences } from '#lib/stores.ts';
  import { afterNavigate } from '$app/navigation';
  import { loadIcons } from '@iconify/svelte';

  let { children }: LayoutProps = $props();

  const currentYear = new Date().getFullYear();

  let drawerOpen: boolean | undefined = $state();

  let storage = $state({
    usage: 0,
    quota: 1
  });

  function estimateStorage() {
    try {
      navigator.storage.estimate().then((estimate) => {
        const { usage = 0, quota = 1 } = estimate;
        storage = {
          usage,
          quota
        };
      });
    } catch (error) {
      console.error(error);
    }
  }

  onMount(() => {
    estimateStorage();
    const interval = setInterval(estimateStorage, 30_000 /* every 30s */);

    return () => clearInterval(interval);
  });

  onMount(() => {
    loadIcons(Object.values(Icons));
  });

  afterNavigate(async () => {
    if ('serviceWorker' in navigator) {
      const registration = await navigator.serviceWorker.getRegistration();
      await registration?.update();
    }
  });
</script>

<div class="drawer h-screen md:drawer-open" data-theme={$isDarkMode ? 'coffee' : 'autumn'}>
  <input id="my-drawer-4" type="checkbox" class="drawer-toggle inline" bind:checked={drawerOpen} />
  <div class="drawer-content flex flex-col overflow-y-auto bg-base-100">
    <nav class="navbar bg-primary text-primary-content shadow-sm">
      <label
        for="my-drawer-4"
        aria-label="open sidebar"
        class="btn btn-square btn-ghost text-primary-content drawer-button hover:text-base-content"
      >
        {#if drawerOpen}
          <Icon icon={Icons.SideClose} width={24} />
        {:else}
          <Icon icon={Icons.SideOpen} width={24} />
        {/if}
      </label>
      <a
        class="btn btn-ghost text-xl text-primary-content hover:text-base-content"
        href={resolve('/')}
      >
        tonguewright
      </a>
      <span class="grow"></span>
      <label class="toggle toggle-secondary">
        <input type="checkbox" bind:checked={$preferences.darkMode} />

        <Icon icon={Icons.UILight} width={12} />

        <Icon icon={Icons.UIDark} width={12} />
      </label>
    </nav>
    <div class="mx-auto my-2 prose w-full max-w-full grow px-2 sm:max-w-xl md:max-w-3xl">
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

  <div class="drawer-side is-drawer-close:overflow-visible">
    <label for="my-drawer-4" aria-label="close sidebar" class="drawer-overlay"></label>
    <div
      class="flex min-h-full flex-col items-start bg-base-200 is-drawer-close:w-14 is-drawer-open:w-48"
    >
      <ul class="menu w-full grow">
        <li>
          <a
            class="is-drawer-close:tooltip is-drawer-close:tooltip-right"
            data-tip="Homepage"
            href={resolve('/')}
          >
            <Icon icon={Icons.Home} width={20} />
            <span class="is-drawer-close:hidden">Home</span>
          </a>
        </li>
        <hr />
        <li>
          <a
            class="is-drawer-close:tooltip is-drawer-close:tooltip-right"
            data-tip="Cloud Storage - Coming Soon"
            href="https://github.com/tonguewright-dev/tonguewright/issues/7"
            target="_blank"
          >
            <Icon icon={Icons.Cloud} width={20} />
            <span class="is-drawer-close:hidden"
              >Cloud Storage<br /><span class="badge badge-sm badge-warning">Coming Soon</span
              ></span
            >
          </a>
        </li>
        <li>
          <a
            class="is-drawer-close:tooltip is-drawer-close:tooltip-right"
            data-tip="Backup & Restore - Coming Soon"
            href="https://github.com/tonguewright-dev/tonguewright/issues/6"
            target="_blank"
          >
            <Icon icon={Icons.BackupRestore} width={20} />
            <span class="is-drawer-close:hidden"
              >Backup & Restore<br /><span class="badge badge-sm badge-warning">Coming Soon</span
              ></span
            >
          </a>
        </li>
      </ul>
      <div class="m-2 rounded-md bg-base-100 p-2 is-drawer-close:hidden is-drawer-open:w-44">
        <p>
          {bytesToHumanSize(storage.usage)} ({((storage.usage / storage.quota) * 100).toFixed(2)}%).
        </p>
        Version: {version.split(';')[0]}
      </div>
    </div>
  </div>
</div>

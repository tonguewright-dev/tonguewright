<!-- TODO: handle image uploads -->
<script lang="ts">
  import 'bytemd/dist/index.css';
  import darkCSS from 'github-markdown-css/github-markdown-dark.css?inline';
  import lightCSS from 'github-markdown-css/github-markdown-light.css?inline';
  import breaks from '@bytemd/plugin-breaks';
  import gemoji from '@bytemd/plugin-gemoji';
  import gfm from '@bytemd/plugin-gfm';
  import mermaid from '@bytemd/plugin-mermaid';
  import { Editor, Viewer } from 'bytemd';
  import { untrack, type Snippet } from 'svelte';
  import type { ClassValue } from 'svelte/elements';
  import IconButton from './IconButton.svelte';
  import { Icons } from '../icons';
  import { isDarkMode } from '#lib/stores.ts';
  interface Props {
    label: string | Snippet;
    class?: ClassValue;
    value?: string;
    maxLength?: number;
    mode?: 'readonly' | 'preview-first' | 'edit';
    editing?: boolean;
  }

  let {
    label,
    class: classes,
    value = $bindable(),
    maxLength,
    mode = 'edit',
    editing = mode === 'edit'
  }: Props = $props();

  const plugins = [breaks(), gemoji(), gfm(), mermaid()];

  const styleElId = 'markdown-style';

  $effect(() => {
    const style = untrack(
      () =>
        document.head.querySelector(`[id="${styleElId}"]`) ||
        document.head.appendChild(document.createElement('style'))
    );
    style.id = styleElId;
    if ($isDarkMode) {
      style.textContent = untrack(() => darkCSS);
    } else {
      style.textContent = untrack(() => lightCSS);
    }
  });
</script>

{#snippet editButton()}
  {#if mode === 'preview-first'}
    <IconButton
      label={editing ? 'Stop editing' : 'Edit'}
      class="btn-accent btn-xs"
      icon={editing ? Icons.EditStop : Icons.Edit}
      onclick={() => (editing = !editing)}
    />
  {/if}
{/snippet}

<div class={['flex w-full flex-col', classes]}>
  <div class="label">
    <span class="fieldset-label">
      {#if typeof label === 'string'}
        {label}
        {@render editButton()}
      {:else}
        {@render label()}
        {@render editButton()}
      {/if}
    </span>
  </div>
  <div class="md-container markdown-body" data-theme={$isDarkMode ? 'dark' : 'light'}>
    {#if mode === 'readonly' || !editing}
      <div class="min-h-48 border border-primary-content p-1">
        <Viewer {value} {plugins} />
      </div>
    {:else if editing}
      <Editor {value} {maxLength} {plugins} on:change={(e) => (value = e.detail.value)} />
    {/if}
  </div>
</div>

<style>
  div.md-container :global(.bytemd) {
    background-color: var(--color-base-100);
    color: var(--color-base-content);
  }

  div.md-container :global(.bytemd-toolbar) {
    background-color: var(--color-base-200);
    color: var(--color-base-content);
  }
  div.md-container :global(.CodeMirror) {
    background: var(--color-base-100);
    color: var(--color-base-content);
  }
  div.md-container :global(.CodeMirror-cursor) {
    border-color: var(--color-base-content);
  }
  div.md-container :global(.CodeMirror-selected) {
    background: var(--color-accent);
  }
  div.md-container :global(.bytemd-preview) {
    /* from github markdown */
    background-color: var(--bgColor-default);
  }
</style>

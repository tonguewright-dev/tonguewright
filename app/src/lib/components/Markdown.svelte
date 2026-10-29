<!-- TODO: handle image uploads -->
<script lang="ts">
  import 'bytemd/dist/index.css';
  import 'github-markdown-css/github-markdown.css';
  import breaks from '@bytemd/plugin-breaks';
  import gemoji from '@bytemd/plugin-gemoji';
  import gfm from '@bytemd/plugin-gfm';
  import mermaid from '@bytemd/plugin-mermaid';
  import { Editor, Viewer } from 'bytemd';
  import type { Snippet } from 'svelte';
  import type { ClassValue } from 'svelte/elements';
  import IconButton from './IconButton.svelte';
  import { Icons } from '../icons';
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
  <div class="md-container markdown-body">
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

<!-- TODO: handle image uploads -->
<script lang="ts">
  import 'bytemd/dist/index.css';
  import 'github-markdown-css/github-markdown.css';
  import breaks from '@bytemd/plugin-breaks';
  import gemoji from '@bytemd/plugin-gemoji';
  import gfm from '@bytemd/plugin-gfm';
  import mermaid from '@bytemd/plugin-mermaid';
  import { Editor } from 'bytemd';
  interface Props {
    value?: string;
    maxLength?: number;
  }

  let { value = $bindable(), maxLength }: Props = $props();

  const plugins = [breaks(), gemoji(), gfm(), mermaid()];
</script>

<div class="md-container markdown-body">
  <Editor {value} {maxLength} {plugins} on:change={(e) => (value = e.detail.value)} />
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

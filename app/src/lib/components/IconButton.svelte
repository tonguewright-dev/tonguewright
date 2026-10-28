<script lang="ts" module>
  export interface IconButtonProps {
    label?: string | Snippet;
    class?: ClassValue;
    form?: string;
    type?: HTMLButtonElement['type'];
    icon?: IconType;
    disabled?: boolean;
    loading?: boolean;
    onclick?: (
      e: MouseEvent & {
        currentTarget: EventTarget & HTMLButtonElement;
      }
    ) => void;
    children?: Snippet;
  }
</script>

<script lang="ts">
  import type { Snippet } from 'svelte';
  import IconContainer from '#lib/icons/Icon.svelte';
  import { type IconType, Icons } from '#lib/icons/index.ts';
  import type { ClassValue } from 'svelte/elements';

  let {
    form,
    type = 'button',
    class: classes,
    icon = Icons.Save,
    disabled = false,
    loading = false,
    label = 'Save',
    onclick,
    children
  }: IconButtonProps = $props();
</script>

<button {type} {form} class={['btn', classes]} disabled={disabled || loading} {onclick}>
  {#if children}
    {@render children()}
  {:else}
    {#if loading}
      <span class="loading loading-spinner"></span>
    {:else}
      <IconContainer {icon} width={20} />
    {/if}

    {#if typeof label === 'string'}
      {label}
    {:else}
      {@render label()}
    {/if}
  {/if}
</button>

<script lang="ts" generics="N extends string | null, I">
  import type { Snippet } from 'svelte';
  import type { ClassValue, HTMLOptionAttributes, HTMLSelectAttributes } from 'svelte/elements';
  import type { IconType } from '#lib/icons/index.ts';
  import IconContainer from '#lib/icons/Icon.svelte';

  interface Props {
    class?: ClassValue;
    items: {
      id: I;
      name: N;
      icon?: IconType;
      attr?: HTMLOptionAttributes;
    }[];
    value: I | null;
    extra?: Snippet;
    attr?: HTMLSelectAttributes;
    icon?: IconType;
  }

  let { class: classes, items, value = $bindable(), extra, attr = {}, icon = '' }: Props = $props();

  const current = $derived(items.find((item) => item.id === value));
</script>

<div class={['select gap-4', classes]}>
  {#if current}
    <IconContainer icon={current.icon || icon} width={20} class="absolute left-0 px-2 opacity-80" />
  {/if}
  <select {...attr} bind:value class:spacing={current}>
    {@render extra?.()}
    {#if !attr.required}
      <option value="">None</option>
    {/if}
    {#each items as item (item.id)}
      <option {...item.attr} value={item.id}>
        <IconContainer icon={item.icon || icon} width={20} class="opacity-80" />
        {item.name}
      </option>
    {/each}
  </select>
</div>

<style>
  .spacing {
    padding-inline-start: calc((0.25rem * 3) + 20px) !important;
  }
</style>

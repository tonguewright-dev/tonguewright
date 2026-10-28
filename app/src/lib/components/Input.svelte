<!--
    @component
    An input slot for a form (stylized)
-->
<script lang="ts" generics="T">
  import IconContainer from '#lib/icons/Icon.svelte';
  import type { Snippet } from 'svelte';
  import type { IconType } from '../icons';
  import type { ClassValue, HTMLInputAttributes } from 'svelte/elements';

  interface Props {
    label: string | Snippet;
    class?: ClassValue;
    children?: Snippet;
    input?: HTMLInputAttributes & {
      class?: ClassValue;
      err?: string;
      icon?: IconType;
      after?: Snippet;
    };
    validate?: boolean;
    value?: T;
  }

  let {
    label,
    class: classes,
    children,
    input,
    value = $bindable(),
    validate = true
  }: Props = $props();
</script>

<label class={['flex w-full flex-col', classes]}>
  <div class="label">
    <span class="fieldset-label">
      {#if typeof label === 'string'}
        {label}
      {:else}
        {@render label()}
      {/if}
    </span>
  </div>
  {#if input}
    <div class={['input w-full', validate && 'validator']}>
      {#if input.icon}
        <IconContainer icon={input.icon} width={20} class="cursor-pointer opacity-80" />
      {/if}
      <input type="text" {...input} bind:value />
      {@render input.after?.()}
    </div>
    {#if validate}
      <span class="validator-hint">
        {#if input.err}{input.err}{:else}&nbsp;{/if}
      </span>
    {/if}
  {:else}
    {@render children?.()}
  {/if}
</label>

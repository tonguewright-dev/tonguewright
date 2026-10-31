<script lang="ts">
  /* eslint-disable svelte/no-navigation-without-resolve */
  import IconContainer from '#lib/icons/Icon.svelte';
  import IconButton, { type IconButtonProps } from './IconButton.svelte';
  import { Icons } from '#lib/icons/index.ts';

  interface Props extends IconButtonProps {
    returnTo?: string;
    resetForm?: boolean;
  }

  let {
    label,
    class: classes,
    icon = Icons.Cancel,
    returnTo: href,
    resetForm = false,
    ...rest
  }: Props = $props();
</script>

{#if !rest.children && href}
  <a class={['btn btn-secondary', classes]} {href}>
    <IconContainer {icon} width={20} />
    {#if typeof label === 'string'}
      {label}
    {:else}
      {@render label?.()}
    {/if}
  </a>
{:else}
  <IconButton
    type={resetForm ? 'reset' : 'button'}
    class={['btn-secondary', classes]}
    {icon}
    {label}
    {...rest}
  />
{/if}

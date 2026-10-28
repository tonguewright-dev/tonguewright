<script lang="ts">
  import IconButton, { type IconButtonProps } from './IconButton.svelte';
  import { Icons } from '#lib/icons/index.ts';

  let { class: classes, icon = Icons.Save, disabled = false, ...rest }: IconButtonProps = $props();
</script>

<IconButton type="submit" class={['btn-primary', classes]} {icon} {disabled} {...rest} />

<script lang="ts">
  import { superForm } from 'sveltekit-superforms';
  import type { PageData } from './$types';
  import { untrack } from 'svelte';
  import Input from '#lib/components/Input.svelte';
  import { Icons } from '#lib/icons/index.ts';
  import SelectWithIcon from '#lib/components/SelectWithIcon.svelte';
  import { langTree, languages } from '#lib/stores.ts';
  import Markdown from '#lib/components/Markdown.svelte';
  import SubmitButton from '#lib/components/SubmitButton.svelte';
  import { db } from '#lib/db/index.ts';
  import { resolve } from '$app/paths';
  import { langCodeRegExp, autoCorrectLanguageCode } from '#lib/validation/langcode.ts';
  import CancelButton from '#lib/components/CancelButton.svelte';
  import { UUIDv72Base64Url } from '#lib/validation/uuid.ts';

  interface Props {
    data: PageData;
  }

  const { data }: Props = $props();

  let loading = $state(false);

  const { form, enhance, tainted } = superForm(
    untrack(() => data.form),
    {
      dataType: 'json',
      resetForm: false,
      onSubmit({ cancel, formElement }) {
        loading = true;
        db.languages.upsert({ ...$form }).then(() => {
          saved = true;
          loading = false;
          Array.from(formElement.elements).forEach((el) => {
            (el as HTMLInputElement).setCustomValidity('');
          });
        });
        cancel();
      }
    }
  );

  let saved = $derived(!Object.values($tainted ?? {}).some(Boolean));

  const candidateAncestors = $derived(
    Array.from($languages.values())
      .filter((l) => $form.id !== l.id && !$langTree.get($form.id!)?.all.has(l.id))
      .map(({ id, name }) => ({ id, name }))
  );
</script>

<div class="breadcrumbs text-sm">
  <ul>
    <li><a href={resolve('/')}>Languages</a></li>
    <li>
      <a href={resolve('/languages/[id=uuid]', { id: UUIDv72Base64Url($form.id) })}>{$form.name}</a>
    </li>
    <li class="font-bold">Edit</li>
  </ul>
</div>

<form method="POST" use:enhance>
  <Input
    label="Name (required)"
    bind:value={$form.name}
    input={{
      type: 'text',
      name: 'name',
      required: true,
      icon: Icons.Name
    }}
  />
  <Input
    bind:value={$form.code}
    input={{
      type: 'text',
      name: 'code',
      icon: Icons.LangCode,
      placeholder: 'art-x-langcode',
      pattern: langCodeRegExp.source,
      oninput: (e) => {
        e.currentTarget.value = autoCorrectLanguageCode(e.currentTarget.value);
      }
    }}
  >
    {#snippet label()}
      Code <a
        href="https://en.wikipedia.org/wiki/Codes_for_constructed_languages"
        class="opacity-70">What is a language code?</a
      >
    {/snippet}
  </Input>
  <Input label="Ancestor">
    <SelectWithIcon
      class="validator select w-full"
      icon={Icons.Ancestor}
      bind:value={$form.ancestorId}
      items={candidateAncestors}
      attr={{ name: 'ancestorId', disabled: !candidateAncestors.length }}
    />
    <span class="validator-hint">&nbsp;</span>
  </Input>
  <Markdown
    label="Description ({$form.description?.length ?? 0}/5000)"
    bind:value={$form.description}
    maxLength={5000}
  />
  <div class="flex justify-end gap-2 pt-2">
    <CancelButton
      label="Go Back"
      returnTo={resolve('/languages/[id=uuid]', { id: UUIDv72Base64Url($form.id) })}
    />
    <SubmitButton
      label="Save Changes"
      {loading}
      disabled={saved || !$form.name}
      icon={Icons.Save}
    />
  </div>
</form>

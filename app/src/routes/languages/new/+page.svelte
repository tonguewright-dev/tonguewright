<script lang="ts">
  import { superForm } from 'sveltekit-superforms';
  import type { PageData } from './$types';
  import { untrack } from 'svelte';
  import Input from '#lib/components/Input.svelte';
  import { Icons } from '#lib/icons/index.ts';
  import SelectWithIcon from '#lib/components/SelectWithIcon.svelte';
  import { languages } from '#lib/stores.ts';
  import Markdown from '#lib/components/Markdown.svelte';
  import SubmitButton from '#lib/components/SubmitButton.svelte';
  import { db } from '#lib/db/index.ts';
  import { uuidv7 } from 'uuidv7';
  import { goto } from '$app/navigation';
  import { resolve } from '$app/paths';
  import { artBCP47RegExp, autoCorrectLanguageCode } from '#lib/validation/langcode.ts';

  interface Props {
    data: PageData;
  }

  const { data }: Props = $props();

  const { form, enhance, tainted, delayed } = superForm(
    untrack(() => data.form),
    {
      dataType: 'json',
      resetForm: false,
      onSubmit({ cancel }) {
        const id = uuidv7();
        db.languages
          .insert({ ...$form, id })
          .then(() => goto(resolve(`/languages/[id=uuid]`, { id })));
        cancel();
      }
    }
  );
</script>

<div class="breadcrumbs text-sm">
  <ul>
    <li><a href={resolve('/')}>Languages</a></li>
    <li class="font-bold">Create a Language</li>
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
      pattern: artBCP47RegExp.source,
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
      items={Array.from($languages.values()).map(({ id, name }) => ({ id, name }))}
      attr={{ name: 'ancestorId', disabled: !$languages.size }}
    />
    <span class="validator-hint">&nbsp;</span>
  </Input>
  <Markdown
    bind:value={$form.description}
    maxLength={5000}
    label="Description ({$form.description?.length ?? 0}/5000)"
  />
  <div class="flex justify-end pt-2">
    <SubmitButton
      label="Create Language"
      loading={$delayed}
      disabled={!$tainted || !$form.name}
      icon={Icons.CreateLanguage}
    />
  </div>
</form>

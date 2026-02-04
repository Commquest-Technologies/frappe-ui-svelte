# Contributing to Svelte UI Frappe

Welcome! We're excited that you're interested in contributing to our Svelte component library.
This guide will walk you through everything you need to know to get started.

## Summary

- [Code of conduct](#code-of-conduct)
- [A large spectrum of contributions](#a-large-spectrum-of-contributions)
- [Your first pull request](#your-first-pull-request)
- [Sending a pull request](#sending-a-pull-request)
  - [How to increase the chances of being accepted](#how-to-increase-the-chances-of-being-accepted)
  - [CI checks and how to fix them](#ci-checks-and-how-to-fix-them)
  - [Coding style](#coding-style)
- [Contributing to the documentation](#contributing-to-the-documentation)
- [License](#license)

## Code of conduct

We have adopted the [Contributor Covenant](https://www.contributor-covenant.org/) as our code of conduct, and we expect project participants to adhere to it.
Please read [the full text](https://github.com/Commquest-Technologies/frappe-ui-svelte/blob/main/.github/CODE_OF_CONDUCT.md) to understand what actions will and will not be tolerated.

## A large spectrum of contributions

There are many ways to contribute to Svelte UI Frappe, and writing code is only one part of the story—documentation improvements can be just as important as code changes.
If you have an idea for an improvement to the code or the docs, we encourage you to open an issue as a first step, to discuss your proposed changes with the maintainers before proceeding.

## Your first pull request

Working on your first pull request? You can learn how in this free video series: [How to Contribute to an Open Source Project on GitHub](https://egghead.io/courses/how-to-contribute-to-an-open-source-project-on-github).

Get started with [good first issues](https://github.com/Commquest-Technologies/frappe-ui-svelte/issues?q=is:open+is:issue+label:"good+first+issue"), which have a limited scope and a working solution that's already been discussed.
This makes them ideal for newer developers, or those who are new to this library and want to see how the contribution process works.

## Sending a pull request

Svelte UI Frappe is a community-driven project, so pull requests are always welcome, but before working on a large change, it's best to open an issue first to discuss it with the maintainers.

When in doubt, keep your pull requests small.
For the best chances of being accepted, don't bundle more than one feature or bug fix per PR.
It's often best to create two smaller PRs rather than one big one.

1. Fork the repository.

2. Clone the fork to your local machine and add the upstream remote:

```bash
git clone https://github.com/<your-username>/frappe-ui-svelte.git
cd frappe-ui-svelte
git remote add upstream https://github.com/Commquest-Technologies/frappe-ui-svelte.git
```

3. Synchronize your local `main` branch with the upstream one:

```bash
git checkout main
git pull upstream main
```

4. Install the dependencies and run the dev server:

```bash
nvm use # To ensure correct node version
npm install
npm run dev
```

5. Create a new topic branch:

```bash
git checkout -b [fix/feat/chore/hotfix]/branch-topic
```

6. Make changes, commit, and push to your fork:

```bash
git push -u origin HEAD
```

7. Go to [the repository](https://github.com/Commquest-Technologies/frappe-ui-svelte) and open a pull request.

The core team actively monitors for new pull requests.
We will review your PR and either merge it, request changes to it, or close it with an explanation.

### How to increase the chances of being accepted

Continuous Integration (CI) automatically runs a series of checks when a PR is opened.
If you're unsure whether your changes will pass, you can always open a PR, and the GitHub UI will display a summary of the results.

Make sure the following is true:

- The branch is targeted at `main` for ongoing development.
- All tests and checks are passing.
- If a feature is being added:
  - If the result was already achievable with the core library, you've explained why this feature needs to be added to the core.
  - If this is a common use case, you've added an example to the Storybook documentation.
- If adding new features or modifying existing ones, you've included tests to confirm the new behavior.
- If props were added or prop types were changed, you've updated the TypeScript declarations.
- The branch is not behind its target branch.
- If you have included a visual component, make sure to add a Storybook story with possible variations.

We will only merge a PR when all checks pass.
The following statements must be true:

- The code is formatted. Run `npm run format`.
- The code is linted. Run `npm run lint`.
- The code is type-safe. Run `npm run check` to confirm that the check passes.
- The pull request title follows the pattern `[Component/Area] Imperative commit message`.

### CI checks and how to fix them

If any of the checks fail, click on the **Details** link and review the logs of the build to find out why it failed.

#### Type Checking

This ensures type safety using the Svelte and TypeScript compiler. Run `npm run check` locally.

#### Linting and Formatting

This ensures code quality and consistent formatting:

- ESLint checks for code style and potential issues
- Prettier ensures consistent code formatting

#### Build

This ensures the package can be built successfully for distribution.

### Coding style

Please follow the coding style of the project.
It uses Prettier and ESLint, so if possible, enable linting in your editor to get real-time feedback.

- `npm run format` reformats the code.
- `npm run lint` runs the linting rules.
- `npm run check` checks TypeScript and Svelte types.

When you submit a PR, these checks are run again by our continuous integration tools, but hopefully your code is already clean!

## Svelte 5 Patterns

This library uses Svelte 5 with runes. Please follow these patterns:

### State Management

```svelte
<script lang="ts">
	// Use $state for reactive state
	let count = $state(0);

	// Use $derived for computed values
	const doubled = $derived(count * 2);

	// Use $props for component props
	let { value = $bindable(), onchange }: Props = $props();
</script>
```

### Snippets (replacing slots)

```svelte
<!-- Component -->
<script lang="ts">
	import type { Snippet } from 'svelte';
	let { header }: { header?: Snippet } = $props();
</script>

<!-- Parent -->
<Component>
	{#snippet header()}
		<h1>Title</h1>
	{/snippet}
</Component>

{#if header}
	{@render header()}
{/if}
```

## Contributing to the documentation

### How to add a new story to Storybook

1. Add a new story file to the component directory:

```bash
src/lib/components/ui/Button.stories.ts
```

2. Write the story code:

```typescript
import type { Meta, StoryObj } from '@storybook/svelte';
import Button from './Button.svelte';

const meta: Meta<typeof Button> = {
	title: 'UI/Button',
	component: Button,
	tags: ['autodocs']
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		label: 'Button'
	}
};
```

3. Test your story:

```bash
npm run storybook
```

## License

By contributing your code to the [Commquest-Technologies/frappe-ui-svelte](https://github.com/Commquest-Technologies/frappe-ui-svelte) GitHub repository, you agree to license your contribution under the [MIT license](/LICENSE).

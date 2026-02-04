# Svelte UI Frappe

[![ESLint](https://img.shields.io/badge/code%20style-eslint-4B32C3?logo=eslint)](#)
[![Prettier](https://img.shields.io/badge/code%20style-prettier-ff69b4?logo=prettier)](#)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](./LICENSE)

A comprehensive Svelte 5 UI component library for Frappe applications, inspired by [frappe-ui](https://github.com/frappe/frappe-ui) and [frappe-ui-react](https://github.com/rtCamp/frappe-ui-react).

## Installation

```bash
npm install svelte-ui-frappe
```

## Setup

### 1. Import the theme CSS

In your app's main CSS file or layout:

```css
@import 'svelte-ui-frappe/theme';
```

Or in your layout.svelte:

```svelte
<script>
	import 'svelte-ui-frappe/theme';
</script>
```

### 2. Configure Tailwind (if using Tailwind)

Add the library to your Tailwind content paths:

```javascript
// tailwind.config.js
export default {
	content: [
		'./src/**/*.{html,js,svelte,ts}',
		'./node_modules/svelte-ui-frappe/dist/**/*.{svelte,js}'
	]
};
```

## Usage

```svelte
<script>
	import { Button, Card, Dialog } from 'svelte-ui-frappe';
</script>

<Card>
	<Button theme="blue" variant="solid">Click me</Button>
</Card>
```

## Components

### UI Components

- Badge, Button, Spinner, LoadingIndicator, LoadingText
- Card, Divider, Progress, CircularProgressBar
- Avatar, FeatherIcon, KeyboardShortcut

### Form Components

- TextInput, TextArea, Password, Select
- Checkbox, Switch, Rating, FormControl

### Feedback Components

- Alert, ErrorMessage

### Navigation Components

- Tabs, TabButtons, Breadcrumbs, Sidebar, Tree

### Overlay Components

- Tooltip, Popover, Dropdown, Dialog, Toast, CommandPalette

### Data Entry Components

- Combobox, AutoComplete, DatePicker, DateRangePicker
- DateTimePicker, FileUploader, TextEditor

### Visualization Components

- ChartWrapper, AxisChart, DonutChart, FunnelChart, NumberChart

## Utilities

The library also exports utility functions:

```svelte
<script>
	import { cn, dayjs, debounce } from 'svelte-ui-frappe';

	// cn - class name utility (clsx wrapper)
	const classes = cn('base-class', condition && 'conditional-class');

	// dayjs - date manipulation
	const formatted = dayjs().format('YYYY-MM-DD');

	// debounce - function debouncing
	const debouncedFn = debounce(() => console.log('debounced'), 300);
</script>
```

## Actions

Svelte actions for common UI patterns:

```svelte
<script>
	import { clickOutside, floating, portal } from 'svelte-ui-frappe';
</script>

<div use:clickOutside={{ handler: close, enabled: isOpen }}>
	<!-- Click outside to close -->
</div>
```

## TypeScript

Full TypeScript support is included. Import types as needed:

```typescript
import type { ButtonTheme, ButtonVariant, FrappeUIConfig } from 'svelte-ui-frappe';
```

## Requirements

- Svelte 5.0.0 or higher
- Node.js 18+

## Development

```bash
# Install dependencies
npm install

# Run dev server
npm run dev

# Type check
npm run check

# Build library
npm run package

# Run Storybook
npm run storybook
```

## License

MIT

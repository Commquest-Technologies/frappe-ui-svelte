# Svelte UI Frappe

A comprehensive Svelte 5 component library built with modern patterns, Tailwind CSS, and full TypeScript support. Designed for building beautiful, accessible, and performant web applications.

## Project Overview

This is a UI component library for Svelte 5 applications, featuring:
- 50+ reusable components across multiple categories
- Full TypeScript support with comprehensive type definitions
- Tailwind CSS styling with CSS custom properties for theming
- Accessible components following ARIA best practices
- Svelte 5 runes for reactive state management

## Tech Stack

- **Framework**: Svelte 5 with SvelteKit
- **Styling**: Tailwind CSS 4 + CSS custom properties
- **Icons**: Lucide Svelte + Feather Icons
- **Charts**: ECharts
- **Positioning**: @floating-ui/dom
- **Toasts**: svelte-sonner
- **Date handling**: Day.js
- **Type checking**: TypeScript

## Project Structure

```
src/lib/
├── index.ts                    # Main exports
├── styles/
│   └── theme.css              # CSS variables (colors, typography, spacing)
├── utils/
│   ├── cn.ts                  # Class name utility (clsx wrapper)
│   ├── dayjs.ts               # Day.js configuration with plugins
│   ├── debounce.ts            # Debounce/throttle utilities
│   ├── config.ts              # App configuration context
│   └── date-picker.ts         # Date picker utilities
├── actions/
│   ├── click-outside.ts       # Click outside detection
│   ├── floating.ts            # Floating UI positioning
│   └── portal.ts              # DOM portal action
├── types/
│   └── index.ts               # All TypeScript type definitions
└── components/
    ├── ui/                    # Basic UI (Badge, Button, Card, etc.)
    ├── forms/                 # Form inputs (TextInput, Select, etc.)
    ├── feedback/              # Alert, ErrorMessage
    ├── overlay/               # Dialog, Dropdown, Popover, Toast, etc.
    ├── navigation/            # Tabs, Breadcrumbs, Sidebar, Tree
    ├── data-entry/            # DatePicker, Combobox, FileUploader, etc.
    └── visualization/         # Charts (Axis, Donut, Funnel, Number)
```

## Components Built

### UI Components (14)
- Badge, Button, Spinner, LoadingIndicator, LoadingText
- Card, Divider, Progress, CircularProgressBar
- Avatar, FeatherIcon, KeyboardShortcut, FormLabel, ErrorMessage

### Form Components (8)
- TextInput, TextArea, Password, Select
- Checkbox, Switch, Rating, FormControl

### Feedback Components (2)
- Alert, ErrorMessage

### Navigation Components (5)
- Tabs, TabButtons, Breadcrumbs, Sidebar, Tree

### Overlay Components (6)
- Tooltip, Popover, Dropdown, Dialog, Toast, CommandPalette

### Data Entry Components (7)
- Combobox, AutoComplete, DatePicker, DateRangePicker
- DateTimePicker, FileUploader, TextEditor

### Visualization Components (5)
- ChartWrapper, AxisChart, DonutChart, FunnelChart, NumberChart

## Components To Build

### High Priority
- **ListView** - Data table with sorting, filtering, pagination
- **Calendar** - Full calendar views (daily, weekly, monthly)
- **GridLayout** - Draggable/resizable grid layout

### Medium Priority
- **ColorPicker** - Color selection with various formats
- **Slider** - Range slider input
- **Stepper** - Multi-step form wizard
- **Pagination** - Page navigation
- **Menu** - Context menu / right-click menu

### Nice to Have
- **Timeline** - Vertical/horizontal timeline
- **Carousel** - Image/content carousel
- **ImageCropper** - Image cropping tool
- **CodeEditor** - Syntax-highlighted code editor
- **RichTextEditor** - Full WYSIWYG editor (replace current stub)

## Svelte 5 Patterns Used

### Runes
```svelte
// State
let count = $state(0);

// Derived values
const doubled = $derived(count * 2);

// Complex derived
const items = $derived.by(() => {
  return data.filter(item => item.active);
});

// Effects
$effect(() => {
  console.log('Count changed:', count);
});

// Props with bindable
let { value = $bindable() }: Props = $props();
```

### Snippets (replacing slots)
```svelte
// Parent
<Component>
  {#snippet header()}
    <h1>Title</h1>
  {/snippet}
</Component>

// Component
<script>
  let { header }: { header?: Snippet } = $props();
</script>

{#if header}
  {@render header()}
{/if}
```

### Actions
```svelte
<div use:clickOutside={{ handler: close, enabled: isOpen }}>
```

## Best Practices

### Component Design
1. **Use $bindable for two-way binding** when parent needs to modify state
2. **Prefer $derived over $effect** for computed values
3. **Keep components focused** - single responsibility
4. **Export types** from component files when needed
5. **Use snippets** for customizable content slots

### Styling
1. **Use CSS custom properties** from theme.css for colors
2. **Use the `cn()` utility** for conditional classes
3. **Follow naming conventions**: `surface-*`, `ink-*`, `outline-*`
4. **Keep component styles scoped** unless global is needed

### TypeScript
1. **Define interfaces** for all component props
2. **Export types** from types/index.ts
3. **Use strict typing** - avoid `any`
4. **Document complex types** with JSDoc comments

### Accessibility
1. **Add ARIA attributes** where appropriate
2. **Support keyboard navigation** (Tab, Enter, Escape, Arrow keys)
3. **Use semantic HTML elements**
4. **Provide labels** for interactive elements

## Common Patterns

### Floating Elements (Dropdown, Popover, Tooltip)
```svelte
<script>
  import { floating } from '$lib/actions/floating.js';
  import { clickOutside } from '$lib/actions/click-outside.js';
  import { portal } from '$lib/actions/portal.js';
</script>

{#if isOpen}
  <div
    use:portal
    use:floating={{ reference: triggerElement, placement: 'bottom-start', offset: 4 }}
    use:clickOutside={{ handler: close, enabled: true }}
  >
    <!-- content -->
  </div>
{/if}
```

### Form Components
```svelte
<script>
  let { value = $bindable(), onchange }: Props = $props();

  function handleChange(e: Event) {
    const newValue = (e.target as HTMLInputElement).value;
    value = newValue;
    onchange?.(newValue);
  }
</script>
```

### Keyboard Navigation
```svelte
function handleKeyDown(e: KeyboardEvent) {
  switch (e.key) {
    case 'Escape':
      close();
      break;
    case 'ArrowDown':
      e.preventDefault();
      focusNext();
      break;
    case 'ArrowUp':
      e.preventDefault();
      focusPrevious();
      break;
    case 'Enter':
      selectCurrent();
      break;
  }
}
```

## Development Commands

```bash
# Install dependencies
npm install

# Run dev server
npm run dev

# Type check
npm run check

# Build library
npm run build

# Run Storybook (if configured)
npm run storybook
```

## Theme Customization

Colors are defined in `src/lib/styles/theme.css` using CSS custom properties:

```css
:root {
  --color-ink-gray-9: #1f2937;
  --color-surface-gray-2: #f3f4f6;
  --color-outline-gray-2: #e5e7eb;
  /* ... */
}

[data-theme="dark"] {
  --color-ink-gray-9: #f9fafb;
  --color-surface-gray-2: #374151;
  /* ... */
}
```

## Improvements Needed

### Code Quality
- [ ] Add comprehensive unit tests with Vitest
- [ ] Add Storybook stories for all components
- [ ] Add JSDoc documentation to all public APIs
- [ ] Implement proper error boundaries

### Accessibility
- [ ] Audit all components with axe-core
- [ ] Add screen reader announcements for dynamic content
- [ ] Ensure proper focus management in modals/dialogs
- [ ] Test with keyboard-only navigation

### Performance
- [ ] Add lazy loading for heavy components (Charts)
- [ ] Implement virtual scrolling for ListView
- [ ] Optimize re-renders with fine-grained reactivity

### Features
- [ ] Add animation/transition utilities
- [ ] Add form validation integration
- [ ] Add i18n support for date/time formatting
- [ ] Add RTL support

### Developer Experience
- [ ] Create component generator script
- [ ] Add VS Code snippets
- [ ] Improve TypeScript inference for snippets
- [ ] Add migration guide from other libraries

## File Naming Conventions

- Components: `PascalCase.svelte` (e.g., `DatePicker.svelte`)
- Utilities: `kebab-case.ts` (e.g., `date-picker.ts`)
- Types: Defined in `types/index.ts` with `PascalCase`
- Actions: `kebab-case.ts` (e.g., `click-outside.ts`)

## Contributing Guidelines

1. Follow existing code patterns and naming conventions
2. Add TypeScript types for all new props/functions
3. Test components manually before committing
4. Keep components accessible by default
5. Update this CLAUDE.md when adding new components or patterns

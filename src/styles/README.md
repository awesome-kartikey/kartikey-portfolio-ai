# Styling Architecture

This directory contains the styling architecture for the Karikey Portfolio project. The approach uses a combination of Tailwind CSS, CSS variables, and CSS modules to create a maintainable and scalable styling system.

## Directory Structure

```
styles/
├── README.md          # This file
├── index.js           # Exports all styling utilities
├── tailwind.css       # Global Tailwind styles and custom utilities
├── theme.js           # Theme configuration (colors, typography, etc.)
└── utils.js           # Reusable Tailwind class combinations
```

## Styling Approach

### 1. Theme Configuration

The `theme.js` file contains all theme variables used throughout the application, including:

- Colors
- Typography
- Spacing
- Border radius
- Shadows
- Transitions
- Z-index

This centralized approach makes it easy to maintain a consistent design language across the application.

### 2. Utility Classes

The `utils.js` file provides reusable Tailwind class combinations for common UI patterns, such as:

- Layout utilities
- Typography utilities
- Component utilities
- Button utilities
- Form utilities
- Flex utilities
- Grid utilities
- Transition utilities
- Text utilities

These utilities help maintain consistency and reduce repetition in the codebase.

### 3. Global Styles

The `tailwind.css` file defines global styles using Tailwind's `@layer` directive:

- **Base Layer**: Defines CSS variables for theming and basic element styles
- **Components Layer**: Defines reusable component classes
- **Utilities Layer**: Defines custom utility classes

### 4. CSS Modules

Component-specific styles are defined using CSS modules, which provide local scoping to prevent style conflicts. For example:

- `chatbot.module.css` for the Chatbot component

## Usage Examples

### Using Theme Variables

```jsx
// Access theme variables in JavaScript
import { themeConfig } from '../styles';

const primaryColor = themeConfig.colors.primary[600];
```

### Using Utility Classes

```jsx
// Import utility classes
import { utils } from '../styles';

// Use in components
function MyComponent() {
  return (
    <div className={utils.container}>
      <h2 className={utils.heading.h2}>Section Title</h2>
      <button className={utils.button.primary}>Click Me</button>
    </div>
  );
}
```

### Using CSS Modules

```jsx
// Import CSS module
import styles from './MyComponent.module.css';

function MyComponent() {
  return (
    <div className={styles.wrapper}>
      <h2 className={styles.title}>Hello World</h2>
    </div>
  );
}
```

## Best Practices

1. **Use the theme system**: Always reference theme variables instead of hardcoding values
2. **Leverage utility classes**: Use the predefined utility classes for consistent styling
3. **Component-specific styles**: Use CSS modules for component-specific styles
4. **Responsive design**: Use Tailwind's responsive prefixes for responsive design
5. **Dark mode**: Use the `dark:` prefix for dark mode styles
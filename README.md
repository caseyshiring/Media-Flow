# MediaFlow

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Tests](https://img.shields.io/badge/tests-passing-brightgreen.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue.svg)
![React](https://img.shields.io/badge/React-18.2-blue.svg)

MediaFlow is a UI for cloud-based media asset management. Provides an elegant interface for post-production teams to manage and collaborate on media assets.

![MediaFlow Demo Screenshot](./docs/screenshot.png)

## Features

- **Blazing-fast media browsing**: Optimized loading and caching strategies
- **Intuitive organization**: Tag-based filtering and smart search
- **Seamless collaboration**: Real-time updates and commenting
- **Modern UI**: Clean, accessible design with dark mode support
- **Performance metrics**: Built-in usage analytics

## Tech Stack

- **Framework**: React 18 with TypeScript
- **Build**: Vite for fast builds and hot module replacement
- **Styling**: Tailwind CSS with custom theme
- **State Management**: React Query for server state, Zustand for UI state
- **Testing**: Vitest and React Testing Library
- **CI/CD**: GitHub Actions

## Architecture

MediaFlow follows a modular, component-based architecture:

- **Component Structure**: Atomic design principles with smart/presentational pattern
- **State Management**: Server state and UI state cleanly separated
- **Code Organization**: Feature-based organization for better maintainability
- **Type Safety**: Strong TypeScript typing throughout the codebase

## 📦 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/cshiring/mediaflow.git
cd mediaflow

# Install dependencies
npm install

# Start the development server
npm run dev
```

### Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run test` - Run tests

## Testing

MediaFlow uses Vitest and React Testing Library for testing:

```bash
# Run all tests
npm run test

# Run tests with coverage report
npm run test:coverage

# Run tests in watch mode
npm run test:watch
```

## Standards

- **Accessibility**: WCAG 2.1 AA standards compliance

## Responsive Design

MediaFlow is designed to work on all device sizes:

- Mobile-first development approach
- Adaptive layouts for different screen sizes
- Touch-friendly UI elements
- Optimized performance on mobile devices

## Security Considerations

- Input validation and sanitization
- Protection against common web vulnerabilities
- Secure authentication patterns
- Environment-based configuration

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

# Property-Guru Website

## Overview

This is a starter template using the following stack:

- Framework - [Next.js 14](https://nextjs.org/14)
- Language - [TypeScript](https://www.typescriptlang.org)
- Styling - [Tailwind CSS](https://tailwindcss.com)
- Linting - [ESLint](https://eslint.org)
- Formatting - [Prettier](https://prettier.io)

This template uses the new Next.js App Router. This includes support for enhanced layouts, colocation of components, tests, and styles, component-level data fetching, and more.

## Getting Started

Before you start, make sure you have 2FA (Two-Factor Authentication) enabled and an SSH key set up.

### Prerequisites

- [nvm](https://github.com/nvm-sh/nvm) (Node Version Manager) - This is required to manage the Node.js version. Checkout this for more information on how to install nvm. Refer this [Link](https://github.com/nvm-sh/nvm?tab=readme-ov-file)

- [yarn](https://yarnpkg.com) - This is required as a global dependency.

YARN AS GLOBAL DEPENDENCY:

```bash
npm install -g yarn
```

### Clone the repository

You can clone the repository using either HTTPS or SSH:

HTTPS:

```bash
git clone https://github.com/Trex-Hub/PropertyGuru-FE
```

SSH:

```bash
git clone https://github.com/Trex-Hub/PropertyGuru-FE
```

### Change directory

Change to the respective directory

Install Node.js version using NVM:

```
nvm install && nvm use
```

Create a new file `.env` copy of `.env.example`

Install dependencies using Yarn:

```
yarn install
```

Start the development server:

```
yarn dev
```

You should now be able to access the application running at PORT 3000 : http://localhost:3000

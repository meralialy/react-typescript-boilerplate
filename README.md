# ⚛️ React Typescript Boilerplate

[![CI/CD Pipeline](https://img.shields.io/github/actions/workflow/status/meralialy/react-typescript-boilerplate/ci.yml?branch=main&style=for-the-badge&logo=githubactions&logoColor=white&label=CI/CD)](https://github.com/meralialy/react-typescript-boilerplate/actions/workflows/ci.yml)
[![Coverage](https://img.shields.io/github/actions/workflow/status/meralialy/react-typescript-boilerplate/ci.yml?branch=main&label=Coverage&style=for-the-badge&logo=vitest&logoColor=white&color=4CAF50)](https://github.com/meralialy/react-typescript-boilerplate/actions/workflows/ci.yml?query=branch%3Amain)

[![React](https://img.shields.io/badge/React-19.2.4-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9.3-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Docker](https://img.shields.io/badge/Docker-Enabled-2496ED?style=for-the-badge&logo=docker&logoColor=white)](https://www.docker.com/)

[![License](https://img.shields.io/badge/License-MIT-607D8B?style=for-the-badge)](https://opensource.org/licenses/MIT)
[![Last Commit](https://img.shields.io/github/last-commit/meralialy/react-typescript-boilerplate?style=for-the-badge&logo=github&logoColor=white&color=D32F2F)](https://github.com/meralialy/react-typescript-boilerplate/commits/main)

### [🔗 Click here to view the Live Demo](https://react-typescript-boilerplate.pages.dev)

## 📱 Preview

![App Screenshot](./assets/website.png)

## 📋 Table of Contents

- [📖 Overview](#-overview)
- [🛠 Tech Stack](#-tech-stack)
- [🚀 Getting Started](#-getting-started)
    - [Prerequisites](#prerequisites)
    - [Installation](#installation)
    - [Run with Docker 🐳](#run-with-docker-)
- [📂 Project Structure](#-project-structure)
- [✨ Code Quality](#-code-quality)
- [🧪 Testing and Code Coverage](#-testing-and-code-coverage)
- [⌨️ Makefile Commands](#️-makefile-commands)
- [🔄 CI/CD](#-cicd)
- [🌐 Internationalization (i18n)](#-internationalization-i18n)
    - [Architecture](#architecture)
    - [Usage in Components](#usage-in-components)
    - [Adding Locales](#adding-locales)
- [🩹 Troubleshooting](#-troubleshooting)
- [📝 License](#-license)

## 📖 Overview

A robust, production-ready boilerplate for React applications using TypeScript, Docker, and a comprehensive CI/CD pipeline.

## 🛠 Tech Stack

- **React** - A JavaScript library for building user interfaces.
- **TypeScript** - Statically typed superset of JavaScript.
- **Node.js** - JavaScript runtime environment for server-side and build tooling.
- **Vite** - Next-generation frontend tooling for development and builds.
- **Vitest** - Fast unit testing framework powered by Vite.
- **Yarn** - Fast, reliable, and secure dependency management.
- **ESLint** - Pluggable linter for identifying and reporting on patterns.
- **Prettier** - Opinionated code formatter for consistent style.
- **Knip** - Detects unused files, dependencies, and exports.
- **Docker** - Containerization for building and running applications.
- **GitHub Actions** - CI/CD automation for linting, testing, and building.

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v24 or higher). We recommend using [nvm](https://github.com/nvm-sh/nvm) (Node Version Manager).
- **Yarn** (Package Manager)
- **Docker** (For containerization)
- **Make** (For running build commands)

### Installation

```bash
git clone https://github.com/meralialy/react-typescript-boilerplate.git
cd react-typescript-boilerplate
make setup
```

### Run with Docker 🐳

Launch the application in a development container. The application will be available at http://localhost:3000.

```bash
make docker-start    # Start containers with development settings
make docker-refresh  # Rebuild and restart all containers (use when .env changes)
make docker-logs     # Follow container logs
make docker-stop     # Stop containers
```

## 📂 Project Structure

The project follows a feature-based structure to keep the codebase organized and scalable.

```text
.
├── .github/              # GitHub Actions workflows for CI/CD
├── public/
│   └── locales/          # Internationalization (i18n) language files
├── src/
│   ├── assets/           # Static assets (images, fonts)
│   ├── components/       # Shared, reusable React components
│   ├── hooks/            # Custom React hooks
│   ├── pages/            # Application pages and routing configuration
│   └── main.tsx          # Main application entry point
├── .nvmrc                # Node.js version specification
├── .prettierrc           # Prettier configuration
├── .yarnrc               # Yarn configuration
├── Dockerfile            # Docker configuration for building the application
├── eslint.config.js      # ESLint configuration
├── knip.json             # Knip configuration
├── Makefile              # Commands for common development tasks
├── package.json          # Project dependencies and scripts
├── tsconfig.json         # TypeScript configuration
├── vite.config.ts        # Vite configuration
├── vitest.config.ts      # Vitest configuration
└── yarn.lock             # Yarn lockfile for deterministic installs
```

## ✨ Code Quality

We enforce high code quality standards using a suite of automated tools. These checks are integrated into the CI/CD pipeline to ensure consistency and maintainability.

- **ESLint**: Catches common issues and enforces coding standards. Run `make lint`.
- **Prettier**: Ensures consistent code formatting across the project. Check formatting with `make format`.
- **Knip**: Detects and removes unused files, dependencies, and exports to keep the codebase clean. Run `make scan`.

## 🧪 Testing and Code Coverage

We use **Vitest** for unit testing.

- **Run Tests:** `make test`
- **Generate Coverage:** `make code-coverage`

## ⌨️ Makefile Commands

Common project tasks are automated via the `Makefile`. Run `make help` to list all available commands.

| Command               | Description                    |
| :-------------------- | :----------------------------- |
| `make setup`          | Full project setup             |
| `make clean`          | Remove .env and cache files    |
| `make lint`           | Check linting errors           |
| `make format`         | Check code formatting          |
| `make test`           | Run all tests                  |
| `make code-coverage`  | Generate code coverage report  |
| `make docker-start`   | Build and start containers     |
| `make docker-refresh` | Rebuild and restart containers |
| `make docker-stop`    | Stop containers                |
| `make docker-logs`    | View container logs            |

## 🔄 CI/CD

The project uses GitHub Actions (`.github/workflows/ci.yml`) to enforce quality on every push:

1.  **Lint and Format:** Runs ESLint, Prettier, and Knip.
2.  **Test and Coverage:** Runs the Vitest suite.
3.  **Build:** Builds the production Docker image.

## 🌐 Internationalization (i18n)

### Architecture

The application is structured to support multiple locales using standard i18n libraries. Translations are stored in JSON files separated by locale.

### Usage in Components

To translate text in your React components, use the `useTranslation` hook:

```tsx
import React from "react";
import { useTranslation } from "react-i18next";

const Home: React.FunctionComponent = () => {
    const { t } = useTranslation();

    return (
        <div>
            <h1>{t("home-page")}</h1>
        </div>
    );
};

export default Home;
```

### Adding Locales

1. Create a new locale file in the translations directory.
2. Register the new locale in the configuration.
3. Add the corresponding translation keys.

## 🩹 Troubleshooting

- **Docker containers stuck?** Run `make docker-reset` to start fresh.
- **Dependency issues?** Run `make clean` followed by `make setup`.

## 📝 License

Distributed under the MIT License. See [LICENSE](./LICENSE) for the full text.

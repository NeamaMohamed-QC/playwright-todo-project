# Playwright ToDo Project

[![Playwright Tests](https://github.com/NeamaMohamed-QC/playwright-todo-project/actions/workflows/main.yml/badge.svg)](https://github.com/NeamaMohamed-QC/playwright-todo-project/actions/workflows/main.yml)

End-to-end (UI + API) test automation framework for a ToDo web application, built with **Playwright** and **TypeScript** using the **Page Object Model (POM)** design pattern, with tests running automatically on every push through **GitHub Actions**.

## Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Test Coverage](#test-coverage)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Running the Tests](#running-the-tests)
- [Test Reports](#test-reports)
- [Continuous Integration](#continuous-integration)
- [Design Approach](#design-approach)
- [Author](#author)

## Overview

This project automates the main user flows of a ToDo application: registering a new account, adding todo items, and deleting them. Tests combine API calls (for fast, reliable setup) with UI interaction (for the behavior under test), using the Page Object Model.

**Application under test:** [QAcart ToDo App](https://todo.qacart.com)

## Tech Stack

| Area | Tool |
|---|---|
| Test framework | Playwright |
| Language | TypeScript |
| Design pattern | Page Object Model (POM) |
| API Testing | Playwright API testing (request fixture) |
| CI/CD | GitHub Actions |
| Runtime | Node.js |

## Test Coverage

5 automated tests across 3 spec files.

**UI tests**
- Register a new user through the signup form and verify the welcome message (`user.spec.ts`)

**Hybrid API + UI tests**
- Register a user through the API, then add a todo item through the UI (`todo2.spec.ts`)
- Register a user through the API, add a todo through the UI, verify it appears, and delete it (`todo2.spec.ts`)
- Register a user and add a todo through the API, then delete it through the UI (`todo-api.spec.ts`)

**API tests**
- Register a user through the API (`todo-api.spec.ts`)

**Why hybrid?** Registration and todo creation are only *setup* for most scenarios, so they run through the API: faster and less flaky than clicking through the UI. The UI is used for the behavior actually being tested.

## Project Structure

```
playwright-todo-project/
├── .github/workflows/
│   └── main.yml             # CI pipeline (GitHub Actions)
├── Pages/                   # Page Objects (one class per page)
│   ├── NewTodoPage.ts
│   ├── RegisterPage.ts
│   └── TodoPage.ts
├── apis/                    # API helpers used by the tests
├── models/
│   └── User.ts              # User data model
├── tests/
│   ├── todo-api.spec.ts
│   ├── todo2.spec.ts
│   └── user.spec.ts
├── playwright.config.ts     # Playwright configuration
├── tsconfig.json            # TypeScript configuration
├── package.json             # Dependencies and scripts
└── README.md
```

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (LTS version)
- [Git](https://git-scm.com/)

Check that both are installed:

```bash
node -v
git --version
```

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/NeamaMohamed-QC/playwright-todo-project.git

# 2. Move into the project folder
cd playwright-todo-project

# 3. Install dependencies
npm install

# 4. Install the browsers Playwright uses
npx playwright install
```

## Running the Tests

```bash
# Run all tests
npx playwright test

# Run a single test file
npx playwright test tests/<file-name>.spec.ts

# Run tests with the browser visible
npx playwright test --headed

# Run tests in Playwright's interactive UI mode
npx playwright test --ui
```

## Test Reports

After a run, open the HTML report:

```bash
npx playwright show-report
```

## Continuous Integration

Tests run automatically on GitHub Actions on every push. The workflow is in `.github/workflows/`. To see results, open the **Actions** tab of this repository.

## Design Approach

- **Page Object Model:** each page has its own class holding its locators and actions. Tests stay short and readable, and a UI change is fixed in one place.
- **Separation of concerns:** test data and helpers live apart from test logic.
- **Independent tests:** each test can run on its own without depending on the others.

## Author

**Neama Mohamed**, Software Testing Engineer | ISTQB® CTFL

[LinkedIn](https://www.linkedin.com/in/neama-mohamed-3b7275238)
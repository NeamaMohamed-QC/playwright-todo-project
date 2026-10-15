# Playwright ToDo Project

![Playwright Tests](https://github.com/NeamaMohamed-QC/playwright-todo-project/actions/workflows/main.yml/badge.svg)

End-to-end and API test automation framework for a ToDo web application, built with **Playwright** and **TypeScript** using the **Page Object Model (POM)** design pattern, with tests running automatically on every push through **GitHub Actions**.

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

This project automates the main user flows of a ToDo application: creating an account, logging in, and managing todo items. It also includes API tests that verify the backend independently of the UI.

**Application under test:** [QAcart ToDo App](https://todo.qacart.com)

## Tech Stack

| Area | Tool |
|---|---|
| Test framework | Playwright |
| Language | TypeScript |
| Design pattern | Page Object Model (POM) |
| API testing | Playwright API testing (`request` fixture) |
| CI/CD | GitHub Actions |
| Runtime | Node.js |

## Test Coverage

**UI tests**
- Register / sign up a new account
- Log in with valid credentials
- Add a new todo item
- Delete a todo item
- Assertions that verify page state, messages, and todo list content

**API tests**
- API checks for the application's endpoints, validating status codes and response data

> Update this section with the exact scenarios in your `tests` folder. Specific details such as "negative login with a wrong password" make it stronger.

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
│   ├── todo.spec.ts
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

[LinkedIn](https://www.linkedin.com/in/neamamohamed-3b7275238)
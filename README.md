# Playwright Web Application Testing

- This project contains automated tests for a web application (https://www.demoblaze.com/) using Playwright.
- The test was created on Windows system so all the following process listed is as per windows machine, if your machine is Mac or Lenix please refer Webdriverio website : https://playwright.dev/docs/intro


## Prerequisites

Ensure you have the following installed on your machine:

- Node.js (https://nodejs.org/)
- npm (Node Package Manager, included with Node.js)
- Playwright (https://playwright.dev/)


You can verify the installation by running:

```bash
node -v
npm -v
```

## Setup

## 1. Clone the repository:

```bash
git clone <repository_url>
```
- GitHub Repo: https://github.com/ShaikhSohrab/Web_Automaton_Playwright_Ecommerce_Webpage
- GitLab Repo: https://gitlab.com/sohrabofficial97/web_automation_assigment#

## 2. Navigate to the project directory:

```bash
cd <project_directory>
```

## 3. Install dependencies:

```bash
npm install
```

## 4. Install Playwright browsers:

```bash
npx playwright install
```

## Running Tests

To run all tests:

```bash
npx playwright test
```

To run tests in a specific file:

```bash
npx playwright test <file_name>
```

To run tests in a specific browser (e.g., Chromium):

```bash
npx playwright test --project=chromium
```

To generate a report after running tests:

```bash
npx playwright show-report
```

## Test Report

After executing tests, Playwright generates an HTML report. You can view it by running:

```bash
npx playwright show-report
```

This opens the report in your default browser, showing detailed test results, screenshots, and errors.

### Limitations

1. Dynamic data comparisons rely on API responses being available during runtime.
2. This Project supports Chromium, Webkit, and Firefox browsers only.


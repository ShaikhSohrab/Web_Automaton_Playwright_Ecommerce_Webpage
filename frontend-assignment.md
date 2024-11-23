# SDET Frontend Interview Assignment

## Application Link
[DemoBlaze E-commerce Application](https://www.demoblaze.com)

## Assignment Overview
Your task is to write automated tests using Playwright and JavaScript for the provided e-commerce application. The assignment should cover various aspects of the application to demonstrate your skills in automation testing, problem-solving, and attention to detail.

## Assignment Requirements

### 1. Setup
- Set up a Playwright testing environment in JavaScript.

### 2. Test Scenarios
Create automated tests that include:

- **User Registration and Login**:
  - Automate the registration of a new user.
  - Verify that the user can log in with the registered credentials.
  - Test invalid login attempts and verify error messages.

- **Product Purchase**:
  - Automate adding a product to the cart from each category.
  - Verify that the cart reflects the added product.
  - Proceed to checkout and fill in necessary details.
  - Verify the order confirmation page.

- **Dynamic Content Verification**:
  - Intercept network calls to verify that the data loaded on the UI matches the expected values from the API (this could be done on any page).

- **Implement other cases that you feel are necessary**: Cover positive and negative scenarios.

### 3. Assertions
- Use appropriate assertions to validate the expected outcomes for each test scenario.
- Ensure your tests are robust and can handle unexpected changes in the UI.

### 4. Test Structure
- Organize your tests using the Page Object Model (POM) for maintainability.
- Include comments and documentation to explain your code and test logic.

### 5. Error Handling and Reporting
- Implement error handling for network failures and unexpected UI states.
- Generate a test report summarizing the results of your tests.

### 6. CI/CD Configuration
- Integrate your tests with CI pipeline through Azure yaml file.


## Submission
- Please submit your code in a GitLab repository.
- Include a README file with instructions on how to set up and run your tests.
- Highlight any assumptions or limitations you encountered during the testing process.

## Evaluation Criteria
- Framework Implementation.
- Completeness and correctness of the tests.
- Code organization and readability and modularization.
- Use of Playwright features and best practices.
- Ability to handle dynamic content and edge cases.
- Clarity of documentation and reporting.

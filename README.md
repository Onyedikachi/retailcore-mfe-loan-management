# @Sterling/product-factory

This repository contains the source code for the Sterling Product Factory application.

## Setup

To set up the application on your local system, follow these steps:

1. **Clone the repository:**

   Clone the repository by running the following command:

   `git clone https://github.com/sterling-retailcore-team/retailcore-mfe-product-factory.git `


2. **Install dependencies:**

    Navigate to the cloned repository's directory:

    `cd retailcore-mfe-product-factory`

    Install the required dependencies by running:

    `yarn`

3. **Start the application:**

    Start the application in standalone mode by running:

    `yarn start:standalone`

    This will launch the application and you can access it in your browser at `http://localhost:8083/product/factory`.


## Scripts
------------

The following scripts are available to run various tasks:

-   `start`: Start the application using webpack server.
-   `start:standalone`: Start the application in standalone mode.
-   `build`: Build the application using webpack.
-   `build:webpack`: Build the application in production mode.
-   `analyze`: Build the application and analyze the generated bundle.
-   `lint`: Run eslint to check and fix linting issues in source files.
-   `lint:cache`: Run eslint using cache for faster linting.
-   `format`: Format source files using Prettier.
-   `check-format`: Check if source files are formatted correctly using Prettier.
-   `test`: Run the test suite using Jest.
-   `watch-tests`: Run the test suite in watch mode using Jest.
-   `prepare`: Install husky git hooks.
-   `pre-commit`: Run lint-staged before committing changes.
-   `coverage`: Run tests and generate test coverage report.
-   `build:types`: Generate TypeScript declaration files.

---

# Hashira Placements Assignment - Polynomial Root Base Conversion

## Project Overview

This project provides a robust and thoroughly tested solution for the Hashira Placements Assignment. The primary goal is to process polynomial root data from a JSON input. For each root, the value is provided in an arbitrary base (from base 2 to base 36). The solution correctly parses this data, converts the root values to their base 10 equivalents, and assesses whether the number of available roots (`n`) meets the minimum requirement (`k`) to solve for the coefficients of a polynomial.

The solution is implemented in **JavaScript** and runs on the **Node.js** runtime.

## Core Features & Robustness

This solution was designed not just to solve the two sample test cases, but to be a generalized and resilient tool for any valid input. Its robustness is built on the following key features:

1.  **Arbitrary-Precision Arithmetic (`BigInt`):** The core of the solution's power. Standard number types in many languages have a maximum safe integer limit. The test cases demonstrate that root values can easily exceed this limit. By using JavaScript's `BigInt` for all numerical storage and calculations, this solution guarantees **perfect precision for numbers of any size**, preventing data loss and overflow errors.

2.  **Generalized Base Conversion:** The `convertToBase10` function implements the standard, mathematically sound algorithm for base conversion. It supports all bases from 2 to 36 by correctly mapping digits `0-9` and letters `a-z` (case-insensitively).

3.  **Flexible Input Parsing:** The code does not assume root keys are sequential (e.g., "1", "2", "3", ...). It correctly processes all numeric keys found in the JSON object (as demonstrated by handling `"6"` in the first sample case), making it resilient to sparse or unconventionally keyed data.

4.  **Comprehensive Error Handling:** The solution is built to handle imperfect data gracefully:
    *   **Invalid Digit Validation:** It rejects any `value` containing a digit that is not valid for its specified `base` (e.g., the digit '8' in a base 8 number).
    *   **Invalid Character Rejection:** It rejects any `value` containing non-alphanumeric characters (e.g., '!', '#', '?').
    *   **Graceful Failure:** A `try...catch` block ensures that if one root is malformed, the program logs an error for that specific root and continues processing the rest, rather than crashing entirely.

## Testing and Verification

The solution was subjected to a rigorous testing suite beyond the two provided samples to ensure its correctness and stability across a wide range of scenarios.

The validation process included:

*   **Provided Test Cases:** Correctly processed the two sample cases, handling non-sequential keys and extremely large numbers.
*   **Edge Case Testing:**
    *   **Base Extremes:** Confirmed correct conversion for the minimum (base 2) and maximum (base 36) supported bases.
    *   **Zero and Single-Digit Values:** Handled inputs like `"0"` and single-digit numbers correctly.
    *   **Empty Inputs:** Interpreted empty value strings (`"value": ""`) as zero.
*   **Malformed Data Testing:**
    *   Verified that the program correctly identifies and reports errors for roots with out-of-range digits or invalid characters.
*   **Structural Variations:**
    *   Ensured the program runs without error even if the input JSON is missing optional keys (e.g., no roots provided, or an empty `keys` object).

This extensive testing confirms that the solution is not only correct for the given examples but is a reliable and robust implementation for the general problem.

## Code Structure

The code is organized into two primary functions for clarity and separation of concerns:

*   `convertToBase10(value, base)`: A pure function that takes a string value and its base, and returns the base 10 `BigInt` equivalent. This function contains all the core conversion and validation logic.
*   `processPolynomialRoots(jsonData)`: The main orchestrator that reads the JSON data, iterates through the roots, calls the conversion function for each, and formats the final output to the console.

## How to Run

### Prerequisites

*   **Node.js:** You must have Node.js installed on your system. You can download it from [nodejs.org](https://nodejs.org/).

### Execution Steps

1.  **Clone the Repository:**
    ```bash
    git clone https://github.com/YourGitHubUsername/your-repo-name.git
    cd your-repo-name
    ```
    *(Replace `YourGitHubUsername/your-repo-name` with your actual repository URL.)*

2.  **Run the Script:**
    Execute the main file from your terminal.
    ```bash
    node polynomialRootSolver.js
    ```



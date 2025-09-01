/**
 * Hashira Placements Assignment - Polynomial Root Base Conversion
 *
 * Language: JavaScript (for Node.js runtime)
 *
 * This script reads polynomial root data from JSON objects, converts the root
 * values from their specified arbitrary bases (2-36) into base 10, and
 * determines if enough roots are provided to solve for a polynomial of a
 * given degree. It is designed to be robust, handling very large numbers
 * with BigInt and gracefully managing non-sequential or malformed data.
 */

/**
 * Converts a number string from an arbitrary base to its base 10 equivalent.
 *
 * @param {string} value The string representation of the number (e.g., "111", "aed7").
 * @param {number|string} base The base of the input number (e.g., 2, 15).
 * @returns {BigInt} The base 10 equivalent of the number as a BigInt.
 * @throws {Error} If the value contains an invalid digit for the specified base.
 */
function convertToBase10(value, base) {
    // Use BigInt for all calculations to support arbitrarily large numbers.
    let result = 0n;
    const baseBigInt = BigInt(base);
    const digits = "0123456789abcdefghijklmnopqrstuvwxyz";

    // Handle empty string as zero
    if (!value) {
        return 0n;
    }

    for (let i = 0; i < value.length; i++) {
        const char = value[i].toLowerCase();
        const digitValue = BigInt(digits.indexOf(char));

        // Validate that the digit is valid for the given base.
        if (digitValue === -1n || digitValue >= baseBigInt) {
            throw new Error(Invalid digit '${char}' for base ${base});
        }

        // The core conversion logic: result = (result * base) + digitValue
        result = result * baseBigInt + digitValue;
    }
    return result;
}

/**
 * Processes a JSON object containing polynomial root data. It extracts, converts,
 * and summarizes the roots.
 *
 * @param {object} jsonData The input JSON data.
 */
function processPolynomialRoots(jsonData) {
    if (!jsonData || !jsonData.keys) {
        console.error("Invalid JSON data: 'keys' object is missing.");
        return;
    }
    const { n, k } = jsonData.keys;
    const rootsInBase10 = [];

    console.log(Number of roots provided (n): ${n});
    console.log(Minimum roots required (k): ${k});
    console.log("\n--- Converted Roots (Base 10) ---");

    // Robustly find all numeric keys, excluding the 'keys' object itself.
    // This handles non-sequential keys like in the first sample case.
    const actualRootKeys = Object.keys(jsonData)
        .filter(key => !isNaN(Number(key)) && key !== 'keys')
        .sort((a, b) => Number(a) - Number(b)); // Sort keys for consistent output

    for (const rootKey of actualRootKeys) {
        const { base, value } = jsonData[rootKey];
        try {
            const base10Value = convertToBase10(value, base);
            rootsInBase10.push(base10Value);
            console.log(Root ${rootKey}: Base ${base}, Value "${value}" -> Base 10: ${base10Value}n);
        } catch (error) {
            console.error(Error processing root ${rootKey}: ${error.message});
        }
    }

    console.log("\n--- Summary ---");
    console.log(All roots in Base 10: [${rootsInBase10.map(r => r + 'n').join(', ')}]);

    // The problem defines 'k' as m+1, where m is the degree.
    const degree = k - 1;
    const foundRootsCount = rootsInBase10.length;

    if (foundRootsCount >= k) {
        console.log(\nWe have ${foundRootsCount} roots, which is sufficient (>= ${k}) to uniquely determine a polynomial of degree ${degree}.);
    } else {
        console.log(\nWe only have ${foundRootsCount} roots, which is not enough (< ${k}) to uniquely determine a polynomial of degree ${degree}.);
    }
}

// --- Main Execution Block ---

// --- Test Case 1: Provided Sample (Non-Sequential Keys) ---
const testCase1 = {
    "keys": {
        "n": 4,
        "k": 3
    },
    "1": { "base": "10", "value": "4" },
    "2": { "base": "2", "value": "111" },
    "3": { "base": "10", "value": "12" },
    "6": { "base": "4", "value": "213" }
};

console.log("=======================================");
console.log("Processing Test Case 1");
console.log("=======================================");
processPolynomialRoots(testCase1);

// --- Test Case 2: Provided Sample (Large Numbers) ---
const testCase2 = {
    "keys": { "n": 10, "k": 7 },
    "1": { "base": "6", "value": "13444211440455345511" },
    "2": { "base": "15", "value": "aed7015a346d635" },
    "3": { "base": "15", "value": "6aeeb69631c227c" },
    "4": { "base": "16", "value": "e1b5e05623d881f" },
    "5": { "base": "8", "value": "316034514573652620673" },
    "6": { "base": "3", "value": "2122212201122002221120200210011020220200" },
    "7": { "base": "3", "value": "20120221122211000100210021102001201112121" },
    "8": { "base": "6", "value": "20220554335330240002224253" },
    "9": { "base": "12", "value": "45153788322a1255483" },
    "10": { "base": "7", "value": "1101613130313526312514143" }
};

console.log("\n\n=======================================");
console.log("Processing Test Case 2");
console.log("=======================================");
processPolynomialRoots(testCase2);

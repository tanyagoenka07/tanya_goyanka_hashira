function convertToBase10(value, base) {
    let result = 0n;
    const baseBigInt = BigInt(base);
    const digits = "0123456789abcdefghijklmnopqrstuvwxyz";

    for (let i = 0; i < value.length; i++) {
        const char = value[i].toLowerCase();
        const digitValue = BigInt(digits.indexOf(char));
        if (digitValue === -1n || digitValue >= baseBigInt) {
            throw new Error(Invalid digit '${char}' for base ${base});
        }
        result = result * baseBigInt + digitValue;
    }
    return result;
}

function processPolynomialRoots(jsonData) {
    const n = jsonData.keys.n;
    const k = jsonData.keys.k;
    const rootsInBase10 = [];

    console.log(Number of roots (n): ${n});
    console.log(Minimum roots required (k): ${k});
    console.log("\n--- Converted Roots (Base 10) ---");

    const actualRootKeys = Object.keys(jsonData).filter(key => !isNaN(Number(key)) && key !== 'keys');
    actualRootKeys.sort((a, b) => Number(a) - Number(b));

    for (const rootKey of actualRootKeys) {
        const { base, value } = jsonData[rootKey];
        try {
            const base10Value = convertToBase10(value, base);
            rootsInBase10.push(base10Value);
            console.log(Root ${rootKey}: Base ${base}, Value "${value}" -> Base 10: ${base10Value});
        } catch (error) {
            console.error(Error processing root ${rootKey}: ${error.message});
        }
    }

    console.log("\n--- Summary ---");
    console.log(All roots in Base 10: [${rootsInBase10.join(', ')}]);

    if (rootsInBase10.length >= k) {
        console.log(\nWe have ${rootsInBase10.length} roots (out of ${n} declared), which is sufficient (>= ${k}) to determine a polynomial of degree ${k - 1}.);
    } else {
        console.log(\nWe only have ${rootsInBase10.length} roots (out of ${n} declared), which is not enough (< ${k}) to uniquely determine a polynomial of degree ${k - 1}.);
    }

    return rootsInBase10;
}

const testCase1 = {
    "keys": {
        "n": 4,
        "k": 3
    },
    "1": {
        "base": "10",
        "value": "4"
    },
    "2": {
        "base": "2",
        "value": "111"
    },
    "3": {
        "base": "10",
        "value": "12"
    },
    "6": {
        "base": "4",
        "value": "213"
    }
};

console.log("=======================================");
console.log("Processing Test Case 1:");
console.log("=======================================");
processPolynomialRoots(testCase1);

console.log("\n\n=======================================");
console.log("Processing Test Case 2:");
console.log("=======================================");
const testCase2 = {
    "keys": {
        "n": 10,
        "k": 7
    },
    "1": {
        "base": "6",
        "value": "13444211440455345511"
    },
    "2": {
        "base": "15",
        "value": "aed7015a346d635"
    },
    "3": {
        "base": "15",
        "value": "6aeeb69631c227c"
    },
    "4": {
        "base": "16",
        "value": "e1b5e05623d881f"
    },
    "5": {
        "base": "8",
        "value": "316034514573652620673"
    },
    "6": {
        "base": "3",
        "value": "2122212201122002221120200210011020220200"
    },
    "7": {
        "base": "3",
        "value": "20120221122211000100210021102001201112121"
    },
    "8": {
        "base": "6",
        "value": "20220554335330240002224253"
    },
    "9": {
        "base": "12",
        "value": "45153788322a1255483"
    },
    "10": {
        "base": "7",
        "value": "1101613130313526312514143"
    }
};
processPolynomialRoots(testCase2);

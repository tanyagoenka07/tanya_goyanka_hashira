const fs = require('fs');

function convertToDecimal(value, base) {
    const digits = "0123456789abcdefghijklmnopqrstuvwxyz";
    let result = 0;
    let power = 0;
    
    for (let i = value.length - 1; i >= 0; i--) {
        const digit = digits.indexOf(value[i].toLowerCase());
        result += digit * Math.pow(base, power);
        power++;
    }
    
    return result;
}

function lagrangeInterpolation(points) {
    const n = points.length;
    let secret = 0;
    
    for (let i = 0; i < n; i++) {
        const xi = points[i].x;
        const yi = points[i].y;
        
        let li = 1;
        for (let j = 0; j < n; j++) {
            if (i !== j) {
                li *= (0 - points[j].x) / (xi - points[j].x);
            }
        }
        
        secret += yi * li;
    }
    
    return Math.round(secret);
}

function solveHashira(testCase) {
    const k = testCase.keys.k;
    const points = [];
    
    for (let i = 1; i <= testCase.keys.n; i++) {
        if (testCase[i]) {
            const base = parseInt(testCase[i].base);
            const value = testCase[i].value;
            const x = i;
            const y = convertToDecimal(value, base);
            points.push({ x, y });
        }
    }
    
    const selectedPoints = points.slice(0, k);
    return lagrangeInterpolation(selectedPoints);
}

const testCase1 = {
    "keys": {"n": 4, "k": 3},
    "1": {"base": "10", "value": "4"},
    "2": {"base": "2", "value": "111"},
    "3": {"base": "10", "value": "12"},
    "6": {"base": "4", "value": "213"}
};

const testCase2 = {
    "keys": {"n": 10, "k": 7},
    "1": {"base": "6", "value": "13444211440455345511"},
    "2": {"base": "15", "value": "aed7015a346d635"},
    "3": {"base": "15", "value": "6aeeb69631c227c"},
    "4": {"base": "16", "value": "e1b5e05623d881f"},
    "5": {"base": "8", "value": "316034514573652620673"},
    "6": {"base": "3", "value": "2122212201122002221120200210011020220200"},
    "7": {"base": "3", "value": "20120221122211000100210021102001201112121"},
    "8": {"base": "6", "value": "20220554335330240002224253"},
    "9": {"base": "12", "value": "45153788322a1255483"},
    "10": {"base": "7", "value": "1101613130313526312514143"}
};

console.log(solveHashira(testCase1));
console.log(solveHashira(testCase2));

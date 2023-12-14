module.exports = {
    root: true,
    env: {
        browser: true,
        es2020: true
    },
    extends: [
        "next/core-web-vitals", "eslint:recommended", "plugin:@typescript-eslint/recommended", "plugin:react-hooks/recommended"
    ],
    ignorePatterns: [
        "dist", ".eslintrc.cjs"
    ],
    parser: "@typescript-eslint/parser",
    plugins: ["prettier"],
    rules: {
        "no-console": 1, // Means warning
        "prettier/prettier": 1,
		"no-mixed-spaces-and-tabs": 0,
    }
};


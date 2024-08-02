module.exports = {
    "env": {
        "browser": true,
        "node": true,
        "es6": true
    },
    "extends": ["eslint:recommended", "plugin:react/recommended"],
    "parserOptions": {
        "ecmaVersion": 12,
        "sourceType": "module",
        "ecmaFeatures": {
            "jsx": true
        }
    },
    "plugins": ["react", "react-hooks"],
    "rules": {
        "no-console": 1,
        "no-lonely-if": 1,
        "no-unused-vars": 1,
        "no-trailing-spaces": 1,
        "no-multi-spaces": 1,
        "no-multiple-empty-lines": 1,
        "space-before-blocks": ["error", "always"],
        "object-curly-spacing": [1, "always"],
        "indent": ["warn", 4],
        "semi": [1, "never"],
        "quotes": ["error", "single"],
        "array-bracket-spacing": 1,
        "linebreak-style": 0,
        "no-unexpected-multiline": "warn",
        "keyword-spacing": 1,
        "comma-dangle": 1,
        "comma-spacing": 1,
        "arrow-spacing": 1
    },
    "settings": {
        "react": {
            "version": "detect"
        }
    }
}


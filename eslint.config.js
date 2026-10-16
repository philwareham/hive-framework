const js = require('@eslint/js');

module.exports = [
    {
        files: ['**/*.js'],

        languageOptions: {
            ecmaVersion: 2026,
            sourceType: 'module',
            globals: {
                __dirname: 'readonly',
                __filename: 'readonly',
                console: 'readonly',
                document: 'readonly',
                exports: 'readonly',
                localStorage: 'readonly',
                module: 'readonly',
                process: 'readonly',
                require: 'readonly',
                window: 'readonly'
            }
        },

        rules: {
            ...js.configs.recommended.rules
        }
    }
];

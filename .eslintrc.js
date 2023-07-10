module.exports = {
   env: {
      browser: true,
      node: true,
   },
   root: true,
   extends: [
      'plugin:@typescript-eslint/recommended',
      'prettier',
      'eslint:recommended',
   ],
   parser: '@typescript-eslint/parser',
   parserOptions: {
      tsconfigRootDir: __dirname,
      project: ['./**/tsconfig.json'],
      ecmaVersion: 7,
   },
   plugins: ['prettier', '@typescript-eslint/eslint-plugin'],
   rules: {
      semi: ['error', 'always'],
      quotes: ['error', 'single'],
      'no-console': 'error',
      'no-var': 'error',
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/default-param-last': 'error',
      '@typescript-eslint/no-explicit-any': 1,
      '@typescript-eslint/no-inferrable-types': [
         'warn',
         {
            ignoreParameters: true,
         },
      ],
      '@typescript-eslint/no-unused-vars': 'warn',
      'no-duplicate-imports': 'off',
      '@typescript-eslint/no-duplicate-imports': 'error',
      '@typescript-eslint/no-duplicate-enum-values': 'error',
      '@typescript-eslint/no-empty-function': 'error',
      '@typescript-eslint/no-confusing-non-null-assertion': 'error',
      '@typescript-eslint/no-unused-expressions': [
         'error',
         {
            allowShortCircuit: true,
            allowTernary: true,
            allowTaggedTemplates: true,
         },
      ],
      'max-len': [
         'error',
         {
            code: 110,
            ignorePattern:
               '^\\s*import (\\*|\\{[^\\}]+\\}|\\w+)(\\s+as\\s+\\w+)?\\s+from\\s+[\'"`][^\'"`]+[\'"`]\\s*;$',
            ignoreRegExpLiterals: true,
            ignoreTemplateLiterals: true,
            ignoreUrls: true,
         },
      ],
      'no-unused-labels': 'error',
      'no-useless-computed-key': 'error',
      'no-useless-concat': 'error',
      'no-useless-escape': 'error',
      'no-useless-rename': 'error',
      camelcase: 'error',
      'require-await': 'warn',
      'arrow-spacing': 'warn',
      'spaced-comment': [
         'error',
         'always',
         {
            block: {
               balanced: true,
               markers: [',', '!'],
            },
         },
      ],
      'no-multiple-empty-lines': 'error',
      'no-undef': 'off',
      'template-tag-spacing': ['error', 'always'],
   },
};

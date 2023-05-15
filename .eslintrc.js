const jsRulesExtension = [
  'next/core-web-vitals',
  'plugin:prettier/recommended',
];

const rules = {
  // Warns if console.log is left in code. If you want to leave it permanently, use 'info'
  'no-console': ['warn', { allow: ['info', 'warn', 'error'] }],

  'react/jsx-filename-extension': 'off',
  'import/prefer-default-export': 'off',

  // Discourage reassigning parameters but allow for special cases
  'no-param-reassign': [
    'error',
    { props: true, ignorePropertyModificationsFor: ['draft'] },
  ],

  // Allow using ++/--. It has it's own place under the Sun.
  'no-plusplus': 'off',

  // Seems to be normal to have functions defined all over the place
  // Classes? Lets define those helper classes at the top of the file.
  'no-use-before-define': ['error', { functions: false, classes: true }],

  // While properly formatted string using templates
  // might be more readable over concatenation,
  // auto-fix is very intrusive, and renders not the best results.
  'prefer-template': 'off',

  // Restriction of using for x of xes is a bit heavy handed
  'no-restricted-syntax': 'off',

  // Underscores are not the enemy
  'no-underscore-dangle': 'off',

  // Highlight TODO comments in the code to make them more visible
  'no-warning-comments': ['warn', { terms: ['todo', 'fixme', 'fix'] }],

  // We don't need React in scope
  'react/react-in-jsx-scope': 0,

  // This one is nice to have but should not fail builds.
  'import/order': 'warn',

  // Some times we want to explicitly return undefined to ensure there are no
  // mistaken function return types
  'no-useless-return': 'off',
};

module.exports = {
  plugins: ['prettier', '@typescript-eslint'],
  extends: jsRulesExtension,
  parser: '@typescript-eslint/parser',
  root: true,
  rules,
  overrides: [
    // Add typescript specific rules to typescript files
    {
      files: ['*.ts', '*.tsx'],
      extends: ['plugin:@typescript-eslint/recommended'].concat(
        jsRulesExtension
      ),
      rules: {
        ...rules,

        // Eslint mis-reports this for typescript files. Typescript will handle on it's own.
        'no-use-before-define': 'off',

        // ESLint misreports this in typescript files
        'import/no-unresolved': 'off',
        'import/extensions': 'off',

        // PropTypes not required for typescript
        'react/prop-types': 'off',

        // Prop spreading is totally fine in a type safe language
        'react/jsx-props-no-spreading': 'off',

        // Implicit return types are sometimes okay
        '@typescript-eslint/explicit-function-return-type': 'off',

        // Typescript has its own "no-use-before-define" that needs to be adjusted
        '@typescript-eslint/no-use-before-define': [
          'error',
          { functions: false, classes: true },
        ],

        // Sometimes it is nice to have multiple related classes in a single file
        'max-classes-per-file': 'off',

        // Typescript forces variable assignment before use so we sometimes need to
        // explicity set a variable as undefined.
        'no-undef-init': 'off',

        // Let's let typescript deal with that instead of eslint
        'consistent-return': 'off',

        // ESLint shadow rule produces false positives for enums in typescript.
        // Replace it with the typescript specific one
        'no-shadow': 'off',
        '@typescript-eslint/no-shadow': 'error',

        /**
         * Lets turn of the requirement of return types being defined for module boundaries.
         * This rule can be maddeningly annoying for simple functions like:
         *    export const foo = (bar: string) => bar
         * Doesn't need to be:
         *    export const foo = (bar: string): string => bar
         */
        '@typescript-eslint/explicit-module-boundary-types': 'off',

        /**
         * This is misreported for namespaces in typescript files. Let's let typescript
         * worry about using undefined variables instead of eslint.
         */
        'no-undef': 'off',

        /* Replace with the typescript equivalent since the normal eslint rule doesn't work with enums */
        'no-unused-vars': 'off',
        '@typescript-eslint/no-unused-vars': 'warn',

        // We don't need default props on typescript files
        'react/require-default-props': 'off',

        // This one misreports on some typescript files
        'react/no-unused-prop-types': 'off',

        // This rule doesn't play nicely with typescript
        'react/function-component-definition': 'off',
      },
    },
  ],
};

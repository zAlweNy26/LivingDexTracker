import antfu from '@antfu/eslint-config'

export default antfu({
  stylistic: {
    indent: 2,
    quotes: 'single',
  },
  typescript: true,
  vue: {
    a11y: true,
    sfcBlocks: true,
    vueVersion: 3,
  },
  formatters: {
    html: true,
    svg: true,
    xml: true,
    css: true,
    markdown: true,
  },
  jsonc: false,
  yaml: true,
  markdown: true,
  rules: {
    'node/prefer-global/process': 'off',
    'vue/first-attribute-linebreak': 'off',
    'vue/v-on-event-hyphenation': 'off',
    'vue/attribute-hyphenation': 'off',
    'array-bracket-spacing': 'off',
    'unused-imports/no-unused-vars': 'warn',
    'unused-imports/no-unused-imports': 'warn',
    'one-var': 'off',
    'no-console': 'off',
    'jsdoc/check-param-names': 'off',
    'curly': ['warn', 'multi-or-nest'],
    'antfu/if-newline': 'off',
    'antfu/curly': 'off',
    'antfu/consistent-list-newline': 'off',
    'brace-style': 'off',
    'vue/html-closing-bracket-newline': 'off',
  },
})

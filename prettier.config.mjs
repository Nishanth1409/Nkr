/** @type {import("prettier").Config} */
const config = {
  plugins: [
    '@ianvs/prettier-plugin-sort-imports',
    'prettier-plugin-tailwindcss',
  ],
  // Prettier standard options
  singleQuote: true,
  semi: false,
  // Import sorting options
  importOrder: [
    '<BUILTIN_MODULES>',
    '^react$',
    '^next',
    '<THIRD_PARTY_MODULES>',
    '',
    '^@/(.*)$',
    '^[./]',
  ],
  importOrderParserPlugins: ['typescript', 'jsx', 'decorators-legacy'],
  importOrderTypeScriptVersion: '5.0.0',
}

export default config

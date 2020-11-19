// postcss.config.js

const tailwind = require('tailwindcss');
const cssnano = require('cssnano');
const autoprefixer = require('autoprefixer')
const presetEnv = require('postcss-preset-env')({
  features: {
    // enable nesting
    'nesting-rules': true,
  },
});

const plugins =
  process.env.NODE_ENV === 'production'
    ? [tailwind, presetEnv, cssnano, autoprefixer]
    : [tailwind, presetEnv, autoprefixer];

module.exports = { plugins };
const purgecss = require('@fullhuman/postcss-purgecss')({
  content: ['./src/**/*.html', './src/**/*.vue', './src/**/*.jsx'],
  defaultExtractor: content => content.match(/[A-Za-z0-9-_:/]+/g) || [],
  whitelistPatterns: [/^el/, /^markdown/, /.*mavon.*/, /.*ant.*/], //ElementUI加入白名单，否则会把所有的双下划线去掉
  whitelistPatternsChildren: [/.*ant.*/, /^el.*/, /^markdown/, /.*mavon.*/],
})

module.exports = {
  plugins: [
    require('tailwindcss'),
    require('autoprefixer'),
    ...(process.env.NODE_ENV === 'production' ? [purgecss] : []),
  ],
}

import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://valenfelix.github.io',
  base: process.env.SITE_BASE ?? '/david-lopez-felix-portfolio',
  output: 'static',
  trailingSlash: 'always',
  build: { format: 'directory' },
});

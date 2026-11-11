import type { APIRoute } from 'astro';
import { projects, localPath } from '../data/portfolio';
export const GET: APIRoute = ({ site }) => {
  const paths = ['', ...projects.map(project => `trabajos/${project.slug}/`)];
  const entries = paths.map(path => `<url><loc>${new URL(localPath(path), site).href}</loc></url>`).join('');
  return new Response(`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${entries}</urlset>`, { headers: { 'Content-Type': 'application/xml' } });
};

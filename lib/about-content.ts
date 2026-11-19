import { DomUtils, parseDocument } from 'htmlparser2';
import { cleanHtml } from './sanitize';

const cardDefaults = [
  { title: 'Who We Are', content: '<p>Monoline supports businesses and individuals with accounting, compliance and practical financial guidance.</p>' },
  { title: 'Why Choose Monoline?', content: '<p>We focus on organised records, clear communication and support tailored to your needs.</p>' },
  { title: 'Who We Serve', content: '<p>We work with startups, small businesses, professionals and growing enterprises.</p>' }
];

export function splitAboutContent(content: string) {
  const cards = cardDefaults.map(card => ({ ...card, html: '' }));
  const remaining: string[] = [];
  let active: number | null = null;
  let activeLevel = 0;

  for (const node of parseDocument(cleanHtml(content)).children) {
    const level = node.type === 'tag' && /^h[1-6]$/.test(node.name) ? Number(node.name[1]) : 0;
    if (level && active !== null && level <= activeLevel) active = null;
    if (level && node.type === 'tag' && active === null) {
      const heading = DomUtils.textContent(node).trim().replace(/\s+/g, ' ').replace(/[?:]$/, '').toLowerCase();
      const index = cards.findIndex(card => card.title.replace(/\?$/, '').toLowerCase() === heading && !card.html);
      if (index !== -1) {
        active = index;
        activeLevel = level;
      }
    }

    const html = DomUtils.getOuterHTML(node);
    if (active === null) remaining.push(html);
    else cards[active].html += html;
  }

  return {
    remaining: remaining.join(''),
    cards: cards.map(({ title, content: fallback, html }) => ({
      title,
      html: html || `<h2>${title}</h2>${fallback}`
    }))
  };
}

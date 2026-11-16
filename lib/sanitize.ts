import sanitizeHtml from 'sanitize-html';

export function cleanHtml(input: string) {
  return sanitizeHtml(input, {
    allowedTags: ['p','br','h1','h2','h3','h4','h5','h6','strong','b','em','i','u','s','blockquote','ul','ol','li','a','img','figure','figcaption','div','span','table','thead','tbody','tr','th','td','hr'],
    allowedAttributes: {
      a: ['href','target','rel','title'], img: ['src','alt','width','height','style'],
      figure: ['class','style'], figcaption: ['class'], div: ['class'], span: ['class','style'],
      table: ['class'], th: ['colspan','rowspan'], td: ['colspan','rowspan'],
      p: ['style'], h2: ['style'], h3: ['style']
    },
    allowedStyles: { '*': { 'text-align': [/^(left|center|right|justify)$/], 'width': [/^\d+(\.\d+)?%$/] } },
    allowedSchemes: ['http','https','mailto','tel'],
    allowedSchemesByTag: { img: ['http','https'] },
    allowProtocolRelative: false,
    transformTags: {
      a: (_tag, attrs) => ({ tagName: 'a', attribs: { ...attrs, rel: 'noopener noreferrer' } }),
      img: (_tag, attrs) => ({ tagName: 'img', attribs: { ...attrs, loading: 'lazy' } })
    }
  });
}

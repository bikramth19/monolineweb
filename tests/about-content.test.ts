import { strict as assert } from 'node:assert';
import { test } from 'node:test';
import { splitAboutContent } from '../lib/about-content';

test('extracts editable About sections without losing other content or subheadings', () => {
  const result = splitAboutContent('<h2>Introduction</h2><p>Welcome</p><h2>Who <strong>We Are</strong></h2><p>Our team</p><h3>Our approach</h3><p>Care</p><h2>Our Mission</h2><p>Our goal</p><h2>Why Choose Monoline?</h2><p>Our support</p><h2>Who We Serve</h2><ul><li>Businesses</li></ul><h2>Contact</h2><p>Get in touch</p>');
  assert.match(result.remaining, /Welcome/);
  assert.match(result.remaining, /Our Mission/);
  assert.match(result.remaining, /Get in touch/);
  assert.doesNotMatch(result.remaining, /Our team|Our support|Businesses/);
  assert.match(result.cards[0].html, /Our team.*Our approach.*Care/);
  assert.match(result.cards[1].html, /Our support/);
  assert.match(result.cards[2].html, /Businesses/);
});

test('uses defaults for missing sections and sanitizes extracted content', () => {
  const result = splitAboutContent('<h2>Who We Are</h2><p>Hello<script>alert(1)</script></p><h2>Other</h2><p>Kept</p>');
  assert.doesNotMatch(result.cards[0].html, /script|alert/);
  assert.match(result.cards[1].html, /Why Choose Monoline/);
  assert.match(result.cards[2].html, /Who We Serve/);
  assert.match(result.remaining, /Kept/);
});

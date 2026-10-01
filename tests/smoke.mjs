import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import handler from '../api/reply.js';

const root = path.resolve(import.meta.dirname, '..');
const index = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const app = fs.readFileSync(path.join(root, 'app.js'), 'utf8');
const styles = fs.readFileSync(path.join(root, 'styles.css'), 'utf8');
const manifest = JSON.parse(fs.readFileSync(path.join(root, 'manifest.webmanifest'), 'utf8'));

for (const text of ['Willow', 'Openers', 'Games', 'Generate 5 replies', 'Personalised', 'Reply', 'Starters']) {
  assert.ok(index.includes(text), `index.html should include ${text}`);
}

assert.ok(!index.toLowerCase().includes('gemini api key'), 'Gemini API key must not appear in the UI');
assert.ok(app.includes("'New person', 'Crush', 'Dating', 'Friend'"), 'Openers should separate audience from opener style');
assert.ok(app.includes("'All', 'Casual', 'Funny', 'Flirty', 'Deep'"), 'Openers should include All and multiple styles');
assert.ok(app.includes('generateOpeners'), 'Openers should support AI generation');
assert.ok(app.includes("'School'"), 'School category should exist');
assert.ok(app.includes("'All games'"), 'Game generation support should remain available');
assert.ok(app.includes("'Nigerian life', 'All games'"), 'Starters quick categories should expose Games');
assert.ok(index.includes('<h3>Games</h3>'), 'Conversation games should remain available inside Starters');
assert.ok(index.includes('id="gameCategoryGrid"'), 'Conversation game category grid should exist');
assert.ok(app.includes('5, 10, 15, 25, 30, 50'), 'All fresh-set sizes should exist');
assert.ok(app.includes('Truth or Dare'), 'Truth or Dare should exist');
assert.ok(app.includes('Red Flag, Green Flag or Depends?'), 'Red flag game should exist');
assert.ok(styles.includes('html[data-theme="dark"] .reply-intents .chip'), 'Dark reply chip contrast must be scoped');
assert.ok(styles.includes('html[data-theme="dark"] .opener-audiences .chip'), 'Dark opener chip contrast must be scoped');
assert.ok(styles.includes('repeat(6, 1fr)'), 'Bottom navigation should make room for Openers');
assert.equal(manifest.short_name, 'Willow');

function mockResponse() {
  return {
    statusCode: 200,
    headers: {},
    body: undefined,
    setHeader(key, value) { this.headers[key] = value; },
    status(code) { this.statusCode = code; return this; },
    json(value) { this.body = value; return this; },
    end() { return this; }
  };
}

{
  const res = mockResponse();
  await handler({ method: 'GET' }, res);
  assert.equal(res.statusCode, 405);
  assert.match(res.headers.Allow, /POST/);
}

{
  const res = mockResponse();
  await handler({ method: 'OPTIONS' }, res);
  assert.equal(res.statusCode, 204);
}

{
  const old = process.env.GEMINI_API_KEY;
  delete process.env.GEMINI_API_KEY;
  delete process.env.GOOGLE_AI_API_KEY;
  delete process.env.GOOGLE_API_KEY;
  const res = mockResponse();
  await handler({ method: 'POST', body: { parts: [{ text: 'hello' }] } }, res);
  assert.equal(res.statusCode, 500);
  assert.notEqual(res.statusCode, 405, 'POST must never fall through to Method not allowed');
  if (old) process.env.GEMINI_API_KEY = old;
}

console.log('Willow smoke tests passed.');

assert.ok(!index.includes('the right words, gently</small>'), 'Header tagline should be removed from the production UI');
assert.ok(!index.includes('Private by default'), 'Implementation copy should not appear in production settings');
assert.ok(!index.includes('Pick a game, add the players'), 'Redundant game helper copy should be removed');
assert.ok(!index.includes('Pick a topic, get one natural question'), 'Redundant starter helper copy should be removed');

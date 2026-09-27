import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync } from 'node:fs';
import { sections } from '../src/content/sections.js';
import { imageManifest } from '../src/generated/image-manifest.js';

const types = new Set(['story', 'dissertation', 'skills', 'contact']);
const ids = new Set(sections.map(section => section.id));
const publicFile = value => new URL(`../public/${value.replace(/^\.\//, '')}`, import.meta.url);

test('section configuration has unique stable anchors and usable content', () => {
  assert.equal(ids.size, sections.length);
  for (const id of ['panel-6', 'dissertation', 'panel-5', 'panel-4', 'panel-3', 'panel-2', 'panel-1', 'panel-0']) assert.ok(ids.has(id), `Missing shared anchor: ${id}`);
  for (const section of sections) {
    assert.ok(types.has(section.type), `Unknown type for ${section.id}`);
    assert.ok(section.title);
    if (section.type === 'story') {
      assert.ok(section.blocks.length);
      for (const block of section.blocks) {
        assert.ok(block.desktop?.trim(), `${section.id} is missing desktop copy`);
        assert.ok(block.mobile?.trim(), `${section.id} is missing mobile copy`);
      }
    }
    if (section.type === 'dissertation') {
      assert.ok(section.abstract.desktop && section.abstract.mobile);
      assert.ok(section.stack.length && section.results.length && section.grade);
    }
    if (section.type === 'skills') assert.ok(section.groups.every(group => group.heading && group.items.length));
    if (section.type === 'contact') assert.deepEqual(section.fields.map(field => field.name), ['user_name', 'user_email', 'message']);
    for (const match of JSON.stringify(section).matchAll(/href=['"]#([^'"]+)/g)) assert.ok(ids.has(match[1]), `Broken internal link: ${match[1]}`);
  }
});

test('every configured image, responsive variant and PDF exists', () => {
  for (const section of sections) {
    for (const image of section.images || []) {
      assert.ok(existsSync(publicFile(image.src)), image.src);
      assert.ok(image.alt && image.caption);
      const asset = imageManifest[image.src];
      assert.ok(asset?.width > 0 && asset?.height > 0, `Missing metadata: ${image.src}`);
      for (const variant of asset.variants) assert.ok(existsSync(publicFile(variant.url)), variant.url);
    }
    if (section.document) {
      assert.ok(existsSync(publicFile(section.document.url)), section.document.url);
      assert.ok(section.document.filename && section.document.title);
    }
  }
});

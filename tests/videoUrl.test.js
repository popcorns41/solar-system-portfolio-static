import test from 'node:test';
import assert from 'node:assert/strict';
import { youtubeEmbedUrl } from '../src/utils/video-url.js';

test('YouTube watch, short and share URLs resolve to the same player', () => {
  const expected = 'https://www.youtube.com/embed/DzKbvQ7KY5g?rel=0&modestbranding=1';
  for (const url of [
    'https://youtube.com/shorts/DzKbvQ7KY5g?si=example',
    'https://www.youtube.com/watch?v=DzKbvQ7KY5g&t=1',
    'https://youtu.be/DzKbvQ7KY5g',
    'https://m.youtube.com/watch?v=DzKbvQ7KY5g',
    'https://www.youtube.com/embed/DzKbvQ7KY5g',
  ]) assert.equal(youtubeEmbedUrl(url), expected);
});

test('unrelated and incomplete URLs are not mistaken for YouTube', () => {
  for (const url of ['', 'not a URL', 'https://youtube.com/', 'https://youtube.com/watch', 'https://youtube.com.example.org/watch?v=abc', 'https://facebook.com/video']) assert.equal(youtubeEmbedUrl(url), null);
});

import test from 'node:test';
import assert from 'node:assert/strict';
import { playbackUrls } from '../src/lib/video.mjs';

test('YouTube uses the privacy-enhanced domain', () => {
  const video = playbackUrls('youtube', 'abcdefghijk');
  assert.equal(new URL(video.embed).hostname, 'www.youtube-nocookie.com');
  assert.equal(new URL(video.external).searchParams.get('v'), 'abcdefghijk');
});

test('invalid providers and IDs cannot become embed URLs', () => {
  for (const [provider, id] of [['youtube', '//evil.example'], ['vimeo', '123/abc'], ['drive', '<script>'], ['unknown', 'abcdefghijk']]) {
    assert.throws(() => playbackUrls(provider, id));
  }
});

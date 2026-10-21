import test from 'node:test';
import assert from 'node:assert/strict';
import {readJsonRequest} from '../lib/request-json.ts';

test('accepts a valid application/json request', async () => {
  const result=await readJsonRequest(new Request('https://example.test/api',{method:'POST',headers:{'content-type':'application/json; charset=utf-8'},body:'{"ok":true}'}));
  assert.deepEqual(result,{ok:true,value:{ok:true}});
});

test('rejects malformed JSON and non-JSON content', async () => {
  assert.deepEqual(await readJsonRequest(new Request('https://example.test/api',{method:'POST',headers:{'content-type':'application/json'},body:'{'})),{ok:false});
  assert.deepEqual(await readJsonRequest(new Request('https://example.test/api',{method:'POST',headers:{'content-type':'text/plain'},body:'{"ok":true}'})),{ok:false});
});

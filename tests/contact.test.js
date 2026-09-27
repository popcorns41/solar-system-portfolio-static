import test from 'node:test';
import assert from 'node:assert/strict';
import { bindContactForm } from '../src/services/contact.js';

function fakeForm() {
  const button = { textContent: 'Send Message', disabled: false };
  let submit;
  const form = { dataset: {}, resets: 0, querySelector: () => button, reset() { this.resets++; }, addEventListener(type, callback) { submit = callback; } };
  return { form, button, submit: () => submit({ preventDefault() {} }) };
}

test('contact submissions wait for the sender and prevent duplicate requests', async () => {
  const oldDocument = globalThis.document;
  globalThis.document = { getElementById: () => null };
  const { form, button, submit } = fakeForm();
  let resolve, calls = 0;
  try {
    bindContactForm(form, () => { calls++; return new Promise(done => { resolve = done; }); });
    bindContactForm(form, () => { throw new Error('bound twice'); });
    const pending = submit();
    assert.equal(button.disabled, true);
    await submit();
    assert.equal(calls, 1);
    resolve();
    await pending;
    assert.equal(form.resets, 1);
    assert.equal(button.disabled, false);
    assert.equal(button.textContent, 'Send Message');
  } finally {
    if (oldDocument === undefined) delete globalThis.document; else globalThis.document = oldDocument;
  }
});

test('failed submission keeps the draft and restores the send button', async () => {
  const oldAlert = globalThis.alert, oldError = console.error;
  let message;
  globalThis.alert = value => { message = value; };
  console.error = () => {};
  try {
    const { form, button, submit } = fakeForm();
    bindContactForm(form, async () => { throw new Error('offline'); });
    await submit();
    assert.equal(form.resets, 0);
    assert.equal(button.disabled, false);
    assert.equal(button.textContent, 'Send Message');
    assert.match(message, /try again/);
  } finally {
    console.error = oldError;
    if (oldAlert === undefined) delete globalThis.alert; else globalThis.alert = oldAlert;
  }
});

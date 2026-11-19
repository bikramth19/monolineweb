import { strict as assert } from 'node:assert';
import { test } from 'node:test';
import { contactSubmissionSchema } from '../lib/validation';

const valid = { name: '  Test Visitor  ', email: 'test@example.com', phone: '', subject: 'Enquiry', message: 'Hello' };

test('contact submissions trim input and allow an optional phone number', () => {
  const parsed = contactSubmissionSchema.parse(valid);
  assert.equal(parsed.name, 'Test Visitor');
  assert.equal(parsed.phone, '');
  assert.equal(contactSubmissionSchema.parse({ ...valid, phone: undefined }).phone, undefined);
});

test('contact submissions reject invalid or oversized fields', () => {
  for (const input of [
    { ...valid, email: 'invalid' },
    { ...valid, name: '  ' },
    { ...valid, subject: '' },
    { ...valid, message: 'x'.repeat(5001) },
    { ...valid, phone: '1'.repeat(41) }
  ]) {
    assert.equal(contactSubmissionSchema.safeParse(input).success, false);
  }
});

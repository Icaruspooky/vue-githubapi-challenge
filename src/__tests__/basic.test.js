const assert = require('assert');

/**
 * Load page recursive.
 */
const load = async () => {
  try {
    await page.goto('http://localhost:8080');
  } catch (e) {
    await load();
  }
};

const selector = '[data-test="entrada"]';

/**
 * Wait for selector or fail with message.
 */
const waitForSelector = async (selector, message) => {
  try {
    await page.waitForSelector(selector);
  } catch (e) {
    assert(false, message);
  }
};

/**
 * Find input.
 */
const findInput = async () => {
  await waitForSelector(selector, 'Could not find input');

  return page.$(selector);
};

describe('GitHub', () => {
  beforeEach(load);

  it('should have input in page', async () => {
    const input = await findInput();
  });
});

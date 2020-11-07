// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';
import '@testing-library/jest-dom/extend-expect';

import server from './testing/api';

// Set up a mock API server globally, so that our API is mocked across all test suites
beforeAll(() => {
  server.listen();
});

// Reset REST handlers after each test
afterEach(() => {
  server.resetHandlers();
});

afterAll(() => {
  server.close();
});

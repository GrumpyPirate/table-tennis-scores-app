import { render } from '@testing-library/react';
import React from 'react';

import Container from './Container';

describe('Components/Grid/Container', () => {
  test('should render as expected, without crashing', () => {
    const { container } = render(
      <Container>
        <div>Some content</div>
      </Container>
    );

    expect(container.firstChild).toMatchSnapshot();
  });
});

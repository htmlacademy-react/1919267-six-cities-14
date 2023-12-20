import {render, screen} from '@testing-library/react';
import { Spinner } from './spinner';

describe('Component: Spinner', () => {
  it('should render correct', () => {
    const spinnerContainerTestId = 'spinner-container';

    render(<Spinner />);
    const spinnerContainer = screen.getByTestId(spinnerContainerTestId);
    expect(spinnerContainer).toBeInTheDocument();
  });
});

import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn webchat heading', () => {
  render(<App />);
  const linkElement = screen.getByText(/webchat/i);
  expect(linkElement).toBeInTheDocument();
});
;

import { render, screen } from '@testing-library/react';
import App from './App';

test('renders the Home link in the navigation', () => {
    render(<App />);
    const linkElement = screen.getByText(/Home/i);
    expect(linkElement).toBeInTheDocument();
});

test('renders the Welcome to Emotionary heading', () => {
    render(<App />);
    const headingElement = screen.getByText(/Welcome to Emotionary/i);
    expect(headingElement).toBeInTheDocument();
});

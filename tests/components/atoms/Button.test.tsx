import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Button from '../../../src/components/atoms/Button'

describe('Button component', () => {
  it('renders with given text', () => {
    render(<Button buttonText="Click me" level="primary" />);
    expect(screen.getByRole('button', { name: /click me/i })).toBeInTheDocument();
  });

  it('applies primary styles when level is "primary"', () => {
    render(<Button buttonText="Primary" level="primary" />);
    const button = screen.getByRole('button');
    expect(button.className).toMatch(/bg-green-700/);
  });

  it('applies secondary styles when level is not "primary"', () => {
    render(<Button buttonText="Secondary" level="secondary" />);
    const button = screen.getByRole('button');
    expect(button.className).toMatch(/bg-gray-200/);
  });

  it('calls onClick when clicked', () => {
    const handleClick = jest.fn();
    render(<Button buttonText="Click me" level="primary" onClick={handleClick} />);
    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('forwards other button props', () => {
    render(<Button buttonText="Disabled" level="primary" disabled />);
    expect(screen.getByRole('button')).toBeDisabled();
  });
});

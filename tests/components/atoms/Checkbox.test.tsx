import { screen, fireEvent, render} from '@testing-library/react';
import Checkbox from '../../../src/components/atoms/Checkbox'
import '@testing-library/jest-dom';


describe('Checkbox component', () => {
  it('renders with given text', () => {
    const onClick = jest.fn();
    render(<Checkbox label='check me' checked={true} onChange={onClick} />);
    expect(screen.getByText('check me')).toBeVisible();
  })

  it('displays checked when checked true', () => {
    const onClick = jest.fn();
    render(<Checkbox label='check me' checked={true} onChange={onClick} />);
    const checkedDisplay = screen.getByTestId('checked-icon');
    expect(checkedDisplay).toBeVisible();
  })

  it('displays checked when checked not true', () => {
    const onClick = jest.fn();
    render(<Checkbox label='check me' checked={false} onChange={onClick} />);
    const checkedDisplay = screen.getByTestId('unchecked-icon');
    expect(checkedDisplay).toBeVisible();
  })

  it('calls onClick when called', () => {
    const onClick = jest.fn();
    render(<Checkbox label='check me' checked={true} onChange={onClick} />);
    fireEvent.click(screen.getByRole('button'));
    expect(onClick).toHaveBeenCalledTimes(1);
  })

  it('can be disabled', () => {
    const onClick = jest.fn();
    render(<Checkbox label='check me' checked={true} onChange={onClick} disabled={true} />);
    expect(screen.getByRole('button')).toBeDisabled();
  })

  it('default is enabled', () => {
    const onClick = jest.fn();
    render(<Checkbox label='check me' checked={true} onChange={onClick} />);
    expect(screen.getByRole('button')).not.toBeDisabled();
  })
});
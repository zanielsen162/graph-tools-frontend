import { screen, fireEvent, render} from '@testing-library/react';
import Dropdown from '../../../src/components/atoms/Dropdown'
import '@testing-library/jest-dom';

const options = [
  { value: 'one', label: 'Option One' },
  { value: 'two', label: 'Option Two' },
];

describe('Dropdown', () => {
  it('renders label and placeholder text when no value selected', () => {
    const onChange = jest.fn();
    render(
        <Dropdown 
            options={options} 
            label="Test Label" 
            value="" 
            onChange={onChange} 
        />
    );
    expect(screen.getByText('Test Label')).toBeInTheDocument();
    expect(screen.getByText('Select an option...')).toBeInTheDocument();
  });

  it('renders the selected option label when value is set', () => {
    const onChange = jest.fn();
    render(
        <Dropdown 
            options={options} 
            label="Test Label" 
            value="two" 
            onChange={onChange} 
        />
    );
    expect(screen.getByText('Option Two')).toBeInTheDocument();
  });

  it('toggles dropdown open and close when main button clicked', () => {
    const onChange = jest.fn();
    render(
        <Dropdown 
            options={options} 
            label="Test Label" 
            value="" 
            onChange={onChange} 
        />
    );
    const toggleBtn = screen.getByRole('button', { name: /select an option.../i });
    expect(screen.queryByRole('list')).not.toBeInTheDocument();
    fireEvent.click(toggleBtn);
    expect(screen.getByRole('list')).toBeInTheDocument();
    fireEvent.click(toggleBtn);
    expect(screen.queryByRole('list')).not.toBeInTheDocument();
  });

  it('calls onChange with selected value and closes dropdown', () => {
    const onChange = jest.fn();
    render(
        <Dropdown 
            options={options} 
            label="Test Label" 
            value="" 
            onChange={onChange} 
        />
    );

    fireEvent.click(screen.getByRole('button', { name: /select an option.../i }));
    const optionBtn = screen.getByRole('button', { name: 'Option One' });
    fireEvent.click(optionBtn);
    expect(onChange).toHaveBeenCalledWith('one');
    expect(screen.queryByRole('list')).not.toBeInTheDocument();
  });

  it('calls randomFunc when called', () => {
    const onChange = jest.fn();
    const randomFunc = jest.fn();
    render(
        <Dropdown
            options={options} 
            label="Test Label" 
            value="" 
            onChange={onChange} 
            randomFunc={randomFunc}
        />
    );

    fireEvent.click(screen.getByTestId('random-btn'));
    expect(randomFunc).toHaveBeenCalledTimes(1);
  })

  it('shows correct arrow icon based on dropdown state', () => {
    const onChange = jest.fn();
    render(
        <Dropdown 
            options={options} 
            label="Test Label" 
            value="" 
            onChange={onChange} 
        />
    );
    expect(screen.getByTestId('down-arrow')).toBeInTheDocument();
    const toggleBtn = screen.getByTestId('toggle-dropdown');
    fireEvent.click(toggleBtn);
    expect(screen.getByTestId('up-arrow')).toBeInTheDocument();
  });
});

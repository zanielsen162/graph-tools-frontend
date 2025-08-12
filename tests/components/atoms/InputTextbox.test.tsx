import { screen, fireEvent, render} from '@testing-library/react';
import InputTextbox from '../../../src/components/atoms/InputTextbox'
import '@testing-library/jest-dom';


describe('InputTextbox component', () => {
  it('displays spinner when numeric', () => {
    const onChange = jest.fn();
    render(
        <InputTextbox
            placeholder='type here'
            type='numeric'
            label='answer'
            value={0}
            onChange={onChange}
        />
    );

    const upArrow = screen.getByTestId('up-arrow');
    const downArrow = screen.getByTestId('down-arrow');
    expect(upArrow).toBeVisible();
    expect(downArrow).toBeVisible();
  })

  it('does not display spinner when numeric', () => {
    const onChange = jest.fn();
    render(
        <InputTextbox
            placeholder='type here'
            type='text'
            label='answer'
            value=''
            onChange={onChange}
        />
    );
    
    expect(screen.queryByTestId('up-arrow')).not.toBeInTheDocument();
    expect(screen.queryByTestId('down-arrow')).not.toBeInTheDocument();
  })

  it('calls onChange when called', () => {
    const onChange = jest.fn();
    render(
        <InputTextbox
            placeholder='type here'
            type='text'
            label='answer'
            value=''
            onChange={onChange}
        />
    );
    const textbox = screen.getByTestId('input-textbox');
    fireEvent.change(textbox, { target: { value: 'New text value' } });
    expect(onChange).toHaveBeenCalledTimes(1);
  })

  it('calls randomFunc when called', () => {
    const onChange = jest.fn();
    const randomFunc = jest.fn();
    render(
        <InputTextbox
            placeholder='type here'
            randomFunc={randomFunc}
            type='text'
            label='answer'
            value=''
            onChange={onChange}
        />
    );
    fireEvent.click(screen.getByRole('button'));
    expect(randomFunc).toHaveBeenCalledTimes(1);
  })
});
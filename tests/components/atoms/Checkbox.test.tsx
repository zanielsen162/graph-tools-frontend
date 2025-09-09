import { screen, fireEvent, render} from '@testing-library/react';
import Checkbox from '../../../src/components/atoms/Checkbox'
import '@testing-library/jest-dom';

describe("Checkbox component", () => {
  it("renders unchecked icon by default", () => {
    render(<Checkbox checked={false} />);
    expect(screen.getByTestId("unchecked-icon")).toBeInTheDocument();
  });

  it("renders checked icon when checked=true", () => {
    render(<Checkbox checked={true} />);
    expect(screen.getByTestId("checked-icon")).toBeInTheDocument();
  });

  it("renders label when provided", () => {
    render(<Checkbox checked={false} label="My label" />);
    expect(screen.getByText("My label")).toBeInTheDocument();
  });

  it("applies line-through when strikethrough=true", () => {
    render(<Checkbox checked={false} label="Strike me" strikethrough />);
    const label = screen.getByText("Strike me");
    expect(label).toHaveClass("line-through");
  });

  it("does not call onChange when disabled=true", () => {
    const handleChange = jest.fn();
    render(<Checkbox checked={false} onChange={handleChange} disabled />);
    fireEvent.click(screen.getByTestId("unchecked-icon"));
    expect(handleChange).not.toHaveBeenCalled();
  });

  it("calls onChange with opposite value when clicked", () => {
    const handleChange = jest.fn();
    render(<Checkbox checked={false} onChange={handleChange} />);
    fireEvent.click(screen.getByTestId("unchecked-icon"));
    expect(handleChange).toHaveBeenCalledWith(true);
  });

  it("renders stacked layout when stacked=true", () => {
    render(<Checkbox checked={false} label="Stacked label" stacked />);
    const container = screen.getByText("Stacked label").closest("div");
    expect(container).toHaveClass("flex-col");
  });

  it("forces disabled when strikethrough=true", () => {
    const handleChange = jest.fn();
    render(
      <Checkbox checked={false} label="Forced disable" strikethrough onChange={handleChange} />
    );
    fireEvent.click(screen.getByTestId("unchecked-icon"));
    expect(handleChange).not.toHaveBeenCalled();
  });
});
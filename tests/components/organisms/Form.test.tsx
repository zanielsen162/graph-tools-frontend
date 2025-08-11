import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Form from '../../../src/components/organisms/Form'

const TestingComponent = ({ text } : { text: string }) => {
    return (
        <p>{text}</p>
    )
}

const n = 10;
const testingText = [...Array(n)].map((_, i) => `item ${i}`);

describe('Form component', () => {
    it('displays all components', () => {
        render(
            <Form
                entries={testingText.map((i, _) => (
                    <TestingComponent text={i} />
                ))}
            />
        )

        testingText.forEach(item => {
            expect(screen.getByText(item)).toBeInTheDocument();
        })
    })
});
import { screen, render} from '@testing-library/react';
import FormRow from '../../../src/components/molecules/FormRow';
import '@testing-library/jest-dom';

const testingComponent = (text: string) => {
    return (
        <p>{text}</p>
    )
}

describe('FormRow component', () => {
    it('displays all components', () => {
        render(
            <FormRow
                entries={[
                    testingComponent('render me'),
                    testingComponent('render me too'),
                    testingComponent('render me also')
                ]}
            />
        )
        expect(screen.getAllByTestId('row-comp')).toHaveLength(3);
        expect(screen.getByText('render me')).toBeInTheDocument();
        expect(screen.getByText('render me too')).toBeInTheDocument();
        expect(screen.getByText('render me also')).toBeInTheDocument();
    })
})
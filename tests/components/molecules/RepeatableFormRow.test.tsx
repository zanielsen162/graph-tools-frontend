import { screen, fireEvent, render} from '@testing-library/react';
import RepeatableFormRow from '../../../src/components/molecules/RepeatableFormRow'
import '@testing-library/jest-dom';
import { useState } from 'react'

type TestData =  {
    label: string,
    description: string,
    amount: number
}

const testData: TestData[] = [
    {
        label: 'entry1',
        description: 'first entry',
        amount: 1
    },
    {
        label: 'entry2',
        description: 'second entry',
        amount: 2
    }
]

function TestWrapper() {
    const [testDataPrime, setTestData] = useState<TestData[]>(testData)

    return (
        <RepeatableFormRow
            data={testDataPrime}
            setData={setTestData}
            createEmpty={() => { return { label:'', description:'', amount:0 }; }}
            fields={[
                (entry, index, update) => (
                    <input
                        data-testid='label-input'
                        key={`label-${index}`}
                        value={entry.label}
                        placeholder="Label"
                        onChange={(e) => update(index, 'label', e.target.value)}
                    />
                ),
                (entry, index, update) => (
                    <input
                        data-testid='description-input'
                        key={`description-${index}`}
                        value={entry.description}
                        placeholder="Description"
                        onChange={(e) => update(index, 'description', e.target.value)}
                    />
                ),
                (entry, index, update) => (
                    <input
                        data-testid='amount-input'
                        key={`amount-${index}`}
                        type="number"
                        value={entry.amount}
                        placeholder="Amount"
                        onChange={(e) => update(index, 'amount', parseInt(e.target.value, 10) || 0)}
                    />
                ),
            ]}
        />
    )
}

describe('RepeatableFormRow component', () => {
    const setData = jest.fn()

    it('displays form row', () => {
        render(
            <RepeatableFormRow
                data={testData}
                setData={setData}
                createEmpty={() => { return { label:'', description:'', amount:0 }; }}
                fields={[
                    (entry, index, update) => (
                        <input
                            data-testid='label-input'
                            key={`label-${index}`}
                            value={entry.label}
                            placeholder="Label"
                            onChange={(e) => update(index, 'label', e.target.value)}
                        />
                    ),
                    (entry, index, update) => (
                        <input
                            data-testid='description-input'
                            key={`description-${index}`}
                            value={entry.description}
                            placeholder="Description"
                            onChange={(e) => update(index, 'description', e.target.value)}
                        />
                    ),
                    (entry, index, update) => (
                        <input
                            data-testid='amount-input'
                            key={`amount-${index}`}
                            type="number"
                            value={entry.amount}
                            placeholder="Amount"
                            onChange={(e) => update(index, 'amount', parseInt(e.target.value, 10) || 0)}
                        />
                    ),
                ]}
            />
        )
        expect(screen.getAllByTestId('label-input')).toHaveLength(testData.length);
        expect(screen.getAllByTestId('description-input')).toHaveLength(testData.length);
        expect(screen.getAllByTestId('amount-input')).toHaveLength(testData.length);
    });

    it('can add and remove rows', () => {
        render(<TestWrapper />);

        const add = screen.getByTestId('add-entry')
        const remove = screen.getByTestId('remove-entry')

        fireEvent.click(add)
        expect(screen.getAllByTestId('label-input')).toHaveLength(testData.length + 1);

        let counter = 0;
        while (testData.length - counter > 0) {
            fireEvent.click(remove)
            expect(screen.getAllByTestId('label-input')).toHaveLength(testData.length - counter);
            counter++;
        }

        fireEvent.click(remove)
        expect(screen.queryByTestId('label-input')).not.toBeInTheDocument();
    });

    it('can create empty structures', () => {
        const setData = jest.fn()
        const createEmpty = jest.fn()

        render(
            <RepeatableFormRow
                data={testData}
                setData={setData}
                createEmpty={createEmpty}
                fields={[
                    (entry, index, update) => (
                        <input
                            data-testid='label-input'
                            key={`label-${index}`}
                            value={entry.label}
                            placeholder="Label"
                            onChange={(e) => update(index, 'label', e.target.value)}
                        />
                    ),
                    (entry, index, update) => (
                        <input
                            data-testid='description-input'
                            key={`description-${index}`}
                            value={entry.description}
                            placeholder="Description"
                            onChange={(e) => update(index, 'description', e.target.value)}
                        />
                    ),
                    (entry, index, update) => (
                        <input
                            data-testid='amount-input'
                            key={`amount-${index}`}
                            type="number"
                            value={entry.amount}
                            placeholder="Amount"
                            onChange={(e) => update(index, 'amount', parseInt(e.target.value, 10) || 0)}
                        />
                    ),
                ]}
            />
        )

        const add = screen.getByTestId('add-entry')
        fireEvent.click(add)
        expect(createEmpty).toHaveBeenCalledTimes(1);
        expect(setData).toHaveBeenCalledTimes(1);
    })
})
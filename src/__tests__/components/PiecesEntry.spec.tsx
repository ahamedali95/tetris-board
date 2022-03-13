import React from 'react';
import { screen, render, RenderResult, fireEvent } from '@testing-library/react';
import PiecesEntry, {PiecesEntryProps} from '../../components/PiecesEntry';

describe('PiecesEntry Component', () => {
    let component: RenderResult;
    const mockHandleChange: jest.Mock = jest.fn();
    const mockHandleClickMock: jest.Mock = jest.fn();
    const properties: PiecesEntryProps = {
        handleChange: mockHandleChange,
        handleClick: mockHandleClickMock,
        value: '',
    };
    const getComponent = (properties: PiecesEntryProps): JSX.Element => {
        return <PiecesEntry {...properties} />;
    };

    beforeEach(() => {
        component = render(getComponent(properties));
    });

    it('should render the subtitle and description', () => {
        expect(screen.getByText('Enter the tetris pieces to be drawn') as HTMLHeadingElement).toBeInTheDocument();
        expect(screen.getByText('Entry must be in the following format: "T1,Z3,I4". Comma separated values, no spaces. Give it a try!') as HTMLHeadingElement).toBeInTheDocument();
    });

    it('should render an entry field to enter piece details', () => {
        expect(screen.getByLabelText('piecesEntry').querySelector('input') as HTMLInputElement).toBeInTheDocument();
    });

    it('should render a button to begin drawing the tetris', () => {
        const drawBtn = screen.getByRole('button', { name: 'Draw' }) as HTMLButtonElement;

        expect(drawBtn).toBeInTheDocument();
        expect(drawBtn).toBeDisabled();
    });


    it('should handle scenario when invalid pieces information is provided', async () => {
        component.rerender(getComponent({ ...properties, value: '1A' }));
        const drawBtn = screen.getByRole('button', { name: 'Draw' }) as HTMLButtonElement;

        expect(drawBtn).toBeDisabled();

        component.rerender(getComponent({ ...properties, value: 'J3,L4,Z1' }));
        expect(drawBtn).toBeEnabled();
    });

    it('should call ~mockHandleChange~ when entry is done', () => {
        fireEvent.change(screen.getByLabelText('piecesEntry').querySelector('input') as HTMLInputElement, { target: { value: 'Q4,Z4' } });

        expect(mockHandleChange).toHaveBeenCalledWith('Q4,Z4');
    });

    it('should call ~mockHandleClick~ when submit button is clicked', () => {
        component.rerender(getComponent({ ...properties, value: 'Q4,Z4' }));
        fireEvent.click(screen.getByRole('button', { name: 'Draw' }) as HTMLButtonElement);

        expect(mockHandleClickMock).toHaveBeenCalled();
    });
});
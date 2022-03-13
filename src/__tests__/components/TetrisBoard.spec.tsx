import React from 'react';
import { screen, render, RenderResult } from '@testing-library/react';
import TetrisBoard, { TetrisBoardProps } from '../../components/TetrisBoard';

describe('TetrisBoard Component', () => {
    let component: RenderResult;
    const mockResetDrawTetris: jest.Mock = jest.fn();
    const properties: TetrisBoardProps = {
        drawTetris: false,
        resetDrawTetris: mockResetDrawTetris,
        inputValue: 'Q1,Z3,T7'
    };
    const getComponent = (properties: TetrisBoardProps): JSX.Element => {
        return <TetrisBoard {...properties} />;
    };

    beforeEach(() => {
        component = render(getComponent(properties));
    });

    it('should render the canvas', () => {
        expect(screen.getByTestId('main-canvas') as HTMLCanvasElement).toBeInTheDocument();
    });


    it('should render the height of the tetris board', () => {
        expect(screen.getByText('Height: 0') as HTMLHeadingElement).toBeInTheDocument();
    });
});
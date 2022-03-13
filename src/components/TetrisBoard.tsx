import React, {useRef, useLayoutEffect, useEffect, useState, memo} from 'react';
import {Typography, Box, Button} from '@material-ui/core';
import getImages from '../utils/getImages';
import { default as MyImage } from '../entities/Image';
import { TetrisBuilder, Row } from '../utils/TetrisBuilder';

export type TetrisBoardProps = {
    inputValue: string;
    drawTetris: boolean;
    resetDrawTetris: (val: boolean) => unknown;
};

const TetrisBoard: React.FC<TetrisBoardProps> = ({ inputValue, drawTetris, resetDrawTetris }) => {
    const canvasRef = useRef<null | HTMLCanvasElement>();
    const context = useRef<null | CanvasRenderingContext2D>();
    const loadedImages = useRef<Record<string, HTMLImageElement>>({});
    const [ tetrisHeight, setTetrisHeight ] = useState<number>(0);
    const [ width, height ] = [ 500, 5050 ];

    const preloadImages = async (): Promise<void> => {
        await Promise.all(getPromises(getImages) as Promise<HTMLImageElement>[]);
    };

    const getPromises = (images: MyImage[]): Promise<HTMLImageElement>[] => {
        return images.map((imageObj: MyImage) => {
            return new Promise((resolve, reject) => {
                const image: HTMLImageElement = new Image();

                image.onload = (): void => {
                    loadedImages.current[imageObj.getName()] = image;
                    resolve(image);
                };

                image.onerror = (): void => {
                    reject();
                };

                image.src = imageObj.getUrl();
            });
        });
    };

    useEffect((): void => {
        preloadImages();
    }, []);

    useEffect((): void => {
        if (drawTetris) {
            //redraw
            initBoard();

            const builder = new TetrisBuilder(inputValue);

            builder.getRows().forEach((row: Row[]): void => {
                row.forEach((ele: Row): void => {
                    ele && drawImage(loadedImages.current[`${ele.type.toLowerCase()}Tile`], 50 * ele.x, height - (50 * (ele.y + 1)), 50, 50);
                });
            });
            setTetrisHeight(builder.getTetrisHeight());
            window.scrollTo({
                top: canvasRef.current.offsetHeight,
                left: 0,
                behavior: 'smooth'
            });
            console.log(builder.getRows());
            resetDrawTetris(false);
        }
    }, [drawTetris]);

    useLayoutEffect((): void => {
        context.current = canvasRef.current.getContext('2d');
        initBoard();
    }, []);

    const drawImage = (image: HTMLImageElement, x: number, y: number, width: number, height: number): void => {
        context.current.drawImage(image, x, y, width, height);
    };

    const drawBoard = (): void => {
        const p = 0.1;

        for (let x = 0; x <= width; x += 50) {
            context.current.moveTo(0.5 + x + p, p);
            context.current.lineTo(0.5 + x + p, height + p);
        }

        for (let x = 0; x <= height; x += 50) {
            context.current.moveTo(p, 0.5 + x + p);
            context.current.lineTo(width + p, 0.5 + x + p);
        }

        context.current.strokeStyle = 'black';
        context.current.stroke();
    };

    const initBoard = (): void => {
        context.current.clearRect(0, 0, width, height);
        drawBoard();
    };

    return (
        <>
            <Box mt={1} />
            <canvas
                data-testid="main-canvas"
                ref={canvasRef}
                height={height}
                width={width}
                style={{ border: '2px solid #000000' }}
            />
            <Box mt={2} />
            <Typography variant='h5'>{`Height: ${tetrisHeight}`}</Typography>
            <Button
                type='button'
                onClick={() => window.scrollTo({
                    top: 0,
                    left: 0,
                    behavior: 'smooth'
                })}
            >
                Scroll to Top
            </Button>
        </>
    );
};

export default memo(TetrisBoard);
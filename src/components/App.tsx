import React, {useCallback, useState} from 'react';
import {Typography, Grid, Box} from '@material-ui/core';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import PiecesEntry from './PiecesEntry';
import TetrisBoard from './TetrisBoard';

const useHomeStyles = makeStyles((theme: Theme) => createStyles({
    root: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%'
    },
    logo: {
        color: theme.palette.primary.main,
        fontWeight: 500,
        textShadow: '2px 2px #000000',
        fontStyle: 'italic'
    }
}));

const App: React.FC = () => {
    const classes = useHomeStyles();
    const [ inputValue, setInputValue ] = useState<string>('');
    const [ drawTetris, setDrawTetris ] = useState<boolean>(false);

    const handleEntryChange = useCallback((value: string): void => {
        setInputValue(value);
    }, []);

    const handleDrawClick = useCallback((): void => {
        setDrawTetris(true);
    }, []);

    return (
        <Grid
            className={classes.root}
            container
            direction='column'
            spacing={3}
        >
            <Typography
                className={classes.logo}
                variant='h1'
            >
                Tetris Board
            </Typography>
            <PiecesEntry
                handleChange={handleEntryChange}
                handleClick={handleDrawClick}
                value={inputValue}
            />
            <Box mt={2} />
            <TetrisBoard
                inputValue={inputValue}
                drawTetris={drawTetris}
                resetDrawTetris={setDrawTetris}
            />
        </Grid>
    );
};

export default App;
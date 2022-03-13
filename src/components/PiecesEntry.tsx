import React, {ChangeEvent, memo, useMemo} from 'react';
import { Typography, Box, TextField, Grid, Button, Paper } from '@material-ui/core';
import { makeStyles, createStyles } from '@material-ui/core/styles';

export type PiecesEntryProps = {
    handleChange: (value: string) => unknown;
    handleClick: () => unknown;
    value: string;
};

const usePiecesEntryStyles = makeStyles(() => createStyles({
    root: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '10px',
        margin: '25px',
        width: '50%',
        height: '90%'
    },
    subtitle: {
        fontWeight: 300
    },
    entry: {
        border: '3px solid #bbb',
        width: '100%'
    },
    entryInvalid: {
        border: '3px solid #FF0000',
        width: '100%'
    },
    draw: {
        width: '100%',
        height: '100%'
    },
    helperText: {
        color: '#FF0000'
    }
}));

const PiecesEntry: React.FC<PiecesEntryProps> = ({ value, handleChange, handleClick }) => {
    const classes = usePiecesEntryStyles();

    const isEntryValid = useMemo((): boolean => {
        const regex = /^([IJLQSTZ]{1}[0-9]{1},)*[IJLQSTZ]{1}[0-9]{1}$/;

        return regex.test(value);
    }, [ value ]);

    return (
        <Paper
            className={classes.root}
            elevation={2}
        >
            <Typography
                className={classes.subtitle}
                variant='h4'
            >
                Enter the tetris pieces to be drawn
            </Typography>
            <Grid
                container
                item
                spacing={1}
            >
                <Grid
                    item
                    xs={9}
                >
                    <TextField
                        className={classes.entry}
                        focused
                        onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(e.target.value)}
                        value={value}
                        InputProps={{
                            disableUnderline: true,
                            'aria-label': 'piecesEntry'
                        }}
                    />
                </Grid>
                <Grid
                    item
                    xs={3}
                >
                    <Button
                        className={classes.draw}
                        color="primary"
                        disabled={!value || !isEntryValid}
                        onClick={handleClick}
                        variant="contained"
                    >
                        Draw
                    </Button>
                </Grid>
            </Grid>
            <Box mt={2} />
            <Typography
                variant='subtitle1'
            >
                Entry must be in the following format: "T1,Z3,I4". Comma separated values, no spaces. Give it a try!
            </Typography>
        </Paper>
    );
};

export default memo(PiecesEntry);

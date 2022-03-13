export type Row = {
    type: string;
    pieceId: number;
    x: number;
    y: number;
};

export class TetrisBuilder {
    private rows: Row[][] = [];
    private MAX_X_COORDINATES = 9;
    private getId = this.generateUniqueId();
    private inputValues: string[] = [];

    constructor(inputValues: string) {
        //represent our grid as 2d arrays
        [...new Array(100).keys()].forEach(() => {
            this.rows.push([...new Array(10).keys()].map(() => null));
        });
        this.inputValues = inputValues.split(',');
        this.insertPieces();
    }

    getRows() {
        return this.rows;
    }
    
    //clear rows when it is fully occupied and update coordinates
    private clearRows() {
        const removedRecordIndex = [];
        let lastRemovedIndex = -1;
        const newRows = this.rows.filter((row: Row[], idx: number): boolean => {
            if (row.every(ele => ele)) {
                removedRecordIndex.push(idx);
                lastRemovedIndex = idx;
                return false;
            } else {
                return true;
            }
        }).map((row: Row[], idx: number): Row[] => {
            return row.map((ele: Row): Row => {
                if ((ele && removedRecordIndex.includes(idx)) || (ele && idx > lastRemovedIndex)) {
                    return {
                        ...ele,
                        y: ele.y - removedRecordIndex.length
                    };
                } else {
                    return ele;
                }
            });
        });

        if (newRows.length !== this.rows.length) {
            while (newRows.length !== 100) {
                newRows.push([...new Array(10).keys()].map(() => null));
            }
        }

        this.rows = newRows;
    }

    //generate id to provide to the blocks in a piece - finally used closure!
    private generateUniqueId(): () => number {
        let id = 0;
        return (): number => ++id;
    }

    getTetrisHeight(): number {
        return this.rows.reduce((accumulator: number, value: Row[]): number => {
            if (value.some(i => i)) {
                return ++accumulator;
            }

            return accumulator;
        }, 0);
    }
    
    private insertPieces(): void {
        for (let i = 0; i < this.inputValues.length; i++) {
            const pieceType: string = this.inputValues[i].charAt(0);
            const pieceStartingXLocation = Number(this.inputValues[i].charAt(1));

            let rowIndex = 0;
            let isSuitableRowFound = false;

            while (!isSuitableRowFound && rowIndex <= 99) {
                const currentRow = this.rows[rowIndex];

                switch (pieceType) {
                case 'I': {
                    if (pieceStartingXLocation + 3 <= this.MAX_X_COORDINATES) {
                        //check if desired horizontal indeces are empty
                        const valueAtindex1 = currentRow[pieceStartingXLocation];
                        const valueAtindex2 = currentRow[pieceStartingXLocation + 1];
                        const valueAtindex3 = currentRow[pieceStartingXLocation + 2];
                        const valueAtindex4 = currentRow[pieceStartingXLocation + 3];
                        const nothingAbove = this.rows.slice(rowIndex + 1).every(row => !row[pieceStartingXLocation]);

                        if (!valueAtindex1 && !valueAtindex2 && !valueAtindex3 && !valueAtindex4 && nothingAbove) {
                            const id = this.getId();

                            currentRow.splice(pieceStartingXLocation, 1, {
                                type: 'I',
                                pieceId: id,
                                x: pieceStartingXLocation,
                                y: rowIndex
                            });
                            currentRow.splice(pieceStartingXLocation + 1, 1, {
                                type: 'I',
                                pieceId: id,
                                x: pieceStartingXLocation + 1,
                                y: rowIndex
                            });
                            currentRow.splice(pieceStartingXLocation + 2, 1, {
                                type: 'I',
                                pieceId: id,
                                x: pieceStartingXLocation + 2,
                                y: rowIndex
                            });
                            currentRow.splice(pieceStartingXLocation + 3, 1, {
                                type: 'I',
                                pieceId: id,
                                x: pieceStartingXLocation + 3,
                                y: rowIndex
                            });

                            isSuitableRowFound = true;
                        }

                    }
                    rowIndex = rowIndex + 1;
                    this.clearRows();
                    break;
                }
                case 'L': {
                    if (pieceStartingXLocation + 1 <= this.MAX_X_COORDINATES) {
                        //check if desired horizontal and vertical indeces are empty

                        const valueAtindex1 = this.rows[rowIndex + 2][pieceStartingXLocation];
                        const valueAtindex2 = this.rows[rowIndex + 1][pieceStartingXLocation];
                        const valueAtindex3 = currentRow[pieceStartingXLocation];
                        const valueAtindex4 = currentRow[pieceStartingXLocation + 1];
                        const nothingAbove = this.rows.slice(rowIndex + 1).every(row => !row[pieceStartingXLocation]);

                        if (!valueAtindex1 && !valueAtindex2 && !valueAtindex3 && !valueAtindex4 && nothingAbove) {
                            const id = this.getId();

                            this.rows[rowIndex + 2].splice(pieceStartingXLocation, 1, {
                                type: 'L',
                                pieceId: id,
                                x: pieceStartingXLocation,
                                y: rowIndex + 2
                            });
                            this.rows[rowIndex + 1].splice(pieceStartingXLocation, 1, {
                                type: 'L',
                                pieceId: id,
                                x: pieceStartingXLocation,
                                y: rowIndex + 1
                            });
                            currentRow.splice(pieceStartingXLocation, 1, {
                                type: 'L',
                                pieceId: id,
                                x: pieceStartingXLocation,
                                y: rowIndex
                            });
                            currentRow.splice(pieceStartingXLocation + 1, 1, {
                                type: 'L',
                                pieceId: id,
                                x: pieceStartingXLocation + 1,
                                y: rowIndex
                            });

                            isSuitableRowFound = true;
                        }
                    }
                    rowIndex = rowIndex + 1;
                    this.clearRows();
                    break;
                }
                case 'Z': {
                    if (pieceStartingXLocation + 2 <= this.MAX_X_COORDINATES) {
                        //check if desired horizontal and vertical indeces are empty
                        const valueAtindex1 = currentRow[pieceStartingXLocation + 2];
                        const valueAtindex2 = currentRow[pieceStartingXLocation + 1];
                        const valueAtindex3 = this.rows[rowIndex + 1][pieceStartingXLocation + 1];
                        const valueAtindex4 = this.rows[rowIndex + 1][pieceStartingXLocation];
                        const nothingAbove = this.rows.slice(rowIndex + 1).every(row => !row[pieceStartingXLocation]);

                        if (!valueAtindex1 && !valueAtindex2 && !valueAtindex3 && !valueAtindex4 && nothingAbove) {
                            const id = this.getId();

                            currentRow.splice(pieceStartingXLocation + 2, 1, {
                                type: 'Z',
                                pieceId: id,
                                x: pieceStartingXLocation + 2,
                                y: rowIndex
                            });
                            currentRow.splice(pieceStartingXLocation + 1, 1, {
                                type: 'Z',
                                pieceId: id,
                                x: pieceStartingXLocation + 1,
                                y: rowIndex
                            });
                            this.rows[rowIndex + 1].splice(pieceStartingXLocation + 1, 1, {
                                type: 'Z',
                                pieceId: id,
                                x: pieceStartingXLocation + 1,
                                y: rowIndex + 1
                            });
                            this.rows[rowIndex + 1].splice(pieceStartingXLocation, 1, {
                                type: 'Z',
                                pieceId: id,
                                x: pieceStartingXLocation,
                                y: rowIndex + 1
                            });

                            isSuitableRowFound = true;
                        }
                    }
                    rowIndex = rowIndex + 1;
                    this.clearRows();
                    break;
                }
                case 'Q': {
                    if (pieceStartingXLocation + 1 <= this.MAX_X_COORDINATES) {
                        //check if desired horizontal and vertical indeces are empty
                        const valueAtindex1 = currentRow[pieceStartingXLocation];
                        const valueAtindex2 = currentRow[pieceStartingXLocation + 1];
                        const valueAtindex3 = this.rows[rowIndex + 1][pieceStartingXLocation];
                        const valueAtindex4 = this.rows[rowIndex + 1][pieceStartingXLocation + 1];
                        const nothingAbove = this.rows.slice(rowIndex + 1).every(row => !row[pieceStartingXLocation]);

                        if (!valueAtindex1 && !valueAtindex2 && !valueAtindex3 && !valueAtindex4 && nothingAbove) {
                            const id = this.getId();

                            currentRow.splice(pieceStartingXLocation, 1, {
                                type: 'Q',
                                pieceId: id,
                                x: pieceStartingXLocation,
                                y: rowIndex
                            });
                            currentRow.splice(pieceStartingXLocation + 1, 1, {
                                type: 'Q',
                                pieceId: id,
                                x: pieceStartingXLocation + 1,
                                y: rowIndex
                            });
                            this.rows[rowIndex + 1].splice(pieceStartingXLocation, 1, {
                                type: 'Q',
                                pieceId: id,
                                x: pieceStartingXLocation,
                                y: rowIndex + 1
                            });
                            this.rows[rowIndex + 1].splice(pieceStartingXLocation + 1, 1, {
                                type: 'Q',
                                pieceId: id,
                                x: pieceStartingXLocation + 1,
                                y: rowIndex + 1
                            });


                            isSuitableRowFound = true;
                        }
                    }
                    rowIndex = rowIndex + 1;
                    this.clearRows();
                    break;
                }
                case 'J': {
                    if (pieceStartingXLocation + 1 <= this.MAX_X_COORDINATES) {
                        //check if desired horizontal and vertical indeces are empty
                        const valueAtindex1 = currentRow[pieceStartingXLocation];
                        const valueAtindex2 = currentRow[pieceStartingXLocation + 1];
                        const valueAtindex3 = this.rows[rowIndex + 1][pieceStartingXLocation + 1];
                        const valueAtindex4 = this.rows[rowIndex + 2][pieceStartingXLocation + 1];
                        const nothingAbove = this.rows.slice(rowIndex + 1).every(row => !row[pieceStartingXLocation]);

                        if (!valueAtindex1 && !valueAtindex2 && !valueAtindex3 && !valueAtindex4 && nothingAbove) {
                            const id = this.getId();

                            currentRow.splice(pieceStartingXLocation, 1, {
                                type: 'J',
                                pieceId: id,
                                x: pieceStartingXLocation,
                                y: rowIndex
                            });
                            currentRow.splice(pieceStartingXLocation + 1, 1, {
                                type: 'J',
                                pieceId: id,
                                x: pieceStartingXLocation + 1,
                                y: rowIndex
                            });
                            this.rows[rowIndex + 1].splice(pieceStartingXLocation + 1, 1, {
                                type: 'J',
                                pieceId: id,
                                x: pieceStartingXLocation + 1,
                                y: rowIndex + 1
                            });
                            this.rows[rowIndex + 2].splice(pieceStartingXLocation + 1, 1, {
                                type: 'J',
                                pieceId: id,
                                x: pieceStartingXLocation + 1,
                                y: rowIndex + 2
                            });


                            isSuitableRowFound = true;
                        }
                    }
                    rowIndex = rowIndex + 1;
                    this.clearRows();
                    break;
                }
                case 'S': {
                    if (pieceStartingXLocation + 2 <= this.MAX_X_COORDINATES) {
                        //check if desired horizontal and vertical indeces are empty
                        const valueAtindex1 = currentRow[pieceStartingXLocation];
                        const valueAtindex2 = currentRow[pieceStartingXLocation + 1];
                        const valueAtindex3 = this.rows[rowIndex + 1][pieceStartingXLocation + 1];
                        const valueAtindex4 = this.rows[rowIndex + 1][pieceStartingXLocation + 2];
                        const nothingAbove = this.rows.slice(rowIndex + 1).every(row => !row[pieceStartingXLocation]);

                        if (!valueAtindex1 && !valueAtindex2 && !valueAtindex3 && !valueAtindex4 && nothingAbove) {
                            const id = this.getId();

                            currentRow.splice(pieceStartingXLocation, 1, {
                                type: 'S',
                                pieceId: id,
                                x: pieceStartingXLocation,
                                y: rowIndex
                            });
                            currentRow.splice(pieceStartingXLocation + 1, 1, {
                                type: 'S',
                                pieceId: id,
                                x: pieceStartingXLocation + 1,
                                y: rowIndex
                            });
                            this.rows[rowIndex + 1].splice(pieceStartingXLocation + 1, 1, {
                                type: 'S',
                                pieceId: id,
                                x: pieceStartingXLocation + 1,
                                y: rowIndex + 1
                            });
                            this.rows[rowIndex + 1].splice(pieceStartingXLocation + 2, 1, {
                                type: 'S',
                                pieceId: id,
                                x: pieceStartingXLocation + 2,
                                y: rowIndex + 1
                            });


                            isSuitableRowFound = true;
                        }
                    }
                    rowIndex = rowIndex + 1;
                    this.clearRows();
                    break;
                }
                case 'T': {
                    if (pieceStartingXLocation + 2 <= this.MAX_X_COORDINATES) {
                        //check if desired horizontal and vertical indeces are empty
                        const valueAtindex1 = currentRow[pieceStartingXLocation + 1];
                        const valueAtindex2 = this.rows[rowIndex + 1][pieceStartingXLocation + 1];
                        const valueAtindex3 = this.rows[rowIndex + 1][pieceStartingXLocation + 2];
                        const valueAtindex4 = this.rows[rowIndex + 1][pieceStartingXLocation];
                        const nothingAbove = this.rows.slice(rowIndex + 1).every(row => !row[pieceStartingXLocation]);

                        if (!valueAtindex1 && !valueAtindex2 && !valueAtindex3 && !valueAtindex4 && nothingAbove) {
                            const id = this.getId();

                            currentRow.splice(pieceStartingXLocation + 1, 1, {
                                type: 'T',
                                pieceId: id,
                                x: pieceStartingXLocation + 1,
                                y: rowIndex
                            });
                            this.rows[rowIndex + 1].splice(pieceStartingXLocation + 1, 1, {
                                type: 'T',
                                pieceId: id,
                                x: pieceStartingXLocation + 1,
                                y: rowIndex + 1
                            });
                            this.rows[rowIndex + 1].splice(pieceStartingXLocation + 2, 1, {
                                type: 'T',
                                pieceId: id,
                                x: pieceStartingXLocation + 2,
                                y: rowIndex + 1
                            });
                            this.rows[rowIndex + 1].splice(pieceStartingXLocation, 1, {
                                type: 'T',
                                pieceId: id,
                                x: pieceStartingXLocation,
                                y: rowIndex + 1
                            });


                            isSuitableRowFound = true;
                        }
                    }
                    rowIndex = rowIndex + 1;
                    this.clearRows();
                    break;
                }
                }
            }
        }
    }
}
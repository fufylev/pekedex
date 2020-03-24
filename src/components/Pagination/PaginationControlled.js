import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Pagination from '@material-ui/lab/Pagination';

const useStyles = makeStyles(theme => ({
    root: {
        '& > * + *': {
            marginTop: theme.spacing(2),
        }
    },
}));

export default function PaginationControlled(props) {
    const classes = useStyles();
    const [page, setPage] = useState(1);

    const {itemsToShow} = props;

    const numberOfPagesToPaginate = Math.ceil(964 / itemsToShow);

    const handleChange = (event, value) => {
        setPage(value);
        props.setCurrntPage(value);
    };

    return (
        <div className={classes.root}>
            <Pagination count={numberOfPagesToPaginate} page={page} onChange={handleChange}/>
        </div>
    );
}


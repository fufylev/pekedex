import './DashBoard.scss';

import React, { useEffect, useState } from 'react';
import { API_URL } from "../../../utils/helpers";
import PaginationControlled from "../../Pagination/PaginationControlled";
import { ItemsPerPageBlock } from "../../Pagination/ItemsPerPageBlock";

export function DashBoard() {
    const [page, setPage] = useState(1);
    const [pagesToShow, setPagesToShow] = useState(10);

    useEffect(() => {
        try {
            fetch(`${API_URL}pokemon/`)
                .then(result => result.json())
                .then(data => console.log(data))
        } catch (e) {
            console.log(e);
        }

    }, []);

    const pageHandler = (page) => {
        setPage(page);
    };

    const itemPerPage = (number) => {
        setPagesToShow(number)
    };

    return (
        <div className='container'>
            <div className='flex-jcsb pagination'>
                <ItemsPerPageBlock itemPerPage={itemPerPage} pagesToShow={pagesToShow}/>
                <PaginationControlled setCurrntPage={pageHandler} pagesToShow={pagesToShow}/>
            </div>
            <h1>{page}</h1>
        </div>
    );
}
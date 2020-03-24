import './DashBoard.scss';

import React, { useEffect, useState } from 'react';
import { API_URL } from "../../../utils/helpers";
import PaginationControlled from "../../Pagination/PaginationControlled";

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
                <div>
                    <span className="pagination__text">Items per page:&emsp;</span>
                    <span
                        className={pagesToShow === 10 ? 'pagination__btn pagination__btn-active': 'pagination__btn'}
                        onClick={() =>itemPerPage(10)}
                    >
                        10
                    </span>
                    <span
                        className={pagesToShow === 25 ? 'pagination__btn pagination__btn-active': 'pagination__btn'}
                        onClick={() =>itemPerPage(25)}
                    >
                        25
                    </span>
                    <span
                        className={pagesToShow === 50 ? 'pagination__btn pagination__btn-active': 'pagination__btn'}
                        onClick={() =>itemPerPage(50)}
                    >
                        50
                    </span>
                </div>
                <PaginationControlled setCurrntPage={pageHandler} pagesToShow={pagesToShow}/>
            </div>
            <h1>{page}</h1>
        </div>
    );
}
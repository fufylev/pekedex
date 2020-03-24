import React from 'react';

export function ItemsPerPageBlock(props) {
    const {pagesToShow, itemPerPage} = props;

    return (
        <div>
            <span className="pagination__text">Items per page:&emsp;</span>
            <span
                className={pagesToShow === 10 ? 'pagination__btn pagination__btn-active' : 'pagination__btn'}
                onClick={() => itemPerPage(10)}
            >
                        10
                    </span>
            <span
                className={pagesToShow === 25 ? 'pagination__btn pagination__btn-active' : 'pagination__btn'}
                onClick={() => itemPerPage(25)}
            >
                        25
                    </span>
            <span
                className={pagesToShow === 50 ? 'pagination__btn pagination__btn-active' : 'pagination__btn'}
                onClick={() => itemPerPage(50)}
            >
                        50
                    </span>
        </div>
    );
}
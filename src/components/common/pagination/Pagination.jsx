import React from 'react';
import styles from './Pagination.module.scss';
import cs from 'classnames/bind';
const cx = cs.bind(styles);

Pagination.defaultProps = {
  currPage: 0,
  pageCount: 5,
  onClickPage: () => {},
};

const MAX_PAGE_COUNT = 5;

function getPaginationArray(currentPage, total) {
  const resultList = [currentPage];

  let idx = 1;
  while (resultList.length < Math.min(MAX_PAGE_COUNT, total)) {
    if (currentPage - idx > -1) resultList.unshift(currentPage - idx);
    if (currentPage + idx < total) resultList.push(currentPage + idx);
    idx++;
  }

  return resultList;
}

export default function Pagination({ currPage, pageCount, onClickPage }) {
  return (
    <div className={cx('wrpper')}>
      <button
        className={cx('prevBtn')}
        onClick={() => currPage > 0 && onClickPage(currPage - 1)}
        disabled={currPage <= 0}
      >
        이전
      </button>
      {getPaginationArray(currPage, pageCount).map((page) => {
        return (
          <button
            onClick={() => onClickPage(page)}
            key={`page-button-${page}`}
            data-active={page === currPage ? 'true' : 'false'}
            className={cx('pageBtn')}
          >
            {page + 1}
          </button>
        );
      })}
      <button
        className={cx('nextBtn')}
        onClick={() => currPage < pageCount - 1 && onClickPage(currPage + 1)}
        disabled={currPage >= pageCount - 1}
      >
        다음
      </button>
    </div>
  );
}

import React, { useState } from 'react';
import styles from './AllPosts.module.scss';
import cs from 'classnames/bind';
import { Pagination, FilterCareTarget, SearchBar, PostList } from 'components';
import { useGetPostList } from 'hooks';
import { useLocation } from 'react-router';
import { useSearchParams } from 'react-router-dom';
const cx = cs.bind(styles);

export default function AllPosts() {
  const [searchInput, setSearchInput] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const [searchParams, setSearchParams] = useSearchParams();
  const careTarget = searchParams.get('careTarget');

  const { data: postsData, isLoading } = useGetPostList(currentPage + 1, careTarget);

  const handleSearchChange = (text) => {
    setSearchInput(text);
  };

  return (
    <div className={cx('wrapper')}>
      <SearchBar className={cx('all-posts-style')} searchInput={searchInput} onSearchChange={handleSearchChange} />
      <div className={cx('recruit-container')}>
        <FilterCareTarget postsData={postsData} />
        {isLoading || !postsData ? (
          <div className={cx('loading')}>로딩중...</div>
        ) : (
          <PostList postsData={postsData} searchInput={searchInput} pageNumber={currentPage + 1} />
        )}
        <div className={cx('pagination-container')}>
          <Pagination currPage={currentPage} onClickPage={setCurrentPage} pageCount={10} />
        </div>
      </div>
    </div>
  );
}

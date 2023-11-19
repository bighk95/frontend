import React, { useState } from 'react';
import styles from './AllPosts.module.scss';
import cs from 'classnames/bind';
import { Pagination, FilterCareTarget, SearchBar, Card } from '../../../components';

import { Link } from 'react-router-dom';

const cx = cs.bind(styles);
const sampleData = [
  {
    post_id: 1,
    region: '부산시 어쩌구',
    care_target: 'child',
    target_features: 'Example Target Features',
    preferredmate_age: '20대, 30대',
    preferredmate_gender: '남성',
    author: 'John Doe',
    timestamp: '11/10',
    title: '5세 남아 등하원, 실내놀이실내놀이실내놀이 시터 구합니다.',
    care_term: '정기',
    care_days: '월 수 금',
    start_time: '09:00 AM',
    end_time: '05:00 PM',
    hourly_rate: '15,000',
    negotiable_rate: true,
    status: '모집 중',
    startDate: '2023-01-10',
    endDate: '2023-01-20',
  },
];

const cardsPerPage = 6;

export default function AllPosts() {
  const [currPage, setCurrPage] = useState(0);
  // const slicedCards = sampleData.slice((currPage - 1) * cardsPerPage, currPage * cardsPerPage);
  return (
    <div className={cx('wrapper')}>
      <SearchBar />
      <div className={cx('recruitContainer')}>
        {/* <input type="text" value={search} onChange={onChange} /> */}
        <div className={cx('filterContainer')}>
          <FilterCareTarget />
        </div>
        <div className={cx('cardListContainer')}>
          {sampleData.slice(currPage * cardsPerPage, (currPage + 1) * cardsPerPage).map((data) => (
            <Link to={'./123'}>
              <Card {...data} />
            </Link>
          ))}
        </div>
        <div className={cx('paginationContainer')}>
          <Pagination currPage={currPage} onClickPage={setCurrPage} pageCount={10} />
        </div>
      </div>
    </div>
  );
}

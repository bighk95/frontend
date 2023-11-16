import React, { useState } from 'react';
import { FaRegHeart, FaHeart } from 'react-icons/fa';
import styles from './WishButton.module.scss';
import cs from 'classnames/bind';

const cx = cs.bind(styles);

const WishButton = () => {
  const [isWish, setIsWish] = useState(false);

  const onClickHandler = () => {
    setIsWish(!isWish);
  };
  return (
    <div className={cx('heartIcons')}>
      {isWish ? <FaHeart onClick={onClickHandler} /> : <FaRegHeart onClick={onClickHandler} />}
    </div>
  );
};

export default WishButton;

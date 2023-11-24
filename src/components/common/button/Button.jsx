import React from 'react';
import styles from './Button.module.scss';
import cs from 'classnames/bind';
const cx = cs.bind(styles);

export default function Button({ types, children, disabled }) {
  return (
    <span className={cx('wrapper')}>
      <button className={cx(types)}>{children}</button>
    </span>
  );
}

import React, { FC } from 'react';
import styles from './index.module.less';

const Button1: FC = props => {
  return <button className={styles.button}>{props.children}</button>;
};

export { Button1 };

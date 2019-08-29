import React, { FC } from 'react';
import styles from './index.module.less';

const Button2: FC = props => {
  return <button className={styles.button}>{props.children}</button>;
};

export { Button2 };

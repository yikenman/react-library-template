import React, { FC } from 'react';
import styles from './index.module.less';

const Button: FC = props => {
  return <button className={styles.button}>{props.children}</button>;
};

export { Button };

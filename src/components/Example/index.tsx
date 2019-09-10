/**
 * @class ExampleComponent
 */

import React from 'react';

import styles from './styles.module.scss';

export interface Props {
  text: string;
}

export class ExampleComponent extends React.Component<Props> {
  render() {
    const { text } = this.props;

    return <div className={styles.test}>Example Component: {text}</div>;
  }
}

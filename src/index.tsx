/**
 * @class ExampleComponent
 */

import React from 'react';

import styles from './styles.scss';

export interface Props {
  text: string;
}

export default class ExampleComponent extends React.Component<Props> {
  render() {
    const { text } = this.props;

    return <div className={styles.test}>Example Component: {text}</div>;
  }
}

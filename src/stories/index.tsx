import React from 'react';

import { storiesOf } from '@storybook/react';

import ExampleComponent from '../index';

storiesOf('Button', module).add('with some emoji', () => (
  <ExampleComponent text="aaa"></ExampleComponent>
));

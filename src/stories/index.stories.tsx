import React from 'react';
import { storiesOf } from '@storybook/react';
import { ExampleComponent } from '../components/Example';

storiesOf('Button', module).add('with some emoji', () => (
  <ExampleComponent text="aaa"></ExampleComponent>
));

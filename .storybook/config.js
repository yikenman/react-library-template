import { configure, addDecorator, addParameters } from '@storybook/react';
import { withConsole } from '@storybook/addon-console';

addDecorator((storyFn, context) => withConsole()(storyFn)(context));
const viewports = {
  smallScreenViewport: {
    name: 'small screen viewport',
    styles: {
      width: '1280px',
      height: '100vh'
    },
    type: 'desktop'
  },
  middleScreenViewport: {
    name: 'middle screen viewport',
    styles: {
      width: '1660px',
      height: '100vh'
    },
    type: 'desktop'
  },
  largeScreenViewport: {
    name: 'large screen viewport',
    styles: {
      width: '2560px',
      height: '100vh'
    },
    type: 'desktop'
  }
};
addParameters({
  viewport: { viewports: viewports }
});

// automatically import all files in stories folder
const req = require.context('../src/stories', true, /\.stories\.tsx$/);

function loadStories() {
  req.keys().forEach(req);
}

configure(loadStories, module);

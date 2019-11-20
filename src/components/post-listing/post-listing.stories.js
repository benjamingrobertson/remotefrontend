import React from 'react';
import { storiesOf } from '@storybook/react';

import PostListing from './post-listing';

storiesOf(`PostListing`, module).add(`default`, () => (
  <PostListing
    post={{
      title: 'Front End Developer',
      company: 'Mediacurrent',
      snippet:
        'Lorem ipsum dolor sit amet consectetur adipiscing elit senectus accumsan hendrerit penatibus velit tempus luctus a viverra fermentum dapibus, nascetur massa morbi condimentum nibh ultrices id proin feugiat scelerisque fusce curae tellus sollicitudin lobortis orci.',
    }}
  />
));

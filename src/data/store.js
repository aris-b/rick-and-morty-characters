import { init } from '@rematch/core';
import characters from './characters';

const store = init({
  models: {
    characters,
  },
});

export default store;

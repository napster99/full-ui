import { createTest, destroyVM } from '../util';
import TyDebounce from 'packages/ty-debounce';

describe('TyDebounce', () => {
  let vm;
  afterEach(() => {
    destroyVM(vm);
  });

  it('create', () => {
    vm = createTest(TyDebounce, true);
    expect(vm.$el).to.exist;
  });
});


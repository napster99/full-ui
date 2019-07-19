import { createTest, destroyVM } from '../util';
import Searchform from 'packages/searchform';

describe('Searchform', () => {
  let vm;
  afterEach(() => {
    destroyVM(vm);
  });

  it('create', () => {
    vm = createTest(Searchform, true);
    expect(vm.$el).to.exist;
  });
});


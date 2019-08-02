import { createTest, destroyVM } from '../util';
import TySearchBox from 'packages/ty-search-box';

describe('TySearchBox', () => {
  let vm;
  afterEach(() => {
    destroyVM(vm);
  });

  it('create', () => {
    vm = createTest(TySearchBox, true);
    expect(vm.$el).to.exist;
  });
});


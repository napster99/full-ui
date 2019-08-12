import { createTest, destroyVM } from '../util';
import TySearchList from 'packages/ty-search-list';

describe('TySearchList', () => {
  let vm;
  afterEach(() => {
    destroyVM(vm);
  });

  it('create', () => {
    vm = createTest(TySearchList, true);
    expect(vm.$el).to.exist;
  });
});


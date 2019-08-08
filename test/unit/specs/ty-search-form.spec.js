import { createTest, destroyVM } from '../util';
import TySearchForm from 'packages/ty-search-form';

describe('TySearchForm', () => {
  let vm;
  afterEach(() => {
    destroyVM(vm);
  });

  it('create', () => {
    vm = createTest(TySearchForm, true);
    expect(vm.$el).to.exist;
  });

});


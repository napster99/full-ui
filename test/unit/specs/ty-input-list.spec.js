import { createTest, destroyVM } from '../util';
import TyInputList from 'packages/ty-input-list';

describe('TyInputList', () => {
  let vm;
  afterEach(() => {
    destroyVM(vm);
  });

  it('create', () => {
    vm = createTest(TyInputList, true);
    expect(vm.$el).to.exist;
  });
});


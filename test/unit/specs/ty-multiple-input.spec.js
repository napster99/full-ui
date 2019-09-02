import { createTest, destroyVM } from '../util';
import TyMultipleInput from 'packages/ty-multiple-input';

describe('TyMultipleInput', () => {
  let vm;
  afterEach(() => {
    destroyVM(vm);
  });

  it('create', () => {
    vm = createTest(TyMultipleInput, true);
    expect(vm.$el).to.exist;
  });
});


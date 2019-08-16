import { createTest, destroyVM } from '../util';
import TyInput from 'packages/ty-input';

describe('TyInput', () => {
  let vm;
  afterEach(() => {
    destroyVM(vm);
  });

  it('create', () => {
    vm = createTest(TyInput, true);
    expect(vm.$el).to.exist;
  });
});


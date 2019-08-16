import { createTest, destroyVM } from '../util';
import TyJiangxc from 'packages/ty-jiangxc';

describe('TyJiangxc', () => {
  let vm;
  afterEach(() => {
    destroyVM(vm);
  });

  it('create', () => {
    vm = createTest(TyJiangxc, true);
    expect(vm.$el).to.exist;
  });
});


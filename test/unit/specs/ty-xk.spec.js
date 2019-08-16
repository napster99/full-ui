import { createTest, destroyVM } from '../util';
import TyXk from 'packages/ty-xk';

describe('TyXk', () => {
  let vm;
  afterEach(() => {
    destroyVM(vm);
  });

  it('create', () => {
    vm = createTest(TyXk, true);
    expect(vm.$el).to.exist;
  });
});


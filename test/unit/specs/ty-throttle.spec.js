import { createTest, destroyVM } from '../util';
import TyThrottle from 'packages/ty-throttle';

describe('TyThrottle', () => {
  let vm;
  afterEach(() => {
    destroyVM(vm);
  });

  it('create', () => {
    vm = createTest(TyThrottle, true);
    expect(vm.$el).to.exist;
  });
});


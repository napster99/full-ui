import { createTest, destroyVM } from '../util';
import TySteps from 'packages/ty-steps';

describe('TySteps', () => {
  let vm;
  afterEach(() => {
    destroyVM(vm);
  });

  it('create', () => {
    vm = createTest(TySteps, true);
    expect(vm.$el).to.exist;
  });
});


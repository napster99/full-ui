import { createTest, destroyVM } from '../util';
import TyTestProcessZty from 'packages/ty-test-process-zty';

describe('TyTestProcessZty', () => {
  let vm;
  afterEach(() => {
    destroyVM(vm);
  });

  it('create', () => {
    vm = createTest(TyTestProcessZty, true);
    expect(vm.$el).to.exist;
  });
});


import { createTest, destroyVM } from '../util';
import TyZsy from 'packages/ty-zsy';

describe('TyZsy', () => {
  let vm;
  afterEach(() => {
    destroyVM(vm);
  });

  it('create', () => {
    vm = createTest(TyZsy, true);
    expect(vm.$el).to.exist;
  });
});


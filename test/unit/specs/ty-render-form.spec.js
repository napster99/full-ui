import { createTest, destroyVM } from '../util';
import TyRenderForm from 'packages/ty-render-form';

describe('TyRenderForm', () => {
  let vm;
  afterEach(() => {
    destroyVM(vm);
  });

  it('create', () => {
    vm = createTest(TyRenderForm, true);
    expect(vm.$el).to.exist;
  });
});


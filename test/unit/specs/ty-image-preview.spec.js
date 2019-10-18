import { createTest, destroyVM } from '../util';
import TyImagePreview from 'packages/ty-image-preview';

describe('TyImagePreview', () => {
  let vm;
  afterEach(() => {
    destroyVM(vm);
  });

  it('create', () => {
    vm = createTest(TyImagePreview, true);
    expect(vm.$el).to.exist;
  });
});


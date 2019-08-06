import { createTest, destroyVM } from '../util';
import TyRenderTable from 'packages/ty-render-table';

describe('TyRenderTable', () => {
  let vm;
  afterEach(() => {
    destroyVM(vm);
  });

  it('create', () => {
    vm = createTest(TyRenderTable, true);
    expect(vm.$el).to.exist;
  });
});


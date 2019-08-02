import { createTest, destroyVM } from '../util';
import TyTable from 'packages/ty-table';

describe('TyTable', () => {
  let vm;
  afterEach(() => {
    destroyVM(vm);
  });

  it('create', () => {
    vm = createTest(TyTable, true);
    expect(vm.$el).to.exist;
  });
});


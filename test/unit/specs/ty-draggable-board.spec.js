import { createTest, destroyVM } from '../util';
import TyDraggableBoard from 'packages/ty-draggable-board';

describe('TyDraggableBoard', () => {
  let vm;
  afterEach(() => {
    destroyVM(vm);
  });

  it('create', () => {
    vm = createTest(TyDraggableBoard, true);
    expect(vm.$el).to.exist;
  });
});


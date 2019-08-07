export default {
  functional: true,
  props: {
    render: Function,
    row: Object,
    data: Object,
    index: [Number, String]
  },
  render: (h, ctx) => {
    const params = {
      row: ctx.props.row,
      data: ctx.props.data,
      index: ctx.props.index
    };
    return ctx.props.render(h, params);
  }
};

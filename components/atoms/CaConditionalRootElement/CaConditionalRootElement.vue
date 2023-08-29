<script>
// @group Atoms
// @vuese
// Functional component used to conditionally render a root element
// Found in this thread: [https://forum.vuejs.org/t/conditionally-render-parent-element/9324/5](https://forum.vuejs.org/t/conditionally-render-parent-element/9324/5)
export default {
  name: 'CaConditionalRootElement',
  functional: true,
  props: {
    render: {
      type: Boolean,
      required: true,
    },
  },
  render(h, context) {
    const { children, props } = context;

    if (props.render) {
      return children;
    } else {
      return children
        .map((child) => {
          if (child.children) {
            return child.children;
          }
          return child.componentOptions != null
            ? child.componentOptions.children
            : null;
        })
        .filter((list) => list);
    }
  },
};
</script>

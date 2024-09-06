<!-- *** @description icon图标组件
** -->
<!-- **
    * @use <svg :name="name"></svg>
    * @params参数说明：
    * @params {name}     icon名称
    * @params {size}     icon大小, 默认 w*h => 24*24, unit: px
    * @params {w}        icon 宽, 默认 24, unit: px
    * @params {h}        icon 高, 默认 24, unit: px
    * @params {opacity}  透明度，默认 1
    * @params {fill}     颜色
** -->
<template>
  <client-only>
    <svg
      :class="['icon', name]"
      aria-hidden="true"
      :style="{width: (w || size) + 'px', height: (h || size) + 'px', opacity: opacity}"
      :fill="getFill(fill, name)"
      @click="handleIcon"
    >
      <use :xlink:href="`#${name}`" />
    </svg>
  </client-only>
</template>

<script>
export default {
  name: "YfnIcon",
  props: {
    name: [String],
    w: [Number, String],
    h: [Number, String],
    size: {
      type: [Number, String],
      default: () => {
        return 24;
      }
    },
    opacity: {
      type: [Number, String],
      default: () => {
        return 1;
      }
    },
    fill: {
      type: [Number, String],
      default: () => {
        return "";
      }
    }
  },
  data() {
    return {};
  },
  methods: {
    getFill(fill, name) {
      if (fill || !name) return fill;
      const defaultFill = {
        "icon-question": "#AAA",
        "icon-check-selected": "#333",
        "icon-edit": "#666",
        "icon-delete": "#666",
        "icon-enlarge": "#666",
        "icon-check": "#999",
        "icon-right-grey": "#999"
      };
      return defaultFill[name] || "";
    },
    handleIcon(e) {
      this.$emit("click", e);
    }
  }
};
</script>

<style scoped lang="scss">
</style>
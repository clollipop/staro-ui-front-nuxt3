<template>
  <svg class="icon-font text-inLine" aria-hidden="true">
    <use :xlink:href="`#icon-${icon}`" />
  </svg>
</template>

<script setup lang="ts">
import {defineProps} from "vue";
const props = defineProps({
  icon: {
    type: String,
    default: ""
  }
});
</script>

<style scoped>
.text-inLine {
  display: inline-block;
  width: 1em;
  height: 1em;
  font-size: 1.2em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>

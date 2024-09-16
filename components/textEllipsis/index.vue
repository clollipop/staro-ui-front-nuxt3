<template>
  <el-tooltip
    v-bind="$attrs"
    v-model:visible="tooltipVisible"
    :disabled="disabledTooltip"
    placement="top"
  >
    <template #content>
      <slot :name="$slots.content ? 'content' : 'default'" />
    </template>
    <span
      ref="triggerRef"
      :class="['text-ellipsis', { 'text-ellipsis-line-clamp': lineClamp }]"
      @mouseenter="setTooltipDisabled"
    >
      <span
        ref="triggerInnerRef"
        class="text-ellipsis-inner"
        :style="lineClampStyle"
      >
        <slot />
      </span>
    </span>
  </el-tooltip>
</template>

<script lang="ts" setup>
import { computed, ref, type HTMLAttributes } from "vue";

interface Props {
  lineClamp?: number
}

const props = withDefaults(defineProps<Props>(), {
  lineClamp: undefined
});

const tooltipVisible = ref(false);
const triggerRef = ref<HTMLElement | null>(null);
const triggerInnerRef = ref<HTMLElement | null>(null);
const disabledTooltip = ref(true);

const lineClampStyle = computed<HTMLAttributes["style"]>(() => {
  return props.lineClamp
    ? {
      display: "-webkit-inline-box",
      "-webkit-box-orient": "vertical",
      "-webkit-line-clamp": props.lineClamp
    }
    : {};
});

function setTooltipDisabled() {
  const $trigger = triggerRef.value;
  const $triggerInner = triggerInnerRef.value;

  if (!$trigger) return;

  if (props.lineClamp) {
    disabledTooltip.value = $trigger.scrollHeight <= $trigger.offsetHeight;
  } else if ($triggerInner) {
    disabledTooltip.value =
      $triggerInner.getBoundingClientRect().width <=
      $trigger.getBoundingClientRect().width;
  }
}
</script>

<style scoped>
.text-ellipsis {
  max-width: 100%;
  display: inline-block;
  overflow: hidden;
}

.text-ellipsis:not(.text-ellipsis-line-clamp) {
  white-space: nowrap;
  vertical-align: bottom;
  text-overflow: ellipsis;
}
</style>

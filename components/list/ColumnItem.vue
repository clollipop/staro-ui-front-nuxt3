<script setup lang="ts">
import {useWebInfoStore} from "~/store/webInfoStore";

const props = defineProps({
  label: {
    type: Object,
    required: true
  }
});
const webInfoStore = useWebInfoStore();

function getColumnDetail() {
  navigateTo(`/label/${props.label.id}`);
}
</script>

<template>
  <div class="column-item relative box flex flex-col">
    <div
      class="h-16 flex cursor-pointer"
      @click="getColumnDetail()"
    >
      <div class="column-item-thumbnail h-full w-20">
        <img
          :src="webInfoStore.getRandomAvatar()"
          class="cover rounded-md"
          alt=""
        >
      </div>
      <div class="mx-3">
        <div class="column-item-title title relative pb-0.5 mb-1">
          {{ label.name }}
        </div>
        <div class="three-line mt-1">
          {{ label.description }}
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
$light-color: #1f2d3d;
$dark-color:  #A7B1BE;
.column-item {
  border: 1px solid rgb(255,255,255);
  overflow: hidden;
  min-width: 300px;
  color: $light-color;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  [data-theme="dark"] & {
    color: $dark-color;
  }
  &:hover {
    transform: translateY(-3px);
    border: 1px solid rgb(255,255,255);
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  }
  &-thumbnail {
    position: absolute;
    right: 0;
    top: 30%;
    opacity: 0.3;
    filter: blur(2px);
    transform: scale(1.0) rotate(15deg);
  }

  &-title:after {
    bottom: 0;
    width: 23px;
    left: 0;
    height: 2px;
    background: rgba(var(--z-fontcolor), .8);
    content: "";
    border-radius: 1px;
    position: absolute;
  }
}
</style>

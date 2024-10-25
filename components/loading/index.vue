<template>
  <div
    v-if="visible"
    class="loading__mask flex items-center justify-center fixed top-0 left-0 w-full h-full"
  >
    <div class="loader">
      <span class="text">Loading</span>
      <span class="spinner" />
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  show: boolean;
}>();

const visible = ref(props.show);

watch(() => props.show, (newVal) => {
  visible.value = newVal;
});
</script>

<style scoped lang="scss">
$z-loading-size: 66px;

.loading__mask {
  z-index: 51;
  background-color: rgba(var(--z-common-bg), .5);
  -webkit-backdrop-filter: saturate(180%) blur(20px);
  backdrop-filter: saturate(180%) blur(20px);
  -webkit-transition: all .25s ease;
  transition: all .25s ease;
}

.loading__animation {
  width: $z-loading-size;
  height: $z-loading-size;
  border-radius: 50%;

  .animation__1, .animation__2 {
    width: 0;
    height: 0;
    background-color: transparent;
    border-radius: 50%;
    position: absolute;
    -webkit-box-shadow: 0 0 10px 0 rgba(var(--z-primary-color), .5);
    box-shadow: 0 0 10px 0 rgba(var(--z-primary-color), .5);
  }

  .animation__1 {
    -webkit-animation: waves .7s ease infinite;
    animation: waves .7s ease infinite;
  }

  .animation__2 {
    -webkit-animation: waves 1.4s linear infinite;
    animation: waves 1.4s linear infinite;
  }
}

@keyframes waves {
  0% {
    width: 0;
    height: 0
  }

  to {
    height: $z-loading-size;
    width: $z-loading-size;
    opacity: 0
  }
}
/*
 =======================加载
 */

*{
  margin:0em;
  padding:0em;
}

body {
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  background: #403833;
  font-family: 'Open Sans';
  font-weight: 100;
  color:#f2f2f2;
  font-size:100%;
  margin:0em;
  padding:0em;
}

/* Start the loader code, first, let's align it the center of screen */
.loader {
  position: absolute;
  top: 50%;
  left: 50%;
  -webkit-transform: translate(-50%, -50%);
  -moz-transform: translate(-50%, -50%);
  -mos-transform: translate(-50%, -50%);
  -o-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  text-align:center;
  /* disable selection and cursor changes */
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  cursor:default;
}

/* Text align it the center of screen and connect the looped animation for 2.5 seconds */
.loader .text{
  position: absolute;
  top: 2em;
  left: 0.5em;
  z-index:5;
  font-size: 1.8em;
  text-transform: uppercase;
  -webkit-animation: text 2.5s cubic-bezier(0.750, 0.000, 0.500, 1.000) infinite normal;
  -moz-animation: text 2.5s cubic-bezier(0.750, 0.000, 0.500, 1.000) infinite normal;
  -ms-animation: text 2.5s cubic-bezier(0.750, 0.000, 0.500, 1.000) infinite normal;
  -o-animation: text 2.5s cubic-bezier(0.750, 0.000, 0.500, 1.000) infinite normal;
  animation: text 2.5s cubic-bezier(0.750, 0.000, 0.500, 1.000) infinite normal;
}

/* Create a container for animation*/
.spinner {
  position: relative;
  width: 5em;
  height: 5em;
  color:#fff;
}

.spinner:before,
.spinner:after {
  content: "";
  position: relative;
  display: block;
}

/* Create cube and set animation*/
.spinner:before {
  -webkit-animation: spinner 2.5s cubic-bezier(0.750, 0.000, 0.500, 1.000) infinite normal;
  -moz-animation: spinner 2.5s cubic-bezier(0.750, 0.000, 0.500, 1.000) infinite normal;
  -ms-animation: spinner 2.5s cubic-bezier(0.750, 0.000, 0.500, 1.000) infinite normal;
  -o-animation: spinner 2.5s cubic-bezier(0.750, 0.000, 0.500, 1.000) infinite normal;
  animation: spinner 2.5s cubic-bezier(0.750, 0.000, 0.500, 1.000) infinite normal;
  width: 10em;
  height: 10em;
  background-color: #ff7c38;
}

/* Create shadow and set animation*/
.spinner:after {
  -webkit-animation: shadow 2.5s cubic-bezier(0.750, 0.000, 0.500, 1.000) infinite normal;
  -moz-animation: shadow 2.5s cubic-bezier(0.750, 0.000, 0.500, 1.000) infinite normal;
  -ms-animation: shadow 2.5s cubic-bezier(0.750, 0.000, 0.500, 1.000) infinite normal;
  -o-animation: shadow 2.5s cubic-bezier(0.750, 0.000, 0.500, 1.000) infinite normal;
  animation: shadow 2.5s cubic-bezier(0.750, 0.000, 0.500, 1.000) infinite normal;
  position: relative;
  bottom: -1.75em;
  height: .25em;
  border-radius: 50%;
  background-color: #322b27;
}

/* Animation keys */
/* from cube to circle */
@-webkit-keyframes spinner {
  50%		{
    -webkit-border-radius: 50%;
    -webkit-transform: scale(.5) rotate(360deg);
    background-color: #13A3A5; }
  100% {
    -webkit-transform: scale(1) rotate(720deg);
    background-color: #ff7c38; }
}

@-moz-keyframes spinner {
  50%		{
    -moz-border-radius: 50%;
    -moz-transform: scale(.5) rotate(360deg);
    background-color: #13A3A5;}
  100%	{
    -moz-transform: scale(1) rotate(720deg);
    background-color: #ff7c38; }
}

@-mos-keyframes spinner {
  50%		{
    -mos-border-radius: 50%;
    -mos-transform: scale(.5) rotate(360deg);
    background-color: #13A3A5; }
  100% 	{
    -mos-transform: scale(1) rotate(720deg);
    background-color: #ff7c38; }
}

@-o-keyframes spinner {
  50%		{
    -o-border-radius: 50%;
    -o-transform: scale(.5) rotate(360deg);
    background-color: #13A3A5; }
  100%	{
    -o-transform: scale(1) rotate(720deg);
    background-color: #ff7c38; }
}

@keyframes spinner {
  50%		{
    border-radius: 50%;
    transform: scale(.5) rotate(360deg);
    background-color: #13A3A5; }
  100%	{
    transform: scale(1) rotate(720deg);
    background-color: #ff7c38; }
}


/* animation shadow */
@-webkit-keyframes shadow {
  50%		{
    -webkit-transform: scale(.5);
    background-color: #322b27; }
}

@-moz-keyframes shadow {
  50%		{
    -moz-transform: scale(.5);
    background-color: #322b27; }
}

@-mos-keyframes shadow {
  50%		{
    -mos-transform: scale(.5);
    background-color: #322b27; }
}

@-o-keyframes shadow {
  50%		{
    -o-transform: scale(.5);
    background-color: #322b27; }
}

@keyframes shadow {
  50%		{
    transform: scale(.5);
    background-color: #322b27;
  }
}

/* animation text */
@-webkit-keyframes text {
  0%		{ -webkit-transform: scale(1,1); }
  50%		{ -webkit-transform: scale(.5,.5); }
  100%	{ -webkit-transform: scale(1,1); }
}

@-moz-keyframes text {
  0%		{ -moz-transform: scale(1,1); }
  50% 	{ -moz-transform: scale(.5,.5); }
  100%	{ -moz-transform: scale(1,1); }
}

@-mos-keyframes text {
  0%		{ -mos-transform: scale(1,1); }
  50%		{ -mos-transform: scale(.5,.5); }
  100%	{ -mos-transform: scale(1,1); }
}

@-o-keyframes text {
  0%		{ -o-transform: scale(1,1); }
  50%		{ -o-transform: scale(.5,.5); }
  100%	{ -o-transform: scale(1,1); }
}

@keyframes text {
  0%		{ transform: scale(1,1); }
  50%		{ transform: scale(.5,.5);}
  100%	{ transform: scale(1,1); }
}

</style>

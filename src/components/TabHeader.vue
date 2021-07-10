<template>
  <div class="my-parts " >
    <slot name="default"></slot>
  </div>
</template>
<style scoped>
  .my-parts {
    width: 200px;;
    display: inline-block;
    font-size: 12px;
    padding: 3px 1.6em .4em .8em;
    position: relative;
    
    z-index: 1;
  }
  .my-parts::before {
    content: "";
    position: absolute;
    top: 0;
    border: solid rgb(156, 163, 175) 1px;
    border-bottom: none;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: -1;
    background: #C4E2FF;
    transform: scaleY(1.3) perspective(2em) rotateX(5deg);
    transform-origin: bottom left;
    border-radius: 3px 5px 0 0;
  }
</style>
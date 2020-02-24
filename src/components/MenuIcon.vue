<template>
  <div :class="['menu-icon', { cross: cross }]" @click="onClick()">
    <div class="bar1"></div>
    <div class="bar2"></div>
    <div class="bar3"></div>
  </div>
</template>

<script>
export default {
  name: "MenuIcon",
  props: {
    cross: Boolean
  },
  methods: {
    onClick() {
      this.$emit("click");
    }
  }
};
</script>

<style scope lang="scss">
.menu-icon {
  display: inline-block;
  cursor: pointer;

  div {
    width: 2rem;
    height: 0.35rem;
    background-color: #333;
    margin: 0.4rem 0;
    transition: $sidebar-transition;
  }
}

.cross {
  .bar1 {
    transform: rotate(45deg) translate(0.6rem, 0.5rem);
  }
  .bar2 {
    opacity: 0;
  }
  .bar3 {
    transform: rotate(-45deg) translate(0.5rem, -0.5rem);
  }
}
</style>

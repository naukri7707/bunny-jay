<template>
  <div class="card1">
    <img class="responsive icon" alt="card-img" :src="src" />
    <div class="info">
      <div>{{ title }}</div>
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "Card",
  props: {
    src: String,
    title: String
  }
};
</script>

<style scope lang="scss">
.card1 {
  @include buttonify;
  display: inline-block;
  word-wrap: break-word;
  background-color: #e9e9e7;
  background-clip: border-box;
  border: 1px solid rgba(0, 0, 0, 0.125);
  border-radius: 1rem;
  opacity: 0.9;
  width: 140px;
  margin: 40px 2% 40px;
  .icon {
    margin: 10% 0;
  }
  .info {
    text-align: center;
  }
}
</style>

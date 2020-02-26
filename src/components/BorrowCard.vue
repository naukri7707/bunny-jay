<template>
  <b-card class="borrow-card" :img-src="imgSrc" :img-alt="imgAlt" img-top>
    <div class="info">
      <div>{{ title }}</div>
      <slot></slot>
    </div>
  </b-card>
</template>

<script>
export default {
  name: "BorrowCard",
  props: {
    title: String,
    imgSrc: String,
    imgAlt: String
  }
};
</script>

<style scope lang="scss">
.borrow-card {
  @include buttonify;
  display: inline-block;
  word-wrap: break-word;
  background-color: #e9e9e7;
  background-clip: border-box;
  border: 1px solid rgba(0, 0, 0, 0.125);
  border-radius: 1rem;
  opacity: 0.9;
  width: 10rem;
  margin: 40px 2% 40px;

  .card-body {
    padding: 0 0 1rem;
    text-align: center;
  }
}
</style>

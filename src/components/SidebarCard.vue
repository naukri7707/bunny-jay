<template>
  <b-card class="sidebar-card" tag="router-link" :to="to">
    <slot></slot>
  </b-card>
</template>

<script>
export default {
  props: {
    to: String
  }
};
</script>
<style scope lang="scss">
$font-size: 1em;
$title-color: white;

.sidebar-card {
  @include buttonify;
  margin: 20px auto 40px;
  background-color: #b8b8b8;
  background-clip: border-box;
  border: 1px solid rgba(0, 0, 0, 0.125);
  border-radius: 1rem;
  font-family: BunnyJay;
  width: auto;
  .card-body {
    padding: 0;
    .card-title {
      color: white;
      margin: 0.6rem 2rem 0;
    }

    .card-subtitle {
      margin: 0.4rem 2rem 0;
    }

    .card-text {
      text-align: center;
      color: red;
      margin: calc(0.25rem + 1.25px) 2rem;
    }

    .btn {
      width: 6rem;
      height: 1.5rem;
      margin: 1.25rem;
      float: right;
      color: #4a4a4a;
      text-align: center;
      line-height: 0.25rem;
      padding: 1px;
      border-radius: 0.5rem;
      border-width: 2px;
      border-style: outset;
      background-color: #ededed;
      border-color: #ededed;
      box-sizing: border-box;
    }

    .spinner-border {
      display: flex;
      margin: 1rem auto;
    }
  }
}
</style>

<template>
  <div class="sidebar-item">
    <router-link :to="path">
      <div class="title">{{ title }}</div>
      <div class="name">{{ name }}</div>
      <img class="responsive" :alt="name" :src="img" />
      <button v-show="!selected">
        快速預借
      </button>
      <div v-show="selected" class="comment">
        <h4 class="remain">剩餘{{ remain }}台</h4>
        <h4 v-if="day === 0" class="lenddays">需當天還</h4>
        <h4 v-else class="lenddays">可借用{{ day }}天</h4>
      </div>
    </router-link>
  </div>
</template>

<script>
export default {
  props: {
    name: String,
    title: String,
    path: String,
    img: String,
    remain: Number,
    day: Number,
    selected: Boolean
  }
};
</script>
<style scope lang="scss">
$font-size: 1em;
$title-color: white;

.sidebar-item {
  @include buttonify;
  margin: 20px auto 40px;
  background-color: #b8b8b8;
  background-clip: border-box;
  border: 1px solid rgba(0, 0, 0, 0.125);
  border-radius: 1rem;
  font-family: BunnyJay;

  a {
    color: $title-color;

    .title {
      font-weight: 500;
      font-size: 2em;
    }
  }
}
</style>

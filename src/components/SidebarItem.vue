<template>
  <div class="sidebar-item">
    <router-link :to="link">
      <div class="title">{{ zhName }}</div>
      <div class="sub-title">{{ name }}</div>
      <img class="responsive" :alt="name" :src="image" />
      <button v-show="!selected">
        快速預借
      </button>
      <div v-show="selected" class="comment">
        <h4 class="remain">
          剩餘{{ isNaN(status.remain) ? "???" : status.remain }}台
        </h4>
        <h4 v-if="day === 0" class="deadline">需當天還</h4>
        <h4 v-else class="deadline">可借用{{ day }}天</h4>
      </div>
    </router-link>
  </div>
</template>

<script>
export default {
  props: {
    link: String,
    name: String,
    zhName: String,
    image: String,
    day: Number,
    status: Object,
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

<template>
  <div class="sidebar-item">
    <router-link :to="link">
      <div class="title">
        <div class="main-title">{{ zhName }}</div>
        <div class="sub-title">{{ name }}</div>
      </div>
      <img class="responsive" :alt="name" :src="image" />
      <div class="comment">
        <div v-show="selected" class="info">
          <h5 class="remain">
            剩餘{{ status.remain === -99 ? "???" : status.remain }}台
          </h5>
          <h5 v-if="day === 0" class="deadline">需當天還</h5>
          <h5 v-else class="deadline">可借用{{ day }}天</h5>
        </div>
        <button v-show="!selected" class="quick-borrow-btn">
          快速預借
        </button>
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
      min-height: 3rem;
      padding-left: 2em;
      font-weight: 500;
      .main-title {
        font-size: 2em;
      }
    }

    .comment {
      margin: 0.1em auto 0.1em;
      text-align: center;

      min-height: 4rem;
      .deadline {
        color: red;
      }
      .quick-borrow-btn {
        margin-top: 1em;
        margin-right: 1em;
        float: right;
        border-radius: 0.5rem;
        color: #4a4a4a;
        line-height: 1.25em;
        width: 6em;
        background-color: #ededed;
        border-color: #ededed;
      }
    }
  }
}
</style>

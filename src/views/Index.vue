<template>
  <b-container id="index">
    <b-row>
      <div class="title">歡迎使用BunnyJay</div>
    </b-row>
    <div class="title" v-if="$store.state.user.login === false">您尚未登入</div>
    <div class="title" v-else-if="borrowList.length === 0">
      沒有租借的器材
    </div>
    <transition-group appear v-else class="fade-group" name="fade" tag="div">
      <IndexCard
        class="fade-item"
        v-for="card in borrowList"
        :key="card._id"
        v-bind="card"
      />
    </transition-group>
  </b-container>
</template>

<script>
import IndexCard from "@/components/IndexCard.vue";

export default {
  name: "index",
  components: {
    IndexCard
  },
  computed: {
    borrowList() {
      return this.$store.state.product.userBorrowList;
    }
  },
  created() {
    this.$store.dispatch("product/getBorrowList");
  }
};
</script>

<style lang="scss" scoped>
#index {
  .title {
    width: 100%;
    padding: 5rem 0 7rem;
    font-size: 3.125rem;
    text-align: center;
  }
}
</style>

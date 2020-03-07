<template>
  <b-container id="index">
    <b-row>
      <div class="title">歡迎使用BunnyJay</div>
    </b-row>
    <!-- TODO 未登入 -->
    <IndexCard v-for="card in borrowList" :key="card._id" v-bind="card" />
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

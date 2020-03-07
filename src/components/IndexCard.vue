<template>
  <b-row class="index-card">
    <b-img
      ref="icon"
      class="icon"
      :src="productInfo.iconSide"
      rounded="circle"
      :alt="name"
    >
    </b-img>
    <div class="info">
      <div class="title">{{ name }} 借用中</div>
      <p>
        {{ productInfo.zhName }}

        可租用天數為 {{ productInfo.day }}天，您已經使用了2天，若要再度預借可以
      </p>
      <router-link :to="`borrow/${product}`">快速預借 &gt;</router-link>
    </div>
  </b-row>
</template>

<script>
export default {
  name: "index",
  props: {
    _id: Number,
    product: String,
    name: String,
    uid: Number,
    borrowTime: Number
  },
  computed: {
    productInfo() {
      return this.$store.state.product.list[this.product];
    }
  }
};
</script>

<style lang="scss" scoped>
.index-card {
  margin: 1.25rem;

  .icon {
    width: 10rem;
    height: 10rem;
    object-fit: cover;
  }
  .info {
    padding-left: 1.5rem;
    .title {
      font-size: 2rem;
    }
  }
}
</style>

<template>
  <b-row class="index-card">
    <b-img
      ref="icon"
      class="icon"
      :src="productInfo.icon"
      rounded="circle"
      :alt="name"
    >
    </b-img>
    <div class="info">
      <div class="title">{{ name }} 借用中</div>
      <p>
        <span>from {{ new Date(borrowTime).format("yyyy-MM-dd") }} </span>
        <span v-if="remainDay === 0">今天到期</span>
        <span v-else>剩餘{{ remainDay }}天</span>
      </p>
      <p>
        <template v-if="productInfo.day">
          <div>
            {{ productInfo.zhName }}可租用天數為{{
              productInfo.day
            }}天，您已經使用了{{ useDay }}天，若要再度預借可以
          </div>
          <router-link :to="`product/${product}`">快速預借 &gt;</router-link>
        </template>
        <template v-else>
          <div>{{ productInfo.zhName }}需當天歸還</div>
        </template>
      </p>
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
      return this.$store.state.product.infoList[this.product];
    },
    useDay() {
      return parseInt((Date.now() - this.borrowTime) / Date.timeOfDay);
    },
    remainDay() {
      return this.productInfo.day - this.useDay;
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

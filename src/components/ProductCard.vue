<template>
  <b-card
    class="product-card"
    tag="router-link"
    :to="`/borrow?pid=${_id}`"
    img-top
    :img-src="uid ? productInfo.iconOff : productInfo.iconOn"
    :img-alt="productInfo.key"
  >
    <div class="info">
      <div>{{ name }}</div>
      <div>---</div>
      <div v-if="uid === 0">可預約</div>
      <div v-else-if="isExpired">已到期未歸還</div>
      <div v-else>{{ deadDate }}</div>
    </div>
  </b-card>
</template>

<script>
export default {
  name: "ProductCard",
  props: {
    _id: Number,
    product: String,
    name: String,
    uid: Number,
    borrowTime: Number
  },
  computed: {
    /** 產品資訊 */
    productInfo() {
      return this.$store.state.product.infoList[this.product];
    },
    /** 到期時間 (ms) */
    deadline() {
      return this.borrowTime + this.productInfo.day * Date.timeOfDay;
    },
    /** 格式化後的到期日 */
    deadDate() {
      return new Date(this.deadline).format("yyyy/MM/dd");
    },
    /** 是否過期 */
    isExpired() {
      return Date.now() >= this.deadline + Date.timeOfDay;
    }
  }
};
</script>

<style scope lang="scss">
.product-card {
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

<template>
  <b-card
    class="borrow-card"
    img-top
    :img-src="uid ? productInfo.iconOff : productInfo.iconOn"
    :img-alt="productInfo.key"
    @click="borrow()"
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
  name: "BorrowCard",
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
      return this.$store.state.product.list[this.product];
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
  },
  methods: {
    borrow() {
      if (this.uid === 0) {
        this.$store.dispatch("product/borrow", this._id).then(
          ({ data }) => {
            this.uid = data.uid;
            this.borrowTime = data.borrowTime;
            let msg = this.isExpired
              ? `您已成功預借「${this.name}」，請在當天放學前歸還。`
              : `您已成功預借「${this.name}」，
              請於${this.deadDate()}}放學前歸還。`;

            this.toast(msg, {
              title: "租借成功",
              variant: "success"
            });

            this.$store.state.product.list[this.product].status.remain--;
          },
          ({ status, data }) => {
            this.toast(data, {
              title: `Error ${status}`,
              variant: "danger"
            });
            if (status === 401) {
              this.$router.push("/user/login");
            }
          }
        );
      } else {
        this.$store.dispatch("product/getStatus", this._id).then(
          ({ data }) => {
            let { username, nickname } = data;
            this.toast(`「${this.name}」已被 ${nickname}(${username}) 租用`, {
              title: "無法預借",
              variant: "warning"
            });
          },
          ({ status, data }) => {
            this.toast(data, {
              title: `Error ${status}`,
              variant: "danger"
            });
          }
        );
      }
    }
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

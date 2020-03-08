<template>
  <b-container id="product">
    <h1>{{ product.name }}</h1>
    <div>類型：{{ productInfo.zhName }}</div>
    <div :alt="user.username || 無">使用者：{{ user.nickname || "無" }}</div>
    <div>租借時間</div>
    <div>到期日</div>
    <b-button variant="info" @click="borrow">
      Bunny Jay 這個
    </b-button>
  </b-container>
</template>

<script>
export default {
  name: "borrow",
  data() {
    return {
      product: {
        _id: Number,
        product: String,
        name: String,
        uid: Number,
        borrowTime: Number
      },
      user: {
        _id: Number,
        username: String,
        nickname: String
      }
    };
  },
  computed: {
    /** 產品資訊 */
    productInfo() {
      return this.$store.state.product.list[this.product.product];
    },
    /** 到期時間 (ms) */
    deadline() {
      return this.product.borrowTime + this.productInfo.day * Date.timeOfDay;
    },
    /** 格式化後的到期日 */
    deadDate() {
      return new Date(this.product.deadline).format("yyyy/MM/dd");
    },
    /** 是否過期 */
    isExpired() {
      return Date.now() >= this.product.deadline + Date.timeOfDay;
    }
  },
  created() {
    this.$store.dispatch("product/status", this.$route.query.pid).then(
      ({ data }) => {
        this.product = data.product;
        this.user = data.user;
        this.$store.commit(
          "app/setBackgroundImage",
          this.productInfo.background
        );
      },
      ({ status, data }) => {
        this.toast(data, {
          title: `Error ${status}`,
          variant: "danger"
        });
      }
    );
  },
  methods: {
    borrow() {
      this.$store.dispatch("product/borrow", this.$route.query.pid).then(
        ({ data }) => {
          const { product, user } = data;
          if (data.borrow) {
            this.product = product;
            this.user = user;
            let msg = this.isExpired
              ? `您已成功預借「${product.name}」，請在當天放學前歸還。`
              : `您已成功預借「${product.name}」，
              請於${product.deadDate}}放學前歸還。`;
            this.toast(msg, { title: "租借成功", variant: "success" });
          } else {
            this.toast(
              // TODO user + uid uid 判斷自己 => 您解借用
              `「${product.name}」已被 ${user.nickname}(${user.username}) 租用`,
              { title: "無法預借", variant: "warning" }
            );
          }
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
    }
  }
};
</script>

<style scope lang="scss"></style>

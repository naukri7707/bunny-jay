<template>
  <b-container id="product">
    <h1>{{ product.name }}</h1>
    <div>類型：{{ productInfo.zhName }}</div>
    <div v-if="user._id">
      使用者：{{ user.nickname }} ({{ user.username }})
      <div>
        租借時間：{{ new Date(product.borrowTime).format("yyyy/MM/dd") }}
      </div>
      <div>到期時間：{{ deadDate }}</div>
    </div>
    <div v-else>
      使用者：目前沒有人租用
      <div>
        可租借時間：{{ productInfo.day ? `${productInfo.day}天` : "當天還" }}
      </div>
      <div>
        到期時間：{{
          new Date(Date.now() + productInfo.day * Date.timeOfDay).format(
            "yyyy/MM/dd"
          )
        }}
      </div>
    </div>

    <br />

    <b-button variant="primary" @click="borrow()">
      Bunny Jay
    </b-button>
    <br />
    <b-button
      v-if="$store.state.user.usergroup >= 90"
      variant="secondary"
      @click="retrieve()"
    >
      回收
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
      return this.$store.state.product.infoList[this.product.product];
    },
    /** 到期時間 (ms) */
    deadline() {
      return this.product.borrowTime + this.productInfo.day * Date.timeOfDay;
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
              請於${this.deadDate}放學前歸還。`;
            this.toast(msg, { title: "租借成功", variant: "success" });
          } else {
            let msg =
              user._id === this.$store.state.user.uid
                ? "你已經借到拉！"
                : `「${product.name}」已被 ${user.nickname}(${user.username}) 租用`;
            this.toast(msg, { title: "無法預借", variant: "warning" });
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
    },
    retrieve() {
      this.$store.dispatch("product/retrieve", this.$route.query.pid).then(
        ({ data }) => {
          this.product = data;
          this.user = { _id: 0, username: "", nickname: "" };
          this.toast("回收完成", { title: "回收成功", variant: "success" });
        },
        ({ status, data }) => {
          this.toast(data, {
            title: `Error ${status}`,
            variant: "danger"
          });
          if (status === 401) {
            this.toast(this.$route.path, {
              title: `Error ${this.$route.path}`,
              variant: "danger"
            });
            this.$router.push("/user/login");
          }
        }
      );
    }
  }
};
</script>

<style scope lang="scss"></style>

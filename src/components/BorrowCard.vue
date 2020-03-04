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
      <div v-else-if="Date.now() < deadline">
        {{ new Date(deadline).format("yyyy/MM/dd") }}
      </div>
      <div v-else>
        已到期未歸還
      </div>
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
    deadline: String
  },
  computed: {
    productInfo() {
      return this.$store.state.product.list[this.product];
    }
  },
  methods: {
    borrow() {
      if (this.uid === 0) {
        this.$store.dispatch("product/borrow", this._id).then(
          ({ data }) => {
            let { name, uid, deadline } = data;
            let msg =
              deadline - Date.now() < 24 * 60 * 60 * 1000
                ? `您已成功預借「${name}」，請在當天歸還。`
                : `您已成功預借「${name}」，請於${new Date(deadline).format(
                    "yyyy/MM/dd"
                  )}放學前歸還。`;

            this.toast(msg, {
              title: "租借成功",
              variant: "success"
            });
            this.uid = uid;
            this.deadline = deadline;
          },
          ({ status, data }) => {
            this.toast(data, {
              title: `Error ${status}`,
              variant: "danger"
            });
          }
        );
      } else {
        this.toast("本產品已被租用", {
          variant: "warning"
        });
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

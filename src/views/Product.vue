<template>
  <b-container id="product">
    <h1>Bunny Jay {{ selection.zhName }}</h1>
    <ProductCard
      v-for="card in selection.status.list"
      :key="card._id"
      v-bind="card"
    />
    <b-button @click="addRandomData">
      新增隨機資料
    </b-button>
  </b-container>
</template>

<script>
import ProductCard from "@/components/ProductCard.vue";
import Product from "@/assets/js/product";

export default {
  name: "product",
  components: {
    ProductCard
  },
  computed: {
    selection() {
      return this.$store.state.product.selection;
    }
  },
  methods: {
    loadData(target) {
      this.$store.dispatch("product/selectProduct", target).then(
        () => {
          this.$store.commit(
            "app/setBackgroundImage",
            this.selection.background
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
    addRandomData() {
      this.$store.dispatch("product/addRandomData");
    }
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      next();
      vm.loadData(to.params.product);
    });
  },
  beforeRouteUpdate(to, from, next) {
    this.loadData(to.params.product);
    next();
  },
  beforeRouteLeave(to, from, next) {
    this.$store.state.product.selection = Product.default;
    next();
  }
};
</script>

<style scope lang="scss"></style>

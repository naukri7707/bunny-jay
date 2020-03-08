<template>
  <b-container id="product">
    <transition name="title-fade">
      <h1 v-show="selection.zhName">Bunny Jay {{ selection.zhName }}</h1>
    </transition>
    <transition-group class="fade-group" name="fade">
      <ProductCard
        class="fade-item"
        v-for="card in selection.status.list"
        :key="card._id"
        v-bind="card"
      />
    </transition-group>
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
      vm.loadData(to.params.product);
      next();
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

<style scope lang="scss">
.title-fade-enter-active,
.title-fade-leave-active {
  transition: opacity 0.5s;
}
.title-fade-enter,
.title-fade-leave-to {
  opacity: 0;
}
</style>

<template>
  <router-view />
</template>

<script>
export default {
  name: "product",
  computed: {
    selectionInfo() {
      return this.$store.state.product.selectionInfo;
    }
  },
  watch: {
    selectionInfo(to, from) {
      if (to != from) {
        this.$store.commit(
          "app/setBackgroundImage",
          this.selectionInfo.background
        );
      }
    }
  },
  methods: {
    loadData(product) {
      this.$store.state.product.selection = product;

      this.$store.dispatch("product/update", product).then(
        () => {},
        ({ status, data }) => {
          this.toast(data, {
            title: `Error ${status}`,
            variant: "danger"
          });
        }
      );
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
    this.$store.state.product.selection = "";
    next();
  }
};
</script>

<style scope lang="scss"></style>

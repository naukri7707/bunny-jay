<template>
  <b-container id="borrow">
    <h1>Bunny Jay {{ selection.zhName }}</h1>

    <template v-for="card in selection.status.list">
      <BorrowCard
        v-if="card.deadline === 0"
        :key="card.id"
        :title="selection.zhName"
        :img-src="selection.iconOn"
        :img-alt="selection.key"
      >
        <div>---</div>
        <div>可預約</div>
      </BorrowCard>
      <BorrowCard
        v-else
        :key="card.id"
        :title="selection.zhName"
        :img-src="selection.iconOff"
        :img-alt="selection.key"
      >
        <div>{{ card.user }}</div>
        <div>{{ card.deadline }}</div>
      </BorrowCard>
    </template>
    <b-button @click="addRandomData">
      新增隨機資料
    </b-button>
  </b-container>
</template>

<script>
import BorrowCard from "@/components/BorrowCard.vue";
import Product from "@/assets/js/product";

export default {
  name: "borrow",
  components: {
    BorrowCard
  },
  computed: {
    selection() {
      return this.$store.state.product.selection;
    }
  },
  methods: {
    loadData(target) {
      this.$store.dispatch("selectProduct", target).then(
        () => {},
        ({ status, data }) => {
          this.toast(`Error ${status}`, data, {
            toaster: "TR",
            variant: "danger"
          });
        }
      );
    },
    addRandomData() {
      this.$store.dispatch("addRandomData");
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

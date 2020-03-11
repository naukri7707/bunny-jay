<template>
  <b-container id="product">
    <h1>Bunny Jay {{ selectionInfo.zhName }}</h1>
    <transition-group class="fade-group" name="fade">
      <ProductCard
        class="fade-item"
        v-for="card in selectionInfo.status.list"
        :key="card._id"
        v-bind="card"
      />
    </transition-group>
    <b-button @click="addRandomData()">
      ADD
    </b-button>
  </b-container>
</template>

<script>
import ProductCard from "@/components/ProductCard.vue";

export default {
  name: "list",
  components: {
    ProductCard
  },
  computed: {
    selectionInfo() {
      return this.$store.state.product.selectionInfo;
    }
  },
  methods: {
    addRandomData() {
      this.$store.dispatch("product/addRandomData");
    }
  }
};
</script>

<style scope lang="scss"></style>

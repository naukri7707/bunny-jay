<template>
  <div class="card">
    <div class="main-card">
      <a>
        <img alt="產品照片1" class="picon" :src="enable ? enable : disable" />
        <div class="main-card-info">
          <div>{{ title }}</div>
          <template v-if="enable">
            <div>---</div>
            <div>可預約</div>
          </template>
          <template v-else>
            <div>{{ user }}</div>
            <div>{{ deadline }}</div>
          </template>
        </div>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: "Card",
  props: {
    enable: Boolean,
    img: String,
    title: String,
    user: String,
    deadline: Number
  }
};
</script>

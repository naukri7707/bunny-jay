export default {
  namespaced: true,
  state: {
    style: {
      backgroundImage: String
    }
  },
  mutations: {
    setBackgroundImage(state, path) {
      state.style.backgroundImage = `url(${path})`;
    }
  }
};

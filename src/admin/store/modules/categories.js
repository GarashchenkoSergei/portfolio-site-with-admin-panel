import { resolveProjectReferencePath } from "typescript";

export default {
  namespaced: true,
  state: {
    categories: []
  },
  mutations: {
    SET_CATEGORIES: (state, categories) => {
      state.categories = categories;
    },
    ADD_CATEGORY(state, newCategory) {
      state.categories.push(newCategory);
    },
    EDIT_CATEGORY(state, editedCategory) {
      state.categories = state.categories.map(category => {
        return category.id == editedCategory.id ? editedCategory : category;
      });
    },
    REMOVE_CATEGORY(state, removedCategoryId) {
      state.categories = state.categories.filter(category => category.id != removedCategoryId);
    }
  },
  actions: {
    async addNewSkillGroup({ commit }, categoryTitle) {
      try {

        const { data: category } = await this.$axios.post("/categories", {
          title: categoryTitle
        });

        commit("ADD_CATEGORY", category);
      } catch (error) {
        throw new Error(
          error.response.data.error || error.response.data.message
        );
      }
    },
    async fetchCategories({ commit }) {
      try {
        const response = await this.$axios.get("/categories");
        commit("SET_CATEGORIES", response.data.reverse());
        return response;
      } catch (error) {
        throw new Error(
          error.response.data.error || error.response.data.message
        );
      }
    },
    async editCategory({ commit }, editedCategory) {
      try {
        const response = await this.$axios.post(`/categories/${editedCategory.id}`, editedCategory);
        
        commit("EDIT_CATEGORY", response.data.category);
        return response;
      } catch {
        error.response.data.error || error.response.data.message
      }
    },
    async removeCategory({ commit }, categoryId) {
      try {
        const response = await this.$axios.delete(`/categories/${categoryId}`);

        commit("REMOVE_CATEGORY", categoryId);
      } catch {
        error.response.data.error || error.response.data.message
      }
    }
  }
}
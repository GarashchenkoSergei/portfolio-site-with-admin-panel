import { generateStdError } from "../../helpers/errorHandler";

export default {
  namespaced: true,
  state: {
    works: [],
    currentWork: {}
  },
  mutations: {
    SET_WORKS_STATE: (state, works) => (state.works = works),
    ADD_NEW_WORK: (state, work) => state.works.push(work),
    REMOVE_WORK: (state, removedWorkId) => {
      state.works = state.works.filter(
        work => work.id !== removedWorkId
      );
    },
    EDIT_WORK: (state, editedWork) => {
      state.works = state.works.map(work => {
        return work.id === editedWork.id ? editedWork : work;
      });
    },
    SET_CURRENT_WORK: (state, selectedWorkId) => {
      
      state.currentWork = state.works.filter(
        work => work.id === selectedWorkId
      )[0];
    }
  },
  actions: {
    async addNewWork({ commit }, newWork) {
      try {
        const response = await this.$axios.post('/works', newWork);

        commit("ADD_NEW_WORK", response.data);
        return response;
      } catch (error) {
        generateStdError(error);
      }
    },
    async fetchWorks({ commit, rootGetters }) {
      try {
        const response = await this.$axios.get(`/works/164`);
        commit("SET_WORKS_STATE", response.data);
        return response;
      } catch (error) {
        generateStdError(error);
      }
    },
    async removeWork({ commit }, workId) {
      try {
        const response = await this.$axios.delete(`/works/${workId}`);
        commit("REMOVE_WORK", workId);
        return response;
      } catch (error) {
        generateStdError(error);
      }
    },
    async updateWork({ commit }, payload) {
      const workData = new FormData();
      workData.append('title', payload.title);
      workData.append('techs', payload.techs);
      workData.append('link', payload.link);
      workData.append('photo', payload.photo);
      workData.append('description', payload.description);
      try {
        const response = await this.$axios.post(`/works/${payload.id}`, workData);
        commit("EDIT_WORK", response.data.work);
        return response;
      } catch (error) {
        generateStdError(error);
      }
    }
  }
};



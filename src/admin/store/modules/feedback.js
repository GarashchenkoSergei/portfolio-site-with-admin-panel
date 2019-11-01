import { generateStdError } from "../../helpers/errorHandler";

export default {
  namespaced: true,
  state: {
    reviews: [],
    currentReview: {}
  },
  mutations: {
    SET_REVIEWS_STATE: (state, reviews) => (state.reviews = reviews),
    ADD_NEW_REVIEW: (state, review) => state.reviews.push(review),
    REMOVE_REVIEW: (state, removedReviewId) => {
      state.reviews = state.reviews.filter(
        review => review.id !== removedReviewId
      );
    },
    EDIT_REVIEW: (state, editedReview) => {
      state.reviews = state.reviews.map(review => {
        return review.id === editedReview.id ? editedReview : review;
      });
    },
    SET_CURRENT_REVIEW: (state, selectedReviewId) => {
      
      state.currentReview = state.reviews.filter(
        review => review.id === selectedReviewId
      )[0];
    }
  },
  actions: {
    async addNewReview({ commit }, newReview) {
      try {
        const response = await this.$axios.post('/reviews', newReview);

        commit("ADD_NEW_REVIEW", response.data);
        return response;
      } catch (error) {
        generateStdError(error);
      }
    },
    async fetchReviews({ commit, rootGetters }) {
      try {
        const response = await this.$axios.get(`/reviews/164`);
        commit("SET_REVIEWS_STATE", response.data);
        return response;
      } catch (error) {
        generateStdError(error);
      }
    },
    async removeReview({ commit }, reviewId) {
      try {
        const response = await this.$axios.delete(`/reviews/${reviewId}`);
        commit("REMOVE_REVIEW", reviewId);
        return response;
      } catch (error) {
        generateStdError(error);
      }
    },
    async updateReview({ commit }, payload) {
      const reviewData = new FormData();
      reviewData.append('author', payload.author);
      reviewData.append('occ', payload.occ);
      reviewData.append('text', payload.text);
      reviewData.append('photo', payload.photo);
      try {
        const response = await this.$axios.post(`/reviews/${payload.id}`, reviewData);
        commit("EDIT_REVIEW", response.data.review);
        return response;
      } catch (error) {
        generateStdError(error);
      }
    }
  }
};



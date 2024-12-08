<template>
    <div class="pagination-controls">
        <!-- Pagination Buttons -->
        <div class="pagination">
            <button :disabled="currentPage === 1" @click="$emit('changePage', currentPage - 1)">
                Previous
            </button>
            <span>Page {{ currentPage }} of {{ totalPages }}</span>
            <button :disabled="currentPage === totalPages" @click="$emit('changePage', currentPage + 1)">
                Next
            </button>
        </div>

        <!-- Page Size Selector -->
        <div class="page-size">
            <label for="movies-per-page">Movies per page:</label>
            <select id="movies-per-page" v-model="localMoviesPerPage" @change="emitPageSizeChange">
                <option value="10">10</option>
                <option value="15">15</option>
                <option value="20">20</option>
            </select>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        currentPage: Number,
        totalPages: Number,
        moviesPerPage: Number,
    },
    data() {
        return {
            localMoviesPerPage: this.moviesPerPage,
        };
    },
    methods: {
        emitPageSizeChange() {
            this.$emit("changePageSize", parseInt(this.localMoviesPerPage));
        },
    },
};
</script>

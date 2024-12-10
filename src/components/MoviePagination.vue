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
                <option v-for="option in pageSizeOptions" :key="option" :value="option">
                    {{ option }}
                </option>
            </select>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        currentPage: {
            type: Number,
            default: 0
        },
        totalPages: {
            type: Number,
            default: 0
        },
        moviesPerPage: {
            type: Number,
            default: 0
        },
        pageSizeOptions: {
            type: Array,
            default: () => [10, 20]
        }
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

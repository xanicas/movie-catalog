<template>
    <div class="movie-list" :class="{ isLoading: loading }">
        <div class="wrapper">
            <!-- Filters Component -->
            <MovieFilters :genres="genres" :selectedGenre="selectedGenre" @updateMovies="handleUpdateMovies"
                @resetMovies="fetchMovies" @changeGenre="handleGenreChange" />

            <!-- Movies Component -->
            <MovieList :movies="displayedMovies" />

            <!-- Pagination Controls -->
            <MoviePagination :currentPage="currentFrontendPage" :totalPages="totalFrontendPages"
                :moviesPerPage="moviesPerPage" @changePage="changePage" @changePageSize="handlePageSizeChange" />
        </div>
    </div>
</template>

<script>
import { mapGetters } from "vuex";
import { fetchMovies, fetchGenres } from "@/services/api";
import MovieFilters from "@/components/MovieFilters.vue";
import MovieList from "@/components/MovieList.vue";
import MoviePagination from "@/components/MoviePagination.vue";

export default {
    components: { MovieFilters, MovieList, MoviePagination },
    data() {
        return {
            loading: false,
            selectedGenre: "",
            movies: [],
            currentPage: 1,
            currentFrontendPage: 1,
            totalPages: 1,
            moviesPerPage: 10,
        };
    },
    computed: {
        ...mapGetters([
            "genres"
        ]),
        displayedMovies() {
            const startIndex = ((this.currentFrontendPage - 1) % (20 / this.moviesPerPage)) * this.moviesPerPage;
            return this.movies.slice(startIndex, startIndex + this.moviesPerPage);
        },
        totalFrontendPages() {
            return Math.ceil((this.totalPages * 20) / this.moviesPerPage);
        },
    },
    mounted() {
        this.loading = true;
        this.fetchGenres();
        this.fetchMovies();
        this.loading = false;
    },
    methods: {
        async fetchGenres() {
            if (this.genres.length === 0) {
                try {
                    const genres = await fetchGenres();
                    this.$store.dispatch('setGenres', genres);
                } catch (error) {
                    console.error("Error fetching genres:", error);
                }
            } else {
                console.log("Genres are already loaded in the store.");
            }
        },
        async fetchMovies() {
            try {
                const data = await fetchMovies(this.currentPage, this.selectedGenre);
                this.movies = data.results;
                this.totalPages = data.total_pages;
                this.currentFrontendPage = 1;
            } catch (error) {
                console.error("Error fetching movies:", error);
            }
        },
        handleGenreChange(newGenre) {
            this.selectedGenre = newGenre;
            this.currentPage = 1;
            this.currentFrontendPage = 1;
            this.fetchMovies();
        },
        handleUpdateMovies(payload) {
            this.movies = payload.results;
            this.totalPages = payload.total_pages;
            this.currentPage = 1;
            this.currentFrontendPage = 1;
        },
        async changePage(newFrontendPage) {
            const backendPage = Math.ceil(newFrontendPage / (20 / this.moviesPerPage));

            if (backendPage !== this.currentPage && backendPage <= this.totalPages) {
                this.currentPage = backendPage;
                await this.fetchMovies();
            }

            if (newFrontendPage > 0 && newFrontendPage <= this.totalFrontendPages) {
                this.currentFrontendPage = newFrontendPage;
            }
        },
        handlePageSizeChange(newPageSize) {
            this.moviesPerPage = newPageSize;
            this.currentFrontendPage = 1;
        },
    },
};
</script>
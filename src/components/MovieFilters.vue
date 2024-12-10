<template>
    <div class="filter">
        <!-- Search bar filter -->
        <search-bar @updateMovies="$emit('updateMovies', $event)" @resetMovies="$emit('resetMovies', $event)" />

        <!-- Genre filter -->
        <div class="genre-filter">
            <span>Filter by genre</span>
            <select v-model="localSelectedGenre" @change="emitGenreChange">
                <option value="">All Movies</option>
                <option v-for="genre in genres" :key="genre.id" :value="genre.id">
                    {{ genre.name }}
                </option>
            </select>
        </div>
    </div>
</template>

<script>
import SearchBar from "@/components/SearchBar.vue";

export default {
    props: {
        genres: {
            type: Array,
            default: () => [],
        },
        selectedGenre: {
            type: String,
            default: ''
        },
    },
    components: { SearchBar },
    data() {
        return {
            localSelectedGenre: this.selectedGenre,
        };
    },
    methods: {
        emitGenreChange() {
            this.$emit("changeGenre", this.localSelectedGenre);
        },
    },
};
</script>
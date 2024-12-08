<template>
    <div class="search-bar">
        <i class="fa fa-search"></i>
        <input v-model="query" @input="onSearch" placeholder="Search movie" />
    </div>
</template>

<script>
import { searchMovies } from "@/services/api";

export default {
    data() {
        return {
            query: "",
        };
    },
    methods: {
        async onSearch() {
            if (this.query.length > 0) {
                const response = await searchMovies(this.query);
                this.$emit("updateMovies", response.data.results);
            } else if (this.query.length === 0) {
                this.$emit("resetMovies");
            }
        },
    },
};
</script>

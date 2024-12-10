<template>
    <div class="search-bar">
        <i class="fa fa-search"></i>
        <input v-model="query" @input="onSearch" :placeholder="placeholder" />
    </div>
</template>

<script>
import { searchMovies } from "@/services/api";

export default {
    props: {
        placeholder: {
            type: String,
            default: 'Search movie',
        },
    },
    data() {
        return {
            query: "",
        };
    },
    methods: {
        async onSearch() {
            if (this.query.length > 0) {
                const response = await searchMovies(this.query);
                this.$emit("updateMovies", response.data);
            } else if (this.query.length === 0) {
                this.$emit("resetMovies");
            }
        },
    },
};
</script>

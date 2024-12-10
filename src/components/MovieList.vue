<template>
    <div class="movies">
        <div v-for="movie in movies" :key="movie.id" class="movie" @click="goToMovieDetails(movie.id)">
            <ImageWithFallback :src="movie.poster_path ? `https://image.tmdb.org/t/p/w200${movie.poster_path}` : ''"
                :alt="movie.title" />
            <p>{{ movie.title }}</p>
            <div class="movie-rating">
                <i class="fa-solid fa-star"></i>
                <p>{{ movie.vote_average }}</p>
                <p class="vote-count">({{ movie.vote_count }})</p>
            </div>
        </div>
    </div>
</template>

<script>
import ImageWithFallback from "@/components/ImageWithFallback.vue";

export default {
    props: {
        movies: Array,
    },
    components: { ImageWithFallback },
    methods: {
        goToMovieDetails(movieId) {
            this.$store.dispatch('setSelectedMovieId', movieId);
            this.$router.push({ name: 'MovieDetails', params: { id: movieId } });
        },
    }
};
</script>
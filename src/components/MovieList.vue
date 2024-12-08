<template>
    <div class="movies">
        <div v-for="movie in movies" :key="movie.id" class="movie">
            <ImageWithFallback :src="movie.poster_path ? `https://image.tmdb.org/t/p/w200${movie.poster_path}` : ''"
                :alt="movie.title" />
            <p>{{ movie.title }}</p>
            <div class="movie-rating">
                <p>{{ movie.vote_average }}</p>
                <i class="fa-solid fa-star"></i>
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
};
</script>
<template>
    <div class="movie-details">
        <div class="wrapper">
            <div class="content" v-if="movie">
                <div class="back-button" @click="goToMoviesList()">
                    <i class="fa-solid fa-backward-step"></i> Go back
                </div>
                <div class="movie-details-container">
                    <div class="movie-image">
                        <ImageWithFallback
                            :src="movie.poster_path ? `https://image.tmdb.org/t/p/w200${movie.poster_path}` : ''"
                            :alt="movie.title" />
                        <div class="movie-rating">
                            <p>Rating: {{ movie.vote_average }}</p>
                            <i class="fa-solid fa-star"></i>
                        </div>
                    </div>

                    <div class="movie-info">
                        <h2>{{ movie.title }}</h2>
                        <p><strong>Release Date:</strong> {{ movie.release_date }}</p>
                        <p class="movie-overview">{{ movie.overview }}</p>
                        <div v-if="movie.genres && movie.genres.length > 0" class="movie-genres">
                            <p>Genres</p>
                            <div v-for="genre in movie.genres" :key="genre.id" class="genres">
                                <span>{{ genre.name }}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div v-else>
                <p>Loading movie details...</p>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from "vuex";
import { fetchMovieById } from "@/services/api";
import ImageWithFallback from "@/components/ImageWithFallback.vue";

export default {
    components: { ImageWithFallback },
    data() {
        return {
            movie: null,
            error: '',
        };
    },
    computed: {
        ...mapGetters([
            "selectedMovieId"
        ]),
    },
    async created() {
        try {
            const response = await fetchMovieById(this.selectedMovieId);
            if (response && response.data) {
                this.movie = response.data;
            } else {
                throw new Error('Invalid response data');
            }
        } catch (error) {
            this.error = 'Failed to fetch movie details';
            if (process.env.NODE_ENV === 'development') {
                console.error('Error fetching movie details:', error);
            }
        }
    },
    methods: {
        goToMoviesList() {
            this.$router.push({ name: 'MoviesList' });
        }
    }
};
</script>

<template>
    <div id="app">
        <HeaderComponent />
        <MoviesList />
    </div>
</template>

<script>
import HeaderComponent from "./components/Header.vue";
import MoviesList from "./views/MoviesList.vue";


export default {
    name: 'App',
    components: {
        HeaderComponent, MoviesList
    }
}
</script>

<template>
    <header class="app-header">
        <div class="wrapper">
            <h1 @click="backHomePage()">Movie Catalog</h1>
            <nav>
                <ul>
                    <li><a href="/">Home</a></li>
                    <li><a href="/about">About</a></li>
                </ul>
            </nav>
        </div>
    </header>
</template>

<script>
export default {
    name: "HeaderComponent",
    methods: {
        backHomePage() {
            if (this.$route.path !== '/') {
                this.$router.push({ name: 'MoviesList' });
            }
        }
    }
};
</script>
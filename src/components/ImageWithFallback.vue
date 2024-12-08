<template>
    <div class="image-wrapper">
        <img :src="resolvedSrc" :alt="alt" @error="handleError" />
    </div>
</template>

<script>
export default {
    props: {
        src: {
            type: String,
            required: true,
        },
        alt: {
            type: String,
            default: '',
        },
        placeholder: {
            type: String,
            default: require('../assets/images/no_image_placeholder.svg'),
        },
    },
    data() {
        return {
            resolvedSrc: this.src,
        };
    },
    methods: {
        handleError() {
            this.resolvedSrc = this.placeholder;
        },
    },
};
</script>

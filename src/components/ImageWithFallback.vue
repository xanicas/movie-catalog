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
            default: '../assets/images/no_image_placeholder.svg',
        },
    },
    data() {
        return {
            resolvedSrc: this.src || this.placeholder,
        };
    },
    methods: {
        handleError() {
            this.resolvedSrc = this.placeholder;
        },
    },
};
</script>

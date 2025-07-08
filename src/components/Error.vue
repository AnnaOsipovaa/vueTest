<script setup lang="ts">
    defineProps<{
        title: string,
        text: string,
        image: string
    }>();
</script>

<template>
    <div class="error">
        <div class="error__image">
            <img class="error__image-img image" :src="'/img/'+ image">
        </div>
        <div class="error__info">
            <div class="error__info-text_m">{{ title }}</div>
            <div class="error__info-text_s">{{ text }}</div>
        </div>
    </div>
</template>

<style scoped lang="scss">
@use '../assets/styles/mixins' as *;

.error{
    @include flex-center;
    padding: 61px 0;
    gap: 24px;
    width: 100%;
    .error__image{
        max-width: 264px;
    }
    .error__info{
        text-align: center;
        flex-shrink: 0;

        .error__info-text_m{
            font-size: 22px;
            font-family: 'Roboto-Bold', sans-serif;
            margin-bottom: 8px;
        }
        .error__info-text_s{
            font-size: 18px;
            font-family: 'Roboto-Regular', sans-serif;
        }
    }
}
@media (max-width: 680px) {
    .error{
        flex-direction: column;
    }
}
</style>
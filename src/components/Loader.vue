<template>
    <div class="loader-fon">
        <div class="loader">
            <img class="loader-img image" src="/img/loader.gif" alt="loading">
        </div>
    </div>
</template>

<style scoped lang="scss"> 
@use '../assets/styles/mixins' as *;

.loader-fon{
    @include flex-center;
    padding: 61px;

    .loader{
        @include flex-center;
        width: 48px;
        height: 48px;
    }
}
</style>
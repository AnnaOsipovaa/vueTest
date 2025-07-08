<script setup lang="ts">
import { onMounted, ref, Ref } from 'vue';
import { useUserStore } from '../stores/user-store';
import Loader from '../components/Loader.vue';
import User from '../components/User.vue';
import Error from '../components/Error.vue';

const userStore = useUserStore();
const loaderOn: Ref<boolean> = ref(false);

onMounted(async () => {
    loaderOn.value = true;

    if(!userStore.usersList){
        await userStore.getUserStore();
    }
    
    loaderOn.value = false;
})

</script>

<template>
    <Loader v-if="loaderOn" class="full-screen"></Loader>
    <div v-else class="users">
        <Error v-if="userStore.error" class="full-screen flex-direction-column"
        title="Сервер не отвечает" 
        text="Уже работаем над этим"
        image="error.png"
        ></Error>

        <User v-else v-for="user in userStore.usersList" 
        :key="user.id" 
        :id="user.id"
        :name="user.name">
        </User>
    </div>
</template>

<style scoped lang="scss">
.users{
    padding-top: 16px;
}
</style>
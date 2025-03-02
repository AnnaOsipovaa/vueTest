import { ref } from 'vue'
import { defineStore } from 'pinia'
import { UserService } from '@/services/user-services';

export const useUserStore = defineStore('useUserStore', () => {
  const openUserId = ref(null);
  const usersList = ref(null);
  const error = ref(false);

  async function getUserStore() {
    let responseUsers = await UserService.getUsers();
    if(responseUsers.data && !responseUsers.error){
      usersList.value = responseUsers.data;
    }else{
      error.value = true;
    }
  }

  return { 
    openUserId, 
    usersList, 
    error, 
    getUserStore 
  }
})

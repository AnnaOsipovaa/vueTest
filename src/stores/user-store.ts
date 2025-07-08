import { ref, Ref } from 'vue';
import { defineStore } from 'pinia';
import { UserService } from '../services/user-services';
import { UserType } from '../types/user.type';
import { ResponseType } from '../types/response.type';

export const useUserStore = defineStore('useUserStore', () => {
  const openUserId: Ref<number | null> = ref(null);
  const usersList: Ref<UserType[]> = ref(null);
  const error: Ref<boolean> = ref(false);

  async function getUserStore(): Promise<void> {
    const responseUsers: ResponseType = await UserService.getUsers();
    if (responseUsers.data && !responseUsers.error) {
      usersList.value = responseUsers.data;
    } else {
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

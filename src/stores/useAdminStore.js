import { defineStore } from "pinia";
import { ref } from "vue";

export const useAdminStore = defineStore("AdminStore", () => {
  const AdminData = ref({
    ID: "",
    Account: "",
    Identify: 0,
    Status: true,
  });
  return {
    AdminData,
  };
});

<template>
   <div
    class="relative py-4 flex items-center px-3 py-2 border-b border-gray-100  hover:bg-blue-100 text-sm w-full"
    :class="{ 'bg-primary-light': isActive, 'cursor-pointer': prescript.status == 3 }"
  >
    <div class="flex-shrink-0">
      
      <img
        v-if="prescript.customer.icon_type == 0"
        class="w-10"
        src="@/assets/img/doctor/icon_man.png" alt=""
      >
      <img
        v-if="prescript.customer.icon_type == 1"
        class="w-10"
        src="@/assets/img/doctor/icon_woman.png" alt=""
      >
      <img
        v-if="prescript.customer.icon_type == 2"
        class="w-10"
        src="@/assets/img/doctor/icon_dog.png" alt=""
      >
      <img
        v-if="prescript.customer.icon_type == 3"
        class="w-10"
        src="@/assets/img/doctor/icon_cat.png" alt=""
      >
      <img
        v-if="prescript.customer.icon_type == 4"
        class="w-10"
        src="@/assets/img/doctor/icon_robot.png" alt=""
      >
      
      
    </div>
    <div
      class="ml-3 flex flex-col flex-grow text-left"
    >
      <div class="flex items-center justify-between">
        <div class="font-medium text-sm ">
          {{ prescript.customer.first_name }} {{ prescript.customer.last_name }}
        </div>
        
        
      </div>
      <div>
        ID: {{ prescript.customer.id }}
      </div>
      
    </div>
    <prescript-card-status
      :status="prescript.status"
    ></prescript-card-status>
    <div v-if="prescript.unread_flag" class="absolute left-1 top-2 flex h-3 w-3">
      <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
      <span class="relative inline-flex rounded-full h-3 w-3 bg-purple-500"></span>
    </div>
    <!-- <div class="ml-2">
      <svg
        class="w-6"
        xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
        <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
      </svg>
    </div> -->
  </div>
</template>
<script lang="ts">
import { IPrescript } from "@/types/Interfaces";
import { defineComponent, ref, SetupContext } from "vue";
import PrescriptCardStatus from './PrescriptCardStatus.vue';

export default defineComponent({
  components: {
    PrescriptCardStatus
  },
  props: {
    prescript: Object as () => IPrescript,
    isActive: Boolean
  },
  setup(props: any, context: SetupContext){
    

    return {
    }
  }
})
</script>
<template>
  <router-view></router-view>
</template>
<script lang="ts">
import { defineComponent, onMounted } from 'vue';
import { useRoute } from 'vue-router';

import useDoctors from '@/types/Doctor';

export default defineComponent({
  components: {
  },
  setup() {
    const route = useRoute();
    const {id} = route.params;
    const dId = Array.isArray(id) ? parseInt(id[0]) : parseInt(id);
    
    const {
      doctors,
      fetchDoctors
    } = useDoctors();
    console.log(dId)
    console.log(doctors.value)
    const doctor = doctors.value.find(d => d.id === dId);
    return {
      doctor
    };
  }
})
</script>
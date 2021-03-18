<template>
  <router-view
    v-if="doctor != null"
    :doctor="doctor"
  ></router-view>
</template>
<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';

import useDoctors from '@/types/Doctor';
import { IPrescript } from '@/types/Interfaces';

export default defineComponent({
  components: {
  },
  props: {
    myPrescript: {
      type: Object as () => IPrescript
    }
  },
  setup() {

    const route = useRoute();
    const {id} = route.params;
    const dId = Array.isArray(id) ? parseInt(id[0]) : parseInt(id);
    
    const {
      doctor,
      getDoctor,
    } = useDoctors();
    
    const dataReady = ref(false);
    
    onMounted(async () => {
      try {
        doctor.value = await getDoctor(dId);
        dataReady.value = true
      } catch (err) {
        const response = err.response;
        if (response) {
          const {data, status} = response;
          alert(JSON.stringify(data))
        }
        console.error(err)
      }
    })
    return {
      doctor,
      dataReady
    }
  }
})
</script>
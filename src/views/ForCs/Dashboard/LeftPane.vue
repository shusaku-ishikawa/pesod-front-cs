<template>
  <div
    class="flex flex-col min-h-full w-full px-2 py-3 text-sm"
  >
    <div class="relative mb-3 w-full ">
      <input
        placeholder="名前でフィルター"
        v-model="searchWord"
        class=" px-4 focus:outline-none focus:ring w-full py-2 border block flex-grow "
        type="text">
      <button
        @click="searchWord = ''"
        class="absolute right-0 bg-gransparent top-1 rounded-full"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
        </svg>
      </button>
      
    </div>
    <div class="grid grid-cols-2 py-1 mb-2">
      <div class="flex items-center justify-center">
        <input id="userSearch" type="radio" name="search" value="user" v-model="searchWordType">
        <label class="ml-1" for="userSearch">ユーザーを検索</label>
      </div>
      <div class="flex items-center justify-center">
        <input id="staffSearch" type="radio" name="search" value="cs" v-model="searchWordType">
        <label class="ml-1" for="staffSearch">担当者を検索</label>
      </div>
    </div>
    <div class="mb-4">
      <div class="cursor-pointer flex px-5 py-1 border-b " @click="showOptions = !showOptions">
        <div class="flex-grow text-left ">表示項目</div>
        <svg v-if="!showOptions" @click.stop="showOptions = true" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
        </svg>
        <svg v-else @click.stop="showOptions = false" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7" />
        </svg>
      </div>
      <div v-if="showOptions" class="px-2 ">
        <div class="text-sm py-2 flex items-center" v-for="(o, i) in displayOptions" :key="i">
          <PCheckbox
            :modelValue="o.checked"
            @update:modelValue="checkOption(o.value, $event)"
            :label="o.text"
            class="cursor-pointer"
          />
          
        </div>
      </div>
    </div>
   
   
    <div class="flex-grow w-full relative overflow-y-auto">
      <div v-if="loadingTasks">
        <div
          v-for="i in 3"
          :key="i"
          class="mb-3 rounded-tr rouned-br rounded-bl p-2 w-full mx-auto">
          <div class="items-center animate-pulse flex space-x-4">
              <div >
                <div class="w-8 h-8 rounded-full bg-blue-100"></div>
              </div>
              <div class="flex-1 space-y-4 py-1">
                
                <div class="space-y-2">
                  <div class="h-4 bg-blue-100 rounded"></div>
                  <div class="h-4 bg-blue-100 rounded"></div>
                </div>

            </div>
          </div>
        </div>
      </div>
      <div v-else class="absolute w-full">
        <div class="text-sm" v-if="tasksToDisplay.length == 0">
          表示する相談がありません。
        </div>
        <TaskCard
          v-for="(t, i) in tasksToDisplay"
          :key="i"
          :task="t"
          :isActive="activeTask && activeTask.id == t.id"
          @click="onSelectTask(t)"
          :class="{ 'border-t': i == 0 }"
        />
          
        
      </div>
   </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, SetupContext, ref, onMounted, computed } from "vue";
import useTasks from '@/types/Task';
import { ITask } from '@/types/Interfaces';
import TaskCard from './LeftPane/TaskCard.vue';
import useAuth from "@/types/Auth";

export default defineComponent({
  components: {
    TaskCard,
  },
  props: {
    loadingTasks: Boolean,
    tasks: {
      type: Object as () => ITask[]
    },
    activeTask: {
      type: Object as () => ITask
    },
  },
  emits: [
    'update:activeTask',
    'update:searchWord'
  ],
  setup(props: any, context: SetupContext) {
    const {
      profile  
    } = useAuth()

    const searchWord = ref('');
    const searchWordType = ref('user');
    const showOptions = ref(false);
    const displays = ref<Array<string>>([])
    
    const displayOptions = ref([
      {
        value: 'mine',
        text: '自分の担当を表示',
        checked: true
      },
      {
        value: 'notAssigned',
        text: '未対応を表示',
        checked: true
      },
      {
        value: 'assigned',
        text: '対応中を表示',
        checked: true
      },
      {
        value: 'closed',
        text: '解決済を表示',
        checked: false
      },
    ])
   
    const checkOption = (val: string, checked: boolean) => {
      const index = displayOptions.value.findIndex((d: any) => d.value == val);
      if (index >= 0) {
        displayOptions.value.splice(index, 1, {
          ...displayOptions.value[index],
          checked: checked
        })
      }
    }
     
    const tasksToDisplay = computed(() => {
      const checkedValues = displayOptions.value.filter((d: any) => d.checked).map((d: any) => d.value)
      const search = searchWord.value;
      const searchType = searchWordType.value;
      return props.tasks.filter((t: ITask) => {
        
        let showThisTask = false;
        checkedValues.map((d: string) => {
          if (d == 'mine' && t.assignee && profile.value && t.assignee.id == profile.value.id) showThisTask = true;
          if (d == 'notAssigned' && t.assignee == null && t.status == 1) showThisTask = true;
          if (d == 'assigned' && t.status == 1 && t.assignee != null) showThisTask = true;
          if (d == 'closed' && t.status == 0) showThisTask = true;
        })
        if (search != '') {
          if (searchType == 'user') {
            // alert(t.consulter?.first_name.includes(searchWord.value))
            if (t.consulter && !t.consulter.first_name.includes(searchWord.value) && !t.consulter.last_name.includes(searchWord.value)) showThisTask = false;
          } else {
            if (t.assignee && !t.assignee.full_name?.includes(searchWord.value)) showThisTask = false;
          }
        }
        return showThisTask
      })
    })

    
    const onSelectTask = (t: ITask) => {
      
      context.emit('update:activeTask', t);
    };
    
    

    return {
      searchWord,
      searchWordType,
      onSelectTask,
      showOptions,
      displayOptions,
      tasksToDisplay,
      checkOption,
    };
  }
})
</script>

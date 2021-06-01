<template>
  <div class="p-2 rounded border">
    <div class="flex items-center border-b">
      <table class="flex-grow">
        <tbody>
          <tr>
            <th>更新日</th>
            <td class="text-left pl-2">{{ memo.created_at }}</td>
          </tr>
          <tr>
            <th>入力者</th>
            <td class="text-left pl-2">{{ memo.writer.full_name }}</td>
          </tr>

        </tbody>
      </table>
      <div>
        <button @click="modify = !modify" class="image">
          <img class="h-6" src="@/assets/img/doctor_hensyu.png" alt="">
        </button>
      </div>
      <div class="ml-1">
        <button @click="onDelete" class="image">
          <img class="h-6" src="@/assets/img/doctor_delete.png" alt="">
        </button>

      </div>
      
    </div>
    <div class="py-2">
    <textarea
      v-if="modify"
      style="resize: none"
      v-model="memoLocal.memo"
      class="text-sm mb-2 rounded border shadow w-3/4 mx-auto inline-block focus:outline-none p-2" placeholder="メモを入力" name="" id="" cols="30" rows="5"></textarea>
    <div
      v-else
      class="mb-2 text-sm text-left w-3/4 mx-auto inline-block focus:outline-none p-2"
      v-html="htmlify(memo.memo)"
    >
  
    </div>
    </div>
    <div v-if="modify" class="flex justify-center">
      <button @click="modify = !modify" class="image">
        <img class="h-6" src="@/assets/img/doctor_cancel.png" alt="">
      </button>
      <button @click="onUpdate" class="image ml-1">
        <img  class="h-6" src="@/assets/img/doctor_touroku.png" alt="">
      </button>
      
    </div>
  </div>
</template>
<script lang="ts">
import useCustomer from "@/types/Customer";
import { watch, ref, defineComponent, SetupContext, onMounted, onUpdated } from "@vue/runtime-core";
import { clone, cloneDeep } from "lodash";

export default defineComponent({
  props: {
    memo: Object
  },
  emits: [
    'delete:memo',
    'update:memo'
  ],
  setup(props: any, context: SetupContext) {
    const memoLocal = ref<any>(null)// 
    const modify = ref(false);
    const {
      updateCustomerMemo,
      deleteCustomerMemo
    } = useCustomer()

    onMounted(() => {
      modify.value = false;
      memoLocal.value = cloneDeep(props.memo)
      console.log('mounted')
    })
    watch(() => props.memo, () => {
      modify.value = false;
      memoLocal.value = cloneDeep(props.memo)
    })
    const onUpdate = async () => {
      const payload: any = {
        id: props.memo.id,
        memo: memoLocal.value.memo
      }
      console.log(memoLocal.value)
      const ret = await updateCustomerMemo(props.memo.id, payload)
      console.log(ret)
      context.emit('update:memo', ret)
      modify.value = false
    }
    const onDelete = async () => {
      const ret = await deleteCustomerMemo(props.memo.id);
      context.emit('delete:memo')
    }
    const htmlify = (s: string) => {
      return s.replaceAll('\n', '<br />')
    }
    return {
      htmlify,
      modify,
      memoLocal,
      onUpdate,
      onDelete
    }
  }
})
</script>

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
        <button class="image">
          <img class="h-6" src="@/assets/img/doctor_hensyu.png" alt="">
        </button>
      </div>
      <div>
        <button class="image">
          <img class="h-6" src="@/assets/img/doctor_delete.png" alt="">
        </button>

      </div>
      
    </div>
    <div class="py-2">
    <textarea :value="memo.memo" style="resize: none" class="mb-2 rounded border shadow w-3/4 mx-auto inline-block focus:outline-none p-2" placeholder="メモを入力" name="" id="" cols="30" rows="5"></textarea>
        
    </div>
    <div class="flex justify-center">
      <button class="image">
        <img class="h-6" src="@/assets/img/doctor_cancel.png" alt="">
      </button>
      <button class="image">
        <img  class="h-6" src="@/assets/img/doctor_touroku.png" alt="">
      </button>
      
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, SetupContext } from "@vue/runtime-core";

export default defineComponent({
  props: {
    memo: Object
  },
  setup(props: any, content: SetupContext) {
    return {
      
    }
  }
})
</script>

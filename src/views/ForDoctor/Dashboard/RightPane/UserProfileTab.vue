<template>
  <div class="w-full sm:py-5 text-xs">
    <div class="text-left mb-5">
      <tab-header>
        顧客情報詳細
      </tab-header>
      
      <div class="border p-2 px-4 rounded-tr rounded-br rounded-bl">
        <table class="border-collapsed w-full ">
          <tbody class="border-b ">
            <tr>
              <th class="pb-1">顧客ID:</th>
              <td class="px-4 pb-1">{{ prescript.customer.id }}</td>
            </tr>
          </tbody>
          <tbody class="border-b">
            <tr>
              <th class="pt-1">お名前:</th>
              <td class="pt-1 text-left px-4">{{ `${prescript.customer.first_name} ${prescript.customer.last_name}` }}</td>
            </tr>
            <tr>
              <th>性別:</th>
              <td class="text-left px-4">
                {{ prescript.customer.gender != null ? genders[prescript.customer.gender] : 'ー' }}
              </td>
            </tr>
            <tr>
              <th class="pb-1">生年月日:</th>
              <td class="text-left px-4 pb-1">{{ prescript.customer.birthday }}</td>
            </tr>
            
          </tbody>
          <tbody class="">
            <tr>
              <th class="pt-1">住所:</th>
              <td class="px-4 pt-1 pb-1">
                <div>
                  {{ prescript.customer.zip_code }}
                </div>
                <div>
                  {{ prescript.customer.prefecture }}{{ prescript.customer.city }}{{ prescript.customer.address }}
                </div>
              </td>
            </tr>
            <tr>
              <th>Email:</th>
              <td class="px-4">{{ prescript.customer.email }}</td>
            </tr>
            <tr>
              <th>電話番号:</th>
              <td class="px-4">{{ prescript.customer.phone_number }}</td>
            </tr>
            
          </tbody>

        </table>
      </div>
    </div>
     <div class="text-left mb-5">
      <tab-header>
        顧客メモ
      </tab-header>
      
      <div class="border p-2 px-4 rounded-tr rounded-br rounded-bl text-center">
        <textarea v-model="currentMemo" style="resize: none" class="block mb-2 rounded border shadow w-3/4 mx-auto inline-block focus:outline-none p-2" placeholder="メモを入力" name="" id="" cols="30" rows="5"></textarea>
        <button @click="onAddMemo" class="block mx-auto image">
          <img class="h-6" src="@/assets/img/doctor_touroku.png" alt="">
        </button>
      </div>
    </div>
    <user-profile-tab-memo
      v-for="(m, i) in memos"
      :key="i"
      :memo="m"
      class="mb-2"
      @update:memo="onUpdateMemo(i, $event)"
      @delete:memo="onDeleteMemo(i)"
    ></user-profile-tab-memo>
    

  </div>
</template>
<style lang="scss" scoped>
  table {
    tr {
      th {
        white-space: nowrap;
        font-weight: 500;
        text-align-last: justify;
        text-justify: inter-ideograph;
      }
      td {
        font-weight: 500;
      }
    }
  }
  .title-tag::before {
    content: "";
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: -1;
    background: #01579B;
    transform: scaleY(1.3) perspective(.6em) rotateX(5deg);
    transform-origin: bottom left;
    border-radius: 8px 8px 0 0;
  }
</style>
<script lang="ts">
import { defineComponent, ref, onMounted, SetupContext, watch } from "vue";

import { IAnswer, IAnswerOption, IOrder, IPrescript } from "@/types/Interfaces";

import useCustomer from "@/types/Customer";
import useAuth from '@/types/Auth'
import UserProfileTabMemo from './UserProfileTabMemo.vue'
import TabHeader from '@/components/TabHeader.vue'

export default defineComponent({
  components: {
    // OrderModal,
    // SubscriptionModal,
    // PrescriptHistoryModal
    TabHeader,
    UserProfileTabMemo
  },
  props: {
    prescript: {
      type: Object as () => IPrescript
    },
 
  },
  setup(props: any, context: SetupContext) {
    const subscStatus = {
      0: '継続中',
      1: '休止中',
      2: '解約'
    }
    const genders = {
      0: '男性',
      1: '女性',
      2: 'その他'
    }
    const {
      fetchCustomerMemo,
      addCustomerMemo
    } = useCustomer();
    const {
      profile
    } = useAuth()
    // const modalOrder = ref<IOrder | null>(null);
    // const modalSubscription = ref<ISubscription | null>(null)
    // const modalPrescript = ref<IPrescript | null>(null);
    const memos = ref<any>([]);
    
    onMounted(async () => {
      memos.value = await fetchCustomerMemo(props.prescript.customer.uuid)
    })
    const currentMemo = ref('');
    
    watch(() => props.prescript, async () => {
      currentMemo.value = '';
      memos.value = await fetchCustomerMemo(props.prescript.customer.uuid)
    })
    const onAddMemo = async () => {
      if (currentMemo.value == '') return;
      const payload: any = {
        customer_id: props.prescript.customer.id,
        writer_id: profile.value?.id,
        memo: currentMemo.value
      }
      const d = await addCustomerMemo(payload);
      currentMemo.value = ''
      memos.value = await fetchCustomerMemo(props.prescript.customer.uuid)
    }
    const onUpdateMemo = (i: number, obj: any) => {
      memos.value.splice(i, 1, obj);
    }
    const onDeleteMemo = (i: number) => {
      memos.value.splice(i, 1);
    }
    return {
      currentMemo,
      memos,
      subscStatus,
      onAddMemo,
      onUpdateMemo,
      onDeleteMemo,
      // modalOrder,
      // modalSubscription,
      // modalPrescript,
      genders
    };
  }
})
</script>

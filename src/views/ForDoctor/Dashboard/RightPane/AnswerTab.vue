<template>
  <div class="w-full sm:py-5 text-xs">
    <!-- <div
      class="sm:hidden py-1 bg-gray-200 mb-5">
      <div class="absolute left-0 flex  items-center">
        <svg
          @click="onPage('main')"
          class="w-6 cursor-pointer"
          xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd" />
        </svg>
        <div>診察室</div>
      </div>
      <div>
        問診表
      </div>
    </div> -->
    <div class="px-1">
      <div class="mb-5">
        <div class="text-left  font-semibold">顧客基本情報</div>
        <table class="w-full border-collapsed border ">
          <tbody>
            <tr class="border">
              <th class=" bg-primary-light">お名前</th>
              <td class="">{{ prescript.customer.first_name }}{{ prescript.customer.last_name }}</td>
            </tr>
            <tr class="border">
              <th class=" bg-primary-light">性別</th>
            <td class="">{{ prescript.customer.gender != null ? genders[prescript.customer.gender] : 'ー' }}</td>
            </tr>
            <tr class="border">
              <th class=" bg-primary-light">生年月日</th>
              <td class="">{{ prescript.customer.birthday }}</td>
            </tr>
            
            
          </tbody>
        </table>
      </div>
      <div class="mb-5">
        <div class="text-left  font-semibold">過去のPesod利用状況</div>
        <table class="w-full border-collapsed border ">
          <tbody>
            <tr class="border">
              <th class="bg-primary-light">診療回数</th>
              <td>{{ prescript.customer.prescription_times }}回</td>
            </tr>
            <tr class="border">
              <th class=" bg-primary-light">定期購入</th>
              <td>{{ prescript.customer.has_subscribing ? 'あり' : 'なし' }}</td>
            </tr>
           
            <tr class="border">
              <th class=" bg-primary-light">注文回数</th>
              <td>{{ prescript.customer.order_times }}回</td>
            </tr>
            
            
            
          </tbody>
        </table>
      </div>
      <div
        v-if="loadingAnswers"
      >
        <div
          v-for="i in 3"
          :key="i"
          class="mb-3 rounded-tr rouned-br rounded-bl p-2 w-full mx-auto">
          <div class="animate-pulse flex space-x-4">
              <div class="flex-1 space-y-4 py-1">
                <div class="space-y-2">
                  <div class="h-4 bg-blue-100 rounded"></div>
                  <div class="h-4 bg-blue-100 rounded"></div>
                  <div class="h-4 bg-blue-100 rounded"></div>
                  
                </div>

            </div>
          </div>
        </div>
      </div>
      <div v-else>
        <div
          v-for="(a, i) in answers"
          :key="i"
          class="mb-5"
        >
          <question
            :index="i + 1"
            :question="a.question.question_body"  
          />
          <div class="w-full ">
            
            <div
              v-if="a.answer_options.length"
            >
              <ul>
                <li
                  v-for="(o, i) in a.answer_options"
                  :key="i"
                  :style="`background-color: ${getOptionColor(a.question.qa_options.find(q => q.id == o.option))}`"
                  class=" py-2 font-semibold px-2 rounded w-full mb-1 text-center"
                >
                
                  {{ a.question.qa_options.find(q => q.id == o.option).option }}
                </li>
              </ul>
            </div>
            <div
              class="bg-gray-200 py-1 px-2 text-left rounded text-white"
              v-if="a.descriptive_answer"
            >
              {{ a.descriptive_answer }}
            </div>
            <div
              v-if="a.hair_record"
            >
              <img
                class="max-w-full p-3"
                :src="a.hair_record.image"
                alt=""
              >
            </div>

          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
  table th {
    text-align-last: justify;
    text-justify: inter-ideograph;
    padding: 3px 10px;
    font-weight: 400;
  }
  table td {
    text-align: left;
    padding: 0px 10px;

  }
</style>
<script lang="ts">
import { defineComponent, ref, onMounted, onUpdated, SetupContext, watch } from "vue";
import ClientProfile from '../ClientProfile.vue';
import Question from './AnswerTabQuestion.vue';
import useCustomer from '@/types/Customer'

import { IAnswer, IAnswerOption, IPrescript } from "@/types/Interfaces";
import { onBeforeRouteUpdate } from "vue-router";

export default defineComponent({
  components: {
    Question
  },
  props: {
    prescript: {
      type: Object as () => IPrescript
    },
    answers: {
      type: Object as () => IAnswer[]
    },
    loadingAnswers: {
      type: Boolean
    }
  },
  setup(props: any, context: SetupContext) {
    const customerData = ref(null);
    // const {
    //   // getCustomer  
    // } = useCustomer();

    
    
    
    // onUpdated(async () => {
    //   setAnswers();  
    // });
    const getOptionColor = (option: any) => {
      if (option == null) return 'gray';
      if (option.risk == 0) {
        return '#C4E2FF';
      } else if (option.risk == 1) {
        return '#F6E88F';
      } else if (option.risk == 2) {
        return '#FFB9BA'; 
      }
      return 'gray'
    }
    
    

    const genders = {
      0: '男性',
      1: '女性',
      2: 'その他'
    }
  
    return {
      getOptionColor,
      genders,
    };
  }
})
</script>

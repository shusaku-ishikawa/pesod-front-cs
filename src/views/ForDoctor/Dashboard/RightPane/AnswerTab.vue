<template>
  <div class="w-full sm:py-5">
    <!-- <div
      class="sm:hidden py-1 bg-gray-200 mb-5">
      <div class="absolute left-0 flex text-sm items-center">
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
        <div class="text-left">顧客基本情報</div>
        <table class="w-full border-collapsed border">
          <tbody>
            <tr class="border">
              <th class=" bg-primary-light">お名前</th>
              <td>{{ prescript.customer.first_name }}{{ prescript.customer.last_name }}</td>
            </tr>
            <tr class="border">
              <th class=" bg-primary-light">性別</th>
              <td>{{ prescript.customer.gender }}</td>
            </tr>
            <tr class="border">
              <th class=" bg-primary-light">生年月日</th>
              <td>{{ prescript.customer.birthday }}</td>
            </tr>
            
            
          </tbody>
        </table>
      </div>
      <div>
        <div class="text-left">過去のPesod利用状況</div>
        <table class="w-full border-collapsed border">
          <tbody>
            <tr class="border">
              <th class="bg-primary-light">診療回数</th>
              <td>{{ prescript.customer.first_name }}{{ prescript.customer.last_name }}</td>
            </tr>
            <tr class="border">
              <th class=" bg-primary-light">定期購入</th>
              <td>{{ prescript.customer.gender }}</td>
            </tr>
            <tr class="border">
              <th class=" bg-primary-light">定期注文回数</th>
              <td>{{ prescript.customer.birthday }}</td>
            </tr>
            <tr class="border">
              <th class=" bg-primary-light">定期ステータス</th>
              <td>{{ prescript.customer.birthday }}</td>
            </tr>
            
            
            
          </tbody>
        </table>
      </div>
      
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
            class="bg-gray-400 pb-1 text-sm"
            v-if="a.descriptive_answer"
          >
            {{ a.descriptive_answer }}
          </div>
          <div
            v-if="a.answer_options.length"
          >
            <ul>
              <li
                v-for="(o, i) in a.answer_options"
                :key="i"
              >
                {{ o.answer }}
              </li>
            </ul>
          </div>
          <div
            v-if="a.hair_record"
          >
            <img
              class="max-w-full"
              :src="a.hair_record"
              alt=""
            >
          </div>

        </div>
      </div>
     
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, onMounted, onUpdated, SetupContext, watch } from "vue";
import ClientProfile from '../ClientProfile.vue';
import Question from '@/views/ForClient/Diagnostic/Questionaires/Question.vue';

import useQuestionaire from '@/types/Questionaire';
import useAnswer from '@/types/Answer';
import { IAnswer, IAnswerOption, IPrescript } from "@/types/Interfaces";
import { onBeforeRouteUpdate } from "vue-router";

export default defineComponent({
  components: {
    Question
  },
  props: {
    prescript: {
      type: Object as () => IPrescript
    }
  },
  setup(props: any, context: SetupContext) {

    const {
      answers,
      fetchAnswers
    } = useAnswer('doctor');

    const setAnswers = async () => {
      const data = await fetchAnswers(props.prescript.customer.uuid);
      console.log(data)
      answers.value = data;
      // fetchLogs();
    }
    // onUpdated(async () => {
    //   setAnswers();  
    // });
    
    watch(props.prescript, (val) => {
      setAnswers();
    })
    onMounted(async () => {
      if (props.prescript == null ) return;
      setAnswers();
    });

  
    return {
      answers,
    };
  }
})
</script>

<template>
  <div
    class="px-6 pt-5 flex-grow flex flex-col"
  >
    <div class="relative w-full flex-grow overflow-y-auto mb-5" style="min-height: 200px">
        <question
          class="absolute w-full"
          :index="questionIndex + 1"
          :question="question.question_body"
        />
    </div>
    <div class="flex flex-col">
      <div
        v-if="question.question_types.includes('記述式') && currentAnswer"
        class="pb-10"
      >
        <p-input
          v-model="currentAnswer.descriptive_answer"
          type="text"
          label="回答"
        ></p-input>
      </div>
      <div
        v-if="question.question_types.includes('アップロード')"
        class="mb-10 border-2 rounded "
      >
        <image-selector
          v-model="uploadingImage"
        ></image-selector>
      </div>
      <div
        v-if="question.question_types.includes('選択式')"
      >
        <div
          v-for="(o, i) in question.qa_options"
          :key="i"
          class="text-center mb-3"
        >
          <button
            @click="onSelectAnswer(i)"
            class="w-full "
            :class="{ 'hilight ': isOptionSelected(o.id), 'secondary': !isOptionSelected(o.id) }"
          >
            {{ o.option }}
          </button>
        </div>
      </div>
      <div class="grid grid-cols-2 gap-1 mb-3">
        <div class="col-span-1">
          <button
            @click="onClickPrevious()"
            class="secondary w-full"
            v-if="hasPrevious"
          >
            <div class="inline-block">前に戻る</div>
            <svg 
              class="w-6 h-6 float-left"
              xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd" />
            </svg>
          </button>
        </div>
        <div class="col-span-1">
          <button
            @click="onClickNext()"
           
            :disabled="!hasAnswers"
            class="secondary w-full relative"
          >
            <div class="inline-block">
              {{ hasNext ? '次に進む' : '確定する' }}
            </div>
            <svg
              class="w-6 h-6 float-right"
              xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
            </svg>
          </button>
         
          
        </div>
      </div>
      <div v-if="answeredAll">
        you have completed the ques
      </div>
    </div>
   
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, SetupContext, onMounted, Ref, ComputedRef } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { IAnswer, IAnswerOption, IHairRecord, IQuestion, IPrescript } from '@/types/Interfaces';
import ImageSelector from '@/components/ImageSelector.vue';
import useQuestionaire from '@/types/Questionaire';
import useAnswer from '@/types/Answer';
import usePrescript from '@/types/Prescript';
import useHairRecord from '@/types/HairRecord';

import Question from './Question.vue';

import moment from 'moment';

export default defineComponent({
  components: {
    Question,
    ImageSelector
  },
  props: {
    questions: {
      type: Object as () => IQuestion[]
    },
    myPrescript: {
      type: Object as () => IPrescript,
    }
  },
  setup(props: any, ctx: SetupContext) {
    const route = useRoute();
    const router = useRouter();

    const qId: string = route.params.id.toString();
    
    const {
      fixInterview
    } = usePrescript();
    
    
    const {
      answers,
      fetchAnswers,
      createAnswer
    } = useAnswer();

    const {
      addHairRecord
    } = useHairRecord();
    
    const question = props.questions.find((q: IQuestion) => q.id === qId);
    const questionIndex = props.questions.findIndex((q: IQuestion) => q.id === qId);
    
    const uploadingImage = ref<string | null>(null);
    const currentAnswer = ref<IAnswer | null>(null);
    

    const isOptionSelected = (optionId: string) => {
      if (currentAnswer.value == null) return;
      return currentAnswer.value.answer_options.find((o: IAnswerOption) => o.option === optionId) != null;
    };

    const onSelectAnswer = (oIndex: number) => {
      if (question == null || props.myPrescript == null) return;
      if (currentAnswer.value == null) return;

      const selectedOption = question.qa_options[oIndex];
      
      // if already selected -> remove option
      const currentAnswerOptionIds = currentAnswer.value.answer_options.map(o => o.option);
      const removingIndex = currentAnswerOptionIds.findIndex(id => id === selectedOption.id);
      
      if (removingIndex >= 0) {
        currentAnswer.value.answer_options.splice(removingIndex, 1);
        return;
      }
      
      const newAnswerOption: IAnswerOption = {
        answer: currentAnswer.value.id || '',
        option: selectedOption.id,
      };
      if (question.question_types === '複数選択式') {
        currentAnswer.value.answer_options.push(newAnswerOption);
      } else {
        currentAnswer.value.answer_options = [newAnswerOption];
      }
    };

    const hasPrevious = computed(() => {
      console.log(questionIndex)
      return questionIndex > 0;  
    });

    const hasNext = computed(() => {
      return questionIndex < props.questions.length -1
    });

    const hasAnswers = computed(() => {
      if (question == null) return false;
      if (currentAnswer.value == null) return false;
      if (question.question_types.includes('アップロード')) {
        return uploadingImage.value != null;
      } else if (question.question_types.includes('選択式')) {
        
        if (question.question_types.includes('記述式')) {
          return currentAnswer.value.descriptive_answer != null && currentAnswer.value.descriptive_answer != null;
        } else {
          return currentAnswer.value.answer_options.length > 0;
        }
      } else if (question.question_types.includes('記述式')) {
        return currentAnswer.value.descriptive_answer != '' && currentAnswer.value.descriptive_answer != null;
      }
    });

    const onClickPrevious = () => {
      if (question == null) return;
      const currentIndex = props.questions.findIndex((q: IQuestion) => q.id === question.id);
      if (currentIndex > 0) {
        router.push({ params: { id: props.questions[currentIndex - 1].id } })
      }
    };
    const onClickNext = async () => {
      if (question == null || currentAnswer.value == null) return;
      if (question.question_types.includes('アップロード')) {
        // create hair record
        if (uploadingImage.value == null) return;
        currentAnswer.value.hair_image = uploadingImage.value;
        
      }
      try {
        console.log(currentAnswer.value)
        const data = await createAnswer(currentAnswer.value);
        
        const currentIndex = props.questions.findIndex((q: IQuestion) => q.id === question.id);
        if (currentIndex < props.questions.length - 1) {
          router.push({ params: { id: props.questions[currentIndex + 1].id } })
        } else {
          // done
          try {
            await fixInterview();
            router.push({ name: 'DiagnosticQuestionaireDone' });
          } catch (err) {
            console.error(err);
          }
        }
      } catch (err) {
        if (err.response) {
          const { status, data } = err.response;
          console.error(data) 
        }
        return;
      }
      
    };
    // const blobToFile = (theBlob: Blob, fileName: string): File => {       
    //   return new File([theBlob], fileName, { lastModified: new Date().getTime(), type: theBlob.type })
    // }
  
    const imageReader: FileReader = new FileReader();
    
    const fetchFileFromUrl = (url: string) => {
      const request = new XMLHttpRequest();
      request.open('GET', url, true);
      request.responseType = 'blob';
      request.onload = function() {
        imageReader.onload = function() {
          const data = imageReader.result;
          if (typeof data === 'string') {
            uploadingImage.value = data;    
          }
        }
        imageReader.readAsDataURL(request.response); 
 
        // const imageFile: File = blobToFile(request.response, 'downloaded.png');
        // uploadingImage.value = imageFile;
        // console.log(imageFile.name)
        
      };
      request.send();
    }
    
    onMounted(async () => {
      if (question == null || props.myPrescript == null) return;
      
      // get current answer
      let existingAnswer: IAnswer | undefined;
      try {
        const data: IAnswer[] = await fetchAnswers();
        answers.value = data;
        existingAnswer = data.find((a: IAnswer) => a.question.id === question.id);
        console.log(data);
        console.log(existingAnswer)
      } catch (err) {
        console.error(err)
        
        throw err;
      }
      
      if (existingAnswer != null) {
        currentAnswer.value = existingAnswer;
        if (currentAnswer.value.hair_record != null && typeof currentAnswer.value.hair_record == 'string') {
          fetchFileFromUrl(currentAnswer.value.hair_record);
        }
      } else {
        currentAnswer.value = {
          customer: props.myPrescript.customer,
          question: question,
          prescript: props.myPrescript,
          descriptive_answer: '',
          answer_options: [],
          hair_record: null,
        };
      }
      
    });
    const answeredAll = computed(() => {
      return answers.value.length === props.questions.length;
    })
    return {
      question,
      questionIndex,
      currentAnswer,
      answeredAll,
      uploadingImage,
      isOptionSelected,
      onSelectAnswer,
      hasAnswers,
      hasPrevious,
      hasNext,
      onClickPrevious,
      onClickNext,
    };
  }
})
</script>
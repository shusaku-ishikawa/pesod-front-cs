<template>
  <div
    class="px-6 pt-5 flex-grow flex flex-col"
  >
    <div class=" w-ful " style="min-height: 150px; margin-bottom: 50px">
      <question
        class=" w-full"
        :index="questionIndex + 1"
        :question="currentQuestion.question_body"
      />
    </div>
    <div class="flex flex-col">
      <div class="text-blue-400 text-left mb-3 text-sm">
        ＊{{ currentQuestion.question_types }}
      </div>
      <div
        v-if="currentQuestion.question_types.includes('アップロード')"
        class="mb-10 "
      >
      
        <image-selector
          :photoType="currentQuestion.question_types.includes('前頭部') ? 'A' : 'B'" 
          v-model="uploadingImage"
        ></image-selector>
      </div>
      <div
        v-if="currentQuestion.question_types.includes('選択式')"
      >
      
        <div
          v-for="(o, i) in currentQuestion.qa_options"
          :key="i"
          @click="onSelectAnswer(i)"
          class="flex items-center text-left border rounded shadow-xl text-sm cursor-pointer p-2 leading-5"
          style="margin-bottom: 6px"
          :class="{ 'hilight ': isOptionSelected(o.id), 'h-10': currentQuestion.question_layout == 1, 'h-16': currentQuestion.question_layout == 2 || currentQuestion.question_layout == 3, 'h-24': currentQuestion.question_layout == 4 }"
        > 
          <p-checkbox
            v-if="currentQuestion.question_layout >= 3"
            :modelValue="isOptionSelected(o.id)"
          ></p-checkbox>
          <div class="flex-shrink-0" v-if="o.image">
            <img :src="o.image" class="h-12" alt="">
          </div>
          <div
            :class="{ 'text-center flex-grow': currentQuestion.question_layout == 1 }"
            class="font-bold ml-2">{{ o.option }}</div>
        </div>
      </div>
      <div
        v-if="currentQuestion.question_types.includes('記述式') && currentAnswer"
        class="mb-10 mt-5"
      >
        <p-input
          v-model="currentAnswer.descriptive_answer"
          type="text"
          placeholder="「その他」の理由をご記入ください"
          label=""
        ></p-input>
      </div>
      <div class="grid grid-cols-2 gap-1 mt-3 mb-3">
        <div
          v-if="hasPrevious"
          :class="{ 'col-span-1': true }"
        >
          <button
            @click="onClickPrevious()"
            class="image"
            v-if="hasPrevious"
          >
           <img src="@/assets/img/monshin_back.png" alt="">
           
          </button>
        </div>
        <div 
          :class="{ 'col-span-1': hasPrevious, 'col-span-2': !hasPrevious }">
          <button
            @click="onClickNext()"
            :disabled="!hasAnswers"
            class="image"
          >
            <img v-if="hasAnswers && hasPrevious" src="@/assets/img/monshin_next_on_s.png" alt="">
            <img v-if="!hasAnswers && hasPrevious" src="@/assets/img/monshin_next_off_s.png" alt="">
            
            <img v-if="hasAnswers && !hasPrevious" src="@/assets/img/monshin_next_on.png" alt="">
            <img v-if="!hasAnswers && !hasPrevious" src="@/assets/img/monshin_next_off.png" alt="">
            
          </button>
         
          
        </div>
      </div>
      
    </div>
   
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, SetupContext, onMounted, Ref, ComputedRef, onUpdated, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { IAnswer, IAnswerOption, IHairRecord, IQuestion, IPrescript } from '@/types/Interfaces';
import ImageSelector from '@/components/ImageSelector.vue';

import Question from './Question.vue';
import {cloneDeep} from 'lodash'


export default defineComponent({
  components: {
    Question,
    ImageSelector
  },
  props: {
    hasNext: Boolean,
    hasPrevious: Boolean,
    currentQuestion: {
      type: Object as () => IQuestion,
    },
    existingAnswer: {
      type: Object as () => IAnswer,
    },
    questionIndex: {
      type: Number,
    },
    myPrescript: {
      type: Object as () => IPrescript,
    }
  },
  emits: [
    'next',
    'previous'
  ],
  setup(props: any, context: SetupContext) {
    const route = useRoute();
    const router = useRouter();

    const qId: string = route.params.id.toString();
    
    // const {
    //   fixInterview
    // } = usePrescript();
    
    
    // const {
    //   createAnswer
    // } = useAnswer();

    // const {
    //   addHairRecord
    // } = useHairRecord();
    
    // const question = props.questions.find((q: IQuestion) => q.id === qId);
    // const questionIndex = props.questions.findIndex((q: IQuestion) => q.id === qId);
    
    const uploadingImage = ref<string | null>(null);
    const currentAnswer = ref<IAnswer | null>(null);
    

    const isOptionSelected = (optionId: string) => {
      if (currentAnswer.value == null) return;
      return currentAnswer.value.answer_options.find((o: IAnswerOption) => o.option === optionId) != null;
    };

    const onSelectAnswer = (oIndex: number) => {
      if (props.currentQuestion == null || props.myPrescript == null) return;
      if (currentAnswer.value == null) return;

      const selectedOption = props.currentQuestion.qa_options[oIndex];
      
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
      // alert(question.question_types)
      if (props.currentQuestion.question_types.includes('複数選択式')) {
        currentAnswer.value.answer_options.push(newAnswerOption);
      } else {
        currentAnswer.value.answer_options = [newAnswerOption];
      }
    };


    const hasAnswers = computed(() => {
      if (props.currentQuestion == null) return false;
      if (currentAnswer.value == null) return false;
      if (props.currentQuestion.question_types.includes('アップロード')) {
        return uploadingImage.value != null;
      } else if (props.currentQuestion.question_types.includes('選択式')) {
        
        if (props.currentQuestion.question_types.includes('記述式')) {
          return currentAnswer.value.answer_options.length > 0;
        } else {
          return currentAnswer.value.answer_options.length > 0;
        }
      } else if (props.currentQuestion.question_types.includes('記述式')) {
        return currentAnswer.value.descriptive_answer != '' && currentAnswer.value.descriptive_answer != null;
      }
    });

    const onClickPrevious = () => {
      if (props.currentQuestion == null) return;
      // const currentIndex = props.questions.findIndex((q: IQuestion) => q.id === question.id);
      // if (currentIndex > 0) {
      //   router.push({ params: { id: props.questions[currentIndex - 1].id } })
      // }
      context.emit('previous', currentAnswer.value)
    };
    const onClickNext = async () => {
      if (props.currentQuestion == null || currentAnswer.value == null) return;
      if (props.currentQuestion.question_types.includes('アップロード')) {
        // create hair record
        if (uploadingImage.value == null) return;
        currentAnswer.value.hair_image = uploadingImage.value;
        
      }
      context.emit('next', currentAnswer.value)
      // const data = await createAnswer(currentAnswer.value);
      
      // const currentIndex = props.questions.findIndex((q: IQuestion) => q.id === question.id);
      // if (currentIndex < props.questions.length - 1) {
      //   router.push({ params: { id: props.questions[currentIndex + 1].id } })
      // } else {
      //   // done
      //   try {
      //     await fixInterview();
      //     router.push({ name: 'DiagnosticQuestionaireDone' });
      //   } catch (err) {
      //     console.error(err);
      //   }
      // }
      
      
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
    
    const localizeAnswer = () => {
      if (props.currentQuestion == null || props.myPrescript == null) return;
      
      // get current answer
      if (props.existingAnswer != null) {
        currentAnswer.value = cloneDeep(props.existingAnswer);
        
        if (currentAnswer.value?.hair_record != null, typeof currentAnswer.value?.hair_record == 'object') {
          const url = currentAnswer.value?.hair_record?.image;
          if (url == null) return;
          fetchFileFromUrl(currentAnswer.value?.hair_record?.image || '');
        }
      } else {
        currentAnswer.value = {
          customer: props.myPrescript.customer,
          question: props.currentQuestion,
          prescript: props.myPrescript,
          descriptive_answer: '',
          answer_options: [],
          hair_record: null,
        };
      }
    }
    watch([() => props.questionIndex], () => {
      localizeAnswer()
    })
    
    // onUpdated(() => {
    //   // alert('updated')
    // })
    
    onMounted(() => {
      localizeAnswer();
    });
    
    return {
      currentAnswer,
      uploadingImage,
      isOptionSelected,
      onSelectAnswer,
      hasAnswers,
      onClickPrevious,
      onClickNext,
    };
  }
})
</script>
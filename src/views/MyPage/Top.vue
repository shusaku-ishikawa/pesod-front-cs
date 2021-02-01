<template>
  <base-layout>
    <div class="w-full bg-white shadow p-2">
      <div class="grid grid-cols-2 mb-4">
        <div class="col-span-1 mb-2">
          ID: 123456
        </div>
        <div class="col-span-1">
          ペルソナ太郎様
        </div>
        <div class="col-span-1">
          かかりつけ医師
        </div>
        <div class="col-span-1">
          発毛するぞ 先生
        </div>
      </div>
      
      <div
        v-for="(group, i) in linkGroups"
        :key="i"
      > 
        <div
          class="bg-gray-200 text-left pl-5 border border-black"
        >
          {{ group.name }}
        </div>
        <ul>
          <li
            v-for="(li, j) in group.links"
            :key="j"
            @click="() => { router.push(li.link) }"
            class="cursor-pointer bg-white text-left px-5 border-r border-l border-black py-2 flex"
            :class="{ 'border-b': j < group.links.length-1 || i === linkGroups.length-1 }"
          >
            <div class="flex-grow">
              {{ li.name }}
            </div>
            <svg
              class="w-6 h-6"
              xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
            </svg>
          </li>
          
          
        </ul>
      </div>
    </div>
  </base-layout>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import { useRoute, useRouter } from 'vue-router';

export default defineComponent({
  components: {
  },
  setup() {
    const router = useRouter();
    const linkGroups = [
      {
        name: 'マイページ',
        links: [
          { name: '遺伝子タイプ', link: { name: 'MyPageGenetics' } },
          { name: '定期便' },
          { name: '購入履歴' },
          { name: '発送状況' },
          { name: '決済情報' },
          { name: 'アカウント情報' },
        ],
      },
      {
        name: 'お問い合わせ',
        links: [
          { name: 'よくあるご質問' },
          { name: 'お問い合わせ先' },
        ],
      },
      {
        name: 'その他',
        links: [
          { name: '利用規約' },
          { name: 'プライバシーポリシー' },
          { name: '特定商取引法に基づく表記' },
          
        ],
      }
      
    ];
    return {
      router,
      linkGroups
    }
  }
})
</script>
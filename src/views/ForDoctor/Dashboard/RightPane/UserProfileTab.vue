<template>
  <div class="w-full sm:py-5">
    <div class="text-left mb-5">
      <div class="inline-block border border-b-0 bg-primary-light py-1 px-5 w-36 text-sm rounded-tl-lg rounded-tr-full">
        顧客情報詳細
      </div>
      <div class="border p-2 px-4">
        <table class="border-collapsed w-full text-sm">
          <tbody class="border-b ">
            <tr>
              <th>顧客ID</th>
              <td>{{ prescript.customer.id }}</td>
            </tr>
          </tbody>
          <tbody class="border-b">
            <tr>
              <th>お名前</th>
              <td>{{ `${prescript.customer.first_name} ${prescript.customer.last_name}` }}</td>
            </tr>
            <tr>
              <th>性別</th>
              <td>{{ prescript.customer.gender }}</td>
            </tr>
            <tr>
              <th>生年月日</th>
              <td>{{ prescript.customer.birthday }}</td>
            </tr>
            
          </tbody>
          <tbody class="">
            <tr>
              <th>住所</th>
              <td>
                <div>
                  {{ prescript.customer.zip_code }}
                </div>
                <div>
                  {{ prescript.customer.prefecture }}{{ prescript.customer.city }}{{ prescript.customer.address }}
                </div>
              </td>
            </tr>
            <tr>
              <th>Email</th>
              <td>{{ prescript.customer.email }}</td>
            </tr>
            <tr>
              <th>電話番号</th>
              <td>{{ prescript.customer.phone_number }}</td>
            </tr>
            
          </tbody>

        </table>
      </div>
    </div>
    <div class="text-left mb-5">
      <div class="inline-block border border-b-0 bg-primary-light py-1 px-5 w-36 text-sm rounded-tl-lg rounded-tr-full">
        診察履歴
      </div>
      <div class="border p-2 px-4">
        <table class="border-collapsed w-full text-sm">
          <tbody class=" ">
            <tr

            >
              <th>診察ID</th>
              <td>{{ prescript.customer.id }}</td>
            </tr>
            <tr

            >
              <th>診察日</th>
              <td>{{ prescript.customer.id }}</td>
            </tr>
            
          </tbody>
        
        </table>
      </div>
    </div>
    <div class="text-left ">
      <div class="inline-block border border-b-0 bg-primary-light py-1 px-5 w-36 text-sm rounded-tl-lg rounded-tr-full">
        定期購入
      </div>
      <div class="border p-2 px-4">
        <table class="border-collapsed w-full text-sm">
          <tbody class=" ">
            <tr

            >
              <th>診察ID</th>
              <td>{{ prescript.customer.id }}</td>
            </tr>
            <tr

            >
              <th>診察日</th>
              <td>{{ prescript.customer.id }}</td>
            </tr>
            
          </tbody>
        
        </table>
      </div>
    </div>
   
  </div>
</template>
<style lang="scss" scoped>
  // table {
  //   tr {
  //     border-bottom: solid gray 1px;
  //     th {
  //       white-space: nowrap;
  //     }
  //     th, td {
  //       text-align: left;
  //       padding: 3px 5px;;
  //     }
  //   }
  // }
</style>
<script lang="ts">
import { defineComponent, onMounted, SetupContext } from "vue";

import { IAnswer, IAnswerOption, IPrescript } from "@/types/Interfaces";

export default defineComponent({
  components: {
  },
  props: {
    prescript: {
      type: Object as () => IPrescript
    }
  },
  setup(_, context: SetupContext) {
  
    return {
    };
  }
})
</script>

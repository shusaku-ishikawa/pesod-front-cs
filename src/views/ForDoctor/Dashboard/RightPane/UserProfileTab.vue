<template>
  <div class="w-full sm:py-5">
    <table class="text-sm border-collapse">
      <tbody>
        <tr>
          <th>ID</th>
          <td>{{ prescript.customer.id }}</td>
        </tr>
        <tr>
          <th>名前</th>
          <td>{{ prescript.customer.first_name }} {{ prescript.customer.last_name }}</td>
        </tr>
        <tr>
          <th>かかりつけ医</th>
          <td>{{ prescript.doctor.first_name }} {{ prescript.doctor.last_name }}</td>
        </tr>
        <tr>
          <th>住所</th>
          <td>〒{{ prescript.customer.zip_code }}<br>{{ prescript.customer.prefecture }}{{ prescript.customer.city }}{{ prescript.customer.address }}</td>
        </tr>
        <tr>
          <th>メールアドレス</th>
          <td>{{ prescript.customer.email }}</td>
        </tr>
        <tr>
          <th>電話番号</th>
          <td>{{ prescript.customer.phonenumber }}</td>
        </tr>
        <tr>
          <th>性別</th>
          <td>{{ prescript.customer.gender }}</td>
        </tr>
        <tr>
          <th>遺伝子タイプ</th>
          <td>{{ prescript.customer.dna }}</td>
        </tr>
        <tr>
          <th>生年月日</th>
          <td>{{ prescript.customer.birthday }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<style lang="scss" scoped>
  table {
    tr {
      border-bottom: solid gray 1px;
      th {
        white-space: nowrap;
      }
      th, td {
        text-align: left;
        padding: 3px 5px;;
      }
    }
  }
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

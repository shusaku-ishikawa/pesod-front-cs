<template>
  <router-view/>
</template>

<style lang="scss">

#app {
  font-family: 'Lato', 'Noto Sans JP', 'メイリオ', Meiryo, 'ヒラギノ角ゴ ProN', 'Hiragino Kaku Gothic ProN', 'ＭＳ Ｐゴシック', 'MS PGothic', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
<script lang="ts">
import { defineComponent, onMounted, ref, SetupContext } from 'vue'
import {useRoute, useRouter} from 'vue-router'
import useAuth from '@/types/Auth'

export default defineComponent({
  setup(props: any, context: SetupContext) {
    const route = useRoute();
    const router = useRouter();
    const {
      token,
      getTokenFromLS,
      profile,
      getProfileFromLS
    } = useAuth();
    
    onMounted(() => {
      
      token.value = getTokenFromLS()
      
      profile.value = getProfileFromLS();
      if (token.value == null || profile.value == null) {
        router.push({ name: 'Login' })
      }
    })

    return {

    }
  }
})
</script>

<template>
  <div
    class="absolute w-full space-y-4"
  
  >
    <div
      v-for="i in 4"
      :key="i"
      :class="{ 'ml-auto': i % 2, 'mr-auto': (i+1) % 2, 'w-3/5': true }"
      class="  p-2 ">
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
</template>
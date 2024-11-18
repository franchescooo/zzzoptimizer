<template>
  <div class="w-full max-w-md min-w-80 select-none">
    <USelectMenu 
      class="ml-1 mr-1"
      :options="enemies"
      v-model="selected"
      color="gray"
      
    >
      <template #label>
        <div class="flex flex-row">
          <img class="m-6 h-20" :src="selected.url" />
          <div class="flex flex-col justify-center">
            <div>{{ selected.name }}</div>
            <div>Базовая защита {{ selected.def }}</div>
          </div>
        </div>
      </template>
      <template #option="{ option: enemy }">
        <div class="flex flex-row">
          <img class="m-6 h-20" :src="enemy.url" />
          <div class="flex flex-col justify-center">
            <div>{{ enemy.name }}</div>
            <div>Базовая защита {{ enemy.def }}</div>
          </div>
        </div>
      </template>
    </USelectMenu>

    <div class="flex flex-row w-full mt-5 pl-1 pr-1 gap-1 text-black text-center"> 
      <div 
        v-for="i in sources.length"
        :key="i"
        class="flex flex-1 flex-col"
      >
        <div 
          :class="'h-full flex flex-col bg-lime-300' + (i == 1 ? ' rounded-tl-xl' : '') + (i == sources.length ? ' rounded-tr-xl' : '') + (sources[i-1].val.value ? ' ' : ' grayscale ')"
          @click="sources[i-1].val.value = ! (sources[i-1].val.value)"
        >
          <div class="text-xs">{{ sources[i-1].name }}</div>
          <img :src="sources[i-1].src" class="pl-3 pr-3"/>
          <div class="text-md h-full flex items-center justify-center">{{  sources[i-1].pen }}%</div>
        </div>
        <div
          v-if="sources[i - 1].name == 'Рина'"
          :class="'mt-1 pt-1 pb-1 bg-lime-300' + ((sources[i - 1].pen.value == 39) ? '' : ' grayscale')"
          @click="() => (sources[i - 1].pen.value = (69 - sources[i - 1].pen.value))"
        >М1</div>
        <div :class="'mt-1 bg-slate-300' + (i == 1 ? ' rounded-bl-lg' : '') + (i == sources.length ? ' rounded-br-lg' : '') + (sources[i-1].val.value ? ' text-green-600' : ' text-red-600')">
          {{ (sources[i-1].val.value ? '+' : '-') }}{{ (sources[i-1].val.value ? buff(sources[i-1].pen.value / 100) : debuff(sources[i-1].pen.value / 100)).toFixed(2) }}%
        </div>
      </div>
    </div>
    <div class="flex flex-row mt-4 mr-1 ml-1">
      <div
        :class="'w-5/12 pb-2 pt-1 rounded-l-xl flex flex-col items-center justify-center bg-lime-300' + (!flat ? ' grayscale' : '')"
      >
        <div class="text-sm text-black">Пробивание: {{ flat }}</div>
        <URange
          class="w-5/6"
          :min="0"
          :max="9*10"
          :step="9"
          v-model="flat"
        />
      </div>
      <div 
        :class="'w-7/12 pb-2 pt-1 flex flex-col rounded-r-xl items-center justify-between bg-purple-400 ' + (!defred ? 'grayscale' : '')"
      >
        <div class="text-black text-sm w-40">{{'Срезано '+ defred +'% защиты'}}</div>
        <URange
          class="w-5/6"
          :min="0"
          :max="70"
          :step="5"
          v-model="defred"
        />
      </div>
    </div>
    <div
      class="flex flex-col justify-between ml-1 mr-1 bg-slate-300 rounded-lg  mt-4 text-center"
    >
      <div class="w-full h-1/3 content-center">
        Защита цели: {{ def().toFixed(2) }}
      </div>
      <span class="w-full h-1/3 content-center">
        Множитель урона: {{ mul().toFixed(3) }}
      </span>
    </div>
  </div>
</template>
<script setup>
const sources = [
  {
    name: 'Рина',
    src: 'https://img2.teletype.in/files/97/3f/973fa508-6229-452c-9fd0-c39b1a1e5393.png',
    val: ref(false),
    pen: ref(30),
  },
  {
    name: 'Компилятор',
    src: 'https://img2.teletype.in/files/58/81/58811060-8684-484b-8450-c156163db500.webp',
    val: ref(false),
    pen: ref(24),
  },
  {
    name: '5-ый диск',
    src: 'https://img1.teletype.in/files/c9/08/c9084c16-e41c-4bcc-b4bb-b83cb825ef68.png',
    val: ref(false),
    pen: ref(24),
  },
  {
    name: 'Фугу',
    src: 'https://img2.teletype.in/files/9d/1b/9d1b510a-8fe1-4f24-a8c4-0a7d8aac572c.webp',
    val: ref(false),
    pen: ref(8),
  }
]
const flat = ref(0)
const defred = ref(0)

const enemies = [
  {
    name: "Тюрфинг",
    url: "https://img4.teletype.in/files/ba/17/ba17d1b7-c336-4254-ad1b-83dd0b4d17b1.webp",
    def: 571
  },
  {
    name: "Егерь",
    url: "https://img1.teletype.in/files/4d/57/4d57e2a8-e0dd-4954-a379-db980d23ae83.webp",
    def: 794
  },
  {
    name: "Фарбаути",
    url: "https://img1.teletype.in/files/00/b1/00b15a74-d07c-411a-a176-b1b308eaa21c.webp",
    def: 857
  },
  {
    name: "Допельгангер Джейн",
    url: "https://img1.teletype.in/files/43/8b/438b89d0-ec43-48e8-8c27-9df5a3f3ac24.webp",
    def: 952
  }
]
const selected = ref(enemies[0])

const def = (pen = 0) => {
  return Math.max(0.0, selected.value.def * (1 - defred.value / 100) * (1 + pen - sources.reduce((sum, src) => (sum + src.pen.value * src.val.value / 100), 0)) - flat.value)
}

const mul = () => {
  return 796 / (796 + def())
}

const buff = (pen) => {
  return 100 * (796 + def(pen)) / (796 + def()) - 100
}

const debuff = (pen) => {
  return 100 * (796 + def()) / (796 + def(-pen)) - 100
}
</script>
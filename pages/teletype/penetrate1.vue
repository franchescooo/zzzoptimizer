<template>
  <div class="w-fit min-w-96 select-none">
    <USelectMenu 
      class="ml-3 mr-3"
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

    <div class="flex flex-row mt-5 ml-3 mr-3 text-black"> 
      <div class="w-fit flex flex-col">
        <div
          :class="'rounded-tl-xl w-fit pl-2 pr-2 text-center bg-lime-300' + (!rina ? ' grayscale' : '')"
          @click="rina = !rina" 
        >
          <span class="text-xs">Рина</span>
          <img 
            src="https://img2.teletype.in/files/97/3f/973fa508-6229-452c-9fd0-c39b1a1e5393.png" 
            class="h-20 w-20 object-contain"
          />
          <div>+3{{ (m1 ? 9 : 0) }}%</div>
        </div>
        <div
          :class="'mt-1 rounded-bl-xl text-center bg-lime-300' + (!m1 ? ' grayscale' : '')"
          @click="m1 = !m1"
        >М1</div>
        <div
          :class="'mt-4 rounded-l-lg text-center bg-gray-300 ' + (rina ? 'text-green-600' : 'text-red-700')"
        >
          {{ ( rina ? '+' : '-') }}
          {{ ( !rina ? debuff(0.3 + m1 * 0.09).toFixed(2) : buff(0.3 + m1 * 0.09).toFixed(2)) }}%
        </div>
      </div>
      <div class="w-fit flex flex-col ml-2">
        <div
          :class="'pl-2 pr-2 pb-7 w-fit text-center bg-lime-300' + (!compiler ? ' grayscale' : '')"
          @click="compiler = !compiler"
        >
          <span class="text-xs">Компилятор</span>
          <img 
            src="https://img2.teletype.in/files/58/81/58811060-8684-484b-8450-c156163db500.webp" 
            class="h-20 w-20 object-contain"
          />
          <div>+24%</div>
          
        </div>
        <div
          :class="'mt-4 text-center bg-gray-300 ' + (compiler ? 'text-green-600' : 'text-red-700')"
        >
          {{ ( compiler ? '+' : '-') }}
          {{ ( !compiler ? debuff(0.24).toFixed(2) : buff(0.24).toFixed(2)) }}%
        </div>
      </div>
      <div class="w-fit flex flex-col ml-2">
        <div
          :class="'pl-2 pr-2 pb-7 w-fit text-center bg-lime-300' + (!fifth ? ' grayscale' : '')"
          @click="fifth = !fifth"
        > 
          <span class="text-black text-xs">5-ый диск</span>
          <img 
            src="https://img1.teletype.in/files/c9/08/c9084c16-e41c-4bcc-b4bb-b83cb825ef68.png" 
            class="h-20 w-20 object-contain"
          />
          <div>+24%</div>
        </div>
        <div
          :class="'mt-4 text-center bg-gray-300 ' + (fifth ? 'text-green-600' : 'text-red-700')"
        >
          {{ ( fifth ? '+' : '-') }}
          {{ ( !fifth ? debuff(0.24).toFixed(2) : buff(0.24).toFixed(2)) }}%
        </div>
      </div>
      <div class="flex flex-col w-fit ml-2">
        <div
          :class="'pl-2 pr-2 pb-7 rounded-r-xl w-fit text-center bg-lime-300' + (!puffer ? ' grayscale' : '')"
          @click="puffer = !puffer"
        >
          <span class="text-black text-xs">Фугу</span>
          <img 
            src="https://img2.teletype.in/files/9d/1b/9d1b510a-8fe1-4f24-a8c4-0a7d8aac572c.webp" 
            class="h-20 w-20 object-contain"
          />
          <div class="text-black">+8%</div>
        </div>
        <div
          :class="'mt-4 rounded-r-lg text-center bg-gray-300 ' + (puffer ? 'text-green-600' : 'text-red-700')"
        >
          {{ ( puffer ? '+' : '-') }}
          {{ ( !puffer ? debuff(0.08).toFixed(2) : buff(0.08).toFixed(2)) }}%
        </div>
      </div>
    </div>
    <div class="flex flex-row mt-4 mr-3 ml-3 min-w-96">
      <div
        :class="'w-1/2 pb-2 pt-1 rounded-l-xl flex flex-col items-center justify-center bg-lime-300' + (!flat ? ' grayscale' : '')"
      >
        <div class="text-sm text-black">Плоское пробивание: {{ flat }}</div>
        <URange
          class="w-5/6"
          :min="0"
          :max="9*10"
          :step="9"
          v-model="flat"
        />
      </div>
      <div 
        :class="'w-1/2 pb-2 pt-1 flex flex-col rounded-r-xl items-center justify-between bg-purple-400 ' + (!defred ? 'grayscale' : '')"
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
      class="flex flex-col justify-between ml-3 mt-4"
    >
      <div class="w-max h-1/3 content-center">
        Защита цели: {{ def().toFixed(2) }}
      </div>
      <span class="w-max h-1/3 content-center">
        Множитель урона: {{ mul().toFixed(3) }}
      </span>
    </div>
  </div>
</template>
<script setup>
const rina = ref(false)
const m1 = ref(false)
const compiler = ref(false)
const puffer = ref(false)
const fifth = ref(false)
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
  return Math.max(0.0, selected.value.def * (1 - defred.value / 100) * (1 + pen - rina.value * 0.3 - m1.value * rina.value * 0.09 - compiler.value * 0.24 - fifth.value * 0.24 - puffer.value * 0.08) - flat.value)
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
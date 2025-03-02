<template>
  <div class="w-full max-w-80 min-w-80 select-none">
    <USelectMenu 
      class="ml-1 mr-1"
      :options="enemies"
      v-model="selected"
      color="gray"
      
    >
      <template #label>
        <div class="flex flex-row w-full">
          <img class="m-6 h-20" :src="selected.url" />
          <div class="flex flex-col justify-center w-full">
            <div>{{ selected.name }}</div>
            <div>Уровень: {{ enemylvl }}</div>
            <div
              class="w-3/4"
              onclick="event.stopPropagation()"
            >
              <URange
                :min="5"
                :max="70"
                :step="5"
                v-model="enemylvl"
              />
            </div>
            <div>Базовая защита {{ (selected.def * scale[Math.min(60, enemylvl)] / 100).toFixed(0) }}</div>
          </div>
        </div>
      </template>
      <template #option="{ option: enemy }">
        <div class="flex flex-row">
          <img class="m-6 h-20" :src="enemy.url" />
          <div class="flex flex-col justify-center">
            <div>{{ enemy.name }}</div>
            <div>Базовая защита {{ (enemy.def * scale[Math.min(60, enemylvl)] / 100).toFixed(0) }}</div>
          </div>
        </div>
      </template>
    </USelectMenu>
    <div
      class="mt-2 mx-1 px-3 py-2 bg-slate-300 rounded-xl text-center text-sm"
    >
      <div> Уровень: {{ lvl }} </div>
      <URange
      :min="10"
      :max="60"
      :step="5"
      v-model="lvl"
      />
      <div>Коэффециент уровня: {{ lvlcf[lvl] }} </div>
    </div>

    <!-- Блок с тремя источниками пробивания -->
    <div class="flex flex-row w-full mt-2 px-1 gap-1 text-black text-center"> 
      <div 
        v-for="i in sources.length"
        :key="i"
        class="flex flex-1 flex-col"
      >
        <div 
          :class="'h-full flex flex-col bg-lime-300' + (i == 1 ? ' rounded-tl-xl' : '') + (i == sources.length ? ' rounded-tr-xl' : '') + (sources[i - 1].val.value ? ' ' : ' grayscale ')"
          @click="sources[i - 1].val.value = ! (sources[i - 1].val.value)"
        >
          <div class="text-xs">{{ sources[i - 1].name }}</div>
          <img :src="sources[i-1].src" class="pl-3 pr-3 w-3/4 self-center"/>
          <div class="text-md h-full flex items-center justify-center">{{ sources[i-1].pen }}%</div>
        </div>
        <div :class="'mt-1 bg-slate-300' + ((i == 1) ? ' rounded-bl-lg' : '') + ((i == 3) ? ' rounded-br-lg' : '') + (sources[i - 1].val.value ? ' text-green-600' : ' text-red-600')">
          {{ (sources[i - 1].val.value ? '+' : '-') }}{{ (sources[i - 1].val.value ? buff(sources[i - 1].pen.value / 100) : debuff(sources[i - 1].pen.value / 100)).toFixed(2) }}%
        </div>
      </div>
    </div>

    <!-- Блок с Риной -->
    <div class="flex flex-col w-full mt-2 px-1 gap-1 text-black text-center">
      <div 
        :class="'h-full flex flex-row bg-lime-300 rounded-tl-xl rounded-tr-xl'  + (rina ? ' ' : ' grayscale ')"
        @click="rina = ! rina"
      >
        <div class="flex flex-col w-1/3">
          <div class="text-xs text-center">Рина</div>  
          <img src="https://img2.teletype.in/files/97/3f/973fa508-6229-452c-9fd0-c39b1a1e5393.png" class="pl-3 pr-3 w-3/4 self-center"/>
          <div class="text-md h-full flex items-center justify-center">{{ rinapen().toFixed(2) }}%</div>
        </div>
        <!-- Выбор амплификатора -->
        <div class="flex flex-row w-2/3 justify-center items-center"
        >
          <img 
            v-for="wegine in wegines"
            :class="'w-1/4 m-0.5 object-scale-down h-fit rounded-md' + ((selwegine.name == wegine.name) ? ' bg-purple-400' : '')"
            @click="() => (selwegine = wegine)"
            onclick="event.stopPropagation()"
            :src="wegine.url"
          />
          
        </div>
      </div>
      <div
        :class="'bg-lime-300' + (m1 ? '' : ' grayscale')"
        @click="() => (m1 = ! m1)"
      >М1</div>
      <div :class="'bg-slate-300 rounded-bl-lg rounded-br-lg' + (rina ? ' text-green-600' : ' text-red-600')">
        {{ (m1 ? '' : '') }}{{ (rina ? '+' : '-') }}{{ (rina ? buff(rinapen() / 100) : debuff(rinapen() / 100)).toFixed(2) }}%
      </div>
    </div>

    <!-- Блок с тремя источниками среза -->
    <div class="flex flex-row w-full mt-2 px-1 gap-1 text-black text-center"> 
      <!-- Николь -->
      <div
        class="flex flex-col"
      >
        <div 
          :class="'flex flex-col bg-lime-300 rounded-tl-xl' + (nicole ? ' ' : ' grayscale ')"
          @click="nicole = ! (nicole)"
        >
          <div class="text-xs">Николь</div>
          <img src="https://img1.teletype.in/files/03/60/0360b1e5-24ac-4f5f-8cee-13243d108ba2.png" class="pl-3 pr-3 w-3/4 self-center"/>
          <div class="text-md h-full flex items-center justify-center">40% среза</div>
        </div>
        <div :class="'bg-slate-300 rounded-bl-lg mt-1' + (nicole ? ' text-green-600' : ' text-red-600')">
          {{ (nicole ? '+' : '-') }}{{ (nicole ? buff(0, 0.4) : debuff(0, 0.4)).toFixed(2) }}%
        </div>
      </div>

      <!-- Цинъи -->
      <div
        class="flex flex-col"
      >
        <div 
          :class="'flex flex-col bg-lime-300' + (qingyi ? ' ' : ' grayscale ')"
          @click="qingyi = ! (qingyi)"
        >
          <div class="text-xs">М1 Цинъи</div>
          <img src="https://img1.teletype.in/files/cb/d7/cbd7e09d-13e5-4ce5-9422-b8b4131c39a1.png" class="pl-3 pr-3 w-3/4 self-center"/>
          <div class="text-md h-full flex items-center justify-center">15% среза</div>
        </div>
        <div :class="'bg-slate-300 mt-1' + (qingyi ? ' text-green-600' : ' text-red-600')">
          {{ (qingyi ? '+' : '-') }}{{ (qingyi ? buff(0, 0.15) : debuff(0, 0.15)).toFixed(2) }}%
        </div>
      </div>

      <!-- Мияби -->
      <div
        class="flex flex-col"
      >
        <div 
          :class="'flex flex-col bg-lime-300 rounded-tr-xl' + (miyabi ? ' ' : ' grayscale ')"
          @click="miyabi = ! (miyabi)"
        >
          <div class="text-xs">М1 Мияби</div>
          <img src="https://img4.teletype.in/files/f8/e9/f8e96a74-950a-4e36-8412-ab435a3e661c.png" class="pl-3 pr-3 w-3/4 self-center"/>
          <div class="text-md h-full flex items-center justify-center">36% игнора</div>
        </div>
        <div :class="'bg-slate-300 rounded-br-lg mt-1' + (miyabi ? ' text-green-600' : ' text-red-600')">
          {{ (miyabi ? '+' : '-') }}{{ (miyabi ? buff(0, 0.36) : debuff(0, 0.36)).toFixed(2) }}%
        </div>
      </div>
    </div>

    <div class="flex flex-row mt-2 mr-1 ml-1">
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
        <div class="text-black text-sm w-40">Срезано {{defred}}% защиты</div>
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
      class="flex flex-col justify-between mt-2 ml-1 mr-1 bg-slate-300 rounded-lg text-center"
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

const rina = ref(false)
const m1 = ref(false)
const pen5 = ref(true)
const puffer = ref(true)
const corerina = ref(6)
const rinapen = () => {
  let a = [6, 7.5, 9, 10.2, 10.8, 11.4, 12]
  let b = [0, 4.8, 4.8, 9.6, 9.6, 14.4, 14.4]
  let c = [0, 20, 24]
  return (m1.value ? 1.3 : 1) * (a[corerina.value] + (b[corerina.value] + 24 * pen5.value + 8 * puffer.value + selwegine.value.pen) / 4)
}

const nicole = ref(true)
const miyabi = ref(false)
const qingyi = ref(false)

const enemylvl = ref(70)
const lvl = ref(60)
const flat = ref(0)
const defred = ref(0)

const enemies = [
  {
    name: "Тюрфинг",
    url: "https://img4.teletype.in/files/ba/17/ba17d1b7-c336-4254-ad1b-83dd0b4d17b1.webp",
    def: 36
  },
  {
    name: "Егерь",
    url: "https://img1.teletype.in/files/4d/57/4d57e2a8-e0dd-4954-a379-db980d23ae83.webp",
    def: 50
  },
  {
    name: "Фарбаути",
    url: "https://img1.teletype.in/files/00/b1/00b15a74-d07c-411a-a176-b1b308eaa21c.webp",
    def: 54
  },
  {
    name: "Допельгангер Джейн",
    url: "https://img1.teletype.in/files/43/8b/438b89d0-ec43-48e8-8c27-9df5a3f3ac24.webp",
    def: 60
  }
]
const selected = ref(enemies[0])

const wegines = [
  {
    name: "Бум-пушка",
    url: "https://img4.teletype.in/files/77/e6/77e61e1a-5f41-4a6b-90de-cb27b0e80253.png",
    pen: 0
  },
  {
    name: "Кадр на память",
    url: "https://img4.teletype.in/files/72/b3/72b39415-1013-4226-ac76-f772c42588db.png",
    pen: 20
  },
  {
    name: "Колыбель плача",
    url: "https://img2.teletype.in/files/98/df/98dfb444-e505-4843-b838-8cf99ea23cfa.png",
    pen: 24
  }
]
const selwegine = ref(wegines[0])

const scale = [
  0, 100, 108, 116, 124, 132, 142, 152, 164, 176, 188, 200, 214, 228, 242, 258, 274, 290, 306, 324, 344, 362, 382, 402, 422, 444, 466, 490, 512, 536, 562, 586, 612, 638, 666, 694, 722, 750, 780, 810, 842, 872, 904, 938, 970, 1004, 1038, 1074, 1110, 1146, 1184, 1220, 1258, 1298, 1338, 1378, 1418, 1460, 1502, 1544, 1588,
]

const lvlcf = [
  0, 50, 54, 58, 62, 66, 71, 76, 82, 88, 94, 100, 107, 114, 121, 129, 137, 145, 153, 162, 172, 181, 191, 201, 211, 222, 233, 245, 256, 268, 281, 293, 306, 319, 333, 347, 361, 375, 390, 405, 421, 436, 452, 469, 485, 502, 519, 537, 555, 573, 592, 610, 629, 649, 669, 689, 709, 730, 751, 772, 794
]

const def = (pen = 0, defshr = 0) => {
  return Math.max(0.0, (scale[Math.min(enemylvl.value, 60)] / 100) * selected.value.def * (1 + defshr - miyabi.value * 0.36 - nicole.value * 0.4 - qingyi.value * 0.15 - defred.value / 100) * (1 + pen - sources.reduce((sum, src) => (sum + src.pen.value * src.val.value / 100), 0) - rinapen() * rina.value / 100) - flat.value)
}

const mul = () => {
  return lvlcf[lvl.value] / (lvlcf[lvl.value] + def())
}

const buff = (pen = 0, defshr = 0) => {
  return 100 * (lvlcf[lvl.value] + def(pen, defshr)) / (lvlcf[lvl.value] + def()) - 100
}

const debuff = (pen = 0, defshr = 0) => {
  return 100 * (lvlcf[lvl.value] + def()) / (lvlcf[lvl.value] + def(-pen, -defshr)) - 100
}
</script>
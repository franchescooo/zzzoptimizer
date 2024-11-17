<template>

</template>
<script setup>
const { param } = defineProps(["param"])
const selected_stat = param["stat"]
const stat_value = param["val"]
const stats = [
  {
    name:  "Крит. урон",
    proc: 48,
    value: 1,
  },
  {
    name: "Крит. шанс",
    proc: 24,
    value: 2,
  },
  {
    name: "Сила атаки%",
    proc: 3,
    value: 3,
  },
  {
    name:  "Знание аномалии",
    proc: 9,
    value: 4,
  },
  {
    name: "Сила атаки",
    proc: 19,
    value: 9,
  },
  {
    name:  "Пробивание",
    proc: 9,
    value: 10,
  },
  {
    name:  "HP%",
    proc: 3,
    value: 11,
  },
  {
    name:  "Защита%",
    proc: 48,
    value: 12
  },
  {
    name:  "HP",
    proc: 112,
    value: 13
  },
  {
    name:  "Защита",
    proc: 15,
    value: 14
  }
]
</script>
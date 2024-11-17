<script setup>
// import { getData, setData } from 'nuxt-storage/local-storage'


// function addItem() {
//   const Key = 'myagents'
//   const curData = (getData(Key) ? JSON.parse(getData(Key)) : {})
//   const newData = {
//       "Name": "Anby"
//   }
//   curData[newData['Name']] = newData
//   setData(Key, JSON.stringify(curData))
// }
</script> 

<template>
  <button @click="$emit("addModal")"> Добавить что-то </button>
</template>

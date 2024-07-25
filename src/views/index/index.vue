<template>
  <div class="main">
    <n-flex vertical>
      <n-card title="Introduction" embedded>
        The calculator of trabecular area(Tb.Ar), cortical volmnetric bone mineral density(Ct.vBMD), stiffness of the distal tibia of the Chinese adolescent and pediatric patients with X-linked hypophosphatemia
      </n-card>
      <n-card
        title="Model For Test"
        embedded
        :bordered="false"
      >
        <n-grid :x-gap="22" :cols="4">
          <n-gi :span="1">
            <n-form ref="ctvBMDFormRef" :model="form">
              <n-form-item label="Sex:" path="form.sex">
                <n-radio-group v-model:value="form.sex">
                  <n-space>
                    <n-radio :value="0">Female = 0</n-radio>
                    <n-radio :value="1">Male = 1</n-radio>
                  </n-space>
                </n-radio-group>
              </n-form-item>
              <n-form-item label="Height:">
                <n-input-number v-model:value="form.height" :show-button="false">
                  <template #suffix>
                    cm
                  </template>
                </n-input-number>
              </n-form-item>
              <n-form-item label="Maximum distance between two lower limbs:">
                <n-input-number v-model:value="form.distanceCm" :show-button="false">
                  <template #suffix>
                    cm
                  </template>
                </n-input-number>
              </n-form-item>
              <n-form-item label="ALP:">
                <n-input-number v-model:value="form.alp" :show-button="false">
                  <template #suffix>
                    U/L
                  </template>
                </n-input-number>
              </n-form-item>
              <n-form-item label="β-CTX:">
                <n-input-number v-model:value="form.ctx" :show-button="false">
                  <template #suffix>
                    ng/ml
                  </template>
                </n-input-number>
              </n-form-item>
              <div>
                <n-space>
                  <n-button type="primary" @click="calc">Calculate</n-button>
                </n-space>
              </div>
            </n-form>
          </n-gi>
          <n-gi :span="3">
            <n-card title="Result For Model_Tb.Ar">
              <n-spin :show="show">
                <n-alert :type="type ? 'success' : 'info'">
                  {{ type ? 'Calculation complete.' : 'Ready for calculation.' }}
                </n-alert>
              </n-spin>
              <n-table v-show="type" :bordered="false" :single-line="false">
                <thead>
                  <tr>
                    <th v-for="(data, index) in tableHeader" :key="index">{{ data }}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th v-for="(data, index) in valueOne" :key="index">{{ round(data) }} mm²</th>
                  </tr>
                </tbody>
              </n-table>
            </n-card>
            <n-card title="Result For Model_Ct.vBMD">
              <n-spin :show="show">
                <n-alert :type="type ? 'success' : 'info'">
                  {{ type ? 'Calculation complete.' : 'Ready for calculation.' }}
                </n-alert>
              </n-spin>
              <n-table v-show="type" :bordered="false" :single-line="false">
                <thead>
                  <tr>
                    <th v-for="(data, index) in tableHeader" :key="index">{{ data }}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th v-for="(data, index) in twoValue" :key="index">{{ round(data) }} mgHA/cm³</th>
                  </tr>
                </tbody>
              </n-table>
            </n-card>
            <n-card title="Result For Model_Stiffness">
              <n-spin :show="show">
                <n-alert :type="type ? 'success' : 'info'">
                  {{ type ? 'Calculation complete.' : 'Ready for calculation.' }}
                </n-alert>
              </n-spin>
              <n-table v-show="type" :bordered="false" :single-line="false">
                <thead>
                  <tr>
                    <th v-for="(data, index) in tableHeader" :key="index">{{ data }}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th v-for="(data, index) in threeValue" :key="index">{{ round(data) }} N/mm</th>
                  </tr>
                </tbody>
              </n-table>
            </n-card>
          </n-gi>
        </n-grid>
      </n-card>
    </n-flex>
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
// import { Decimal } from 'decimal.js' 
import axios from 'axios'
const tableHeader = ref<Array<string>>(['fit', 'lwr', 'upr'])

interface Model {
  sex: number
  height: number
  distanceCm: number
  alp: number
  ctx: number
}

const form = ref<Model>({
  sex: 0,
  height: 0,
  distanceCm: 0,
  alp: 0,
  ctx: 0
})

const showOne = ref<boolean>(false)
const typeOne = ref<boolean>(false)
const valueOne = ref<Array<any>>([])
const calculatorTbAr = () => {
  showOne.value = true
  typeOne.value = false
  axios.post('/api/r/model_tb_ar_2', {
    sex: form.value.sex,
    height: form.value.height,
    alp: form.value.alp,
    ctx: form.value.ctx
  }).then((res: any) => {
    showOne.value = false
    typeOne.value = true
    valueOne.value = res.data.data
  })
}
const showTwo = ref(false)
const typeTwo = ref(false)
const twoValue = ref([])
function calcCTVBMD() {
  showTwo.value = true
  typeTwo.value = false
  axios.post('/api/r/model_ct_v_bmd_2', {
    ...form.value
  }).then((res: any) => {
    showTwo.value = false
    typeTwo.value = true
    twoValue.value = res.data.data
  })
}
const showThree = ref(false)
const typeThree = ref(false)
const threeValue = ref([])
function calcStiffness() {
  showThree.value = true
  typeThree.value = false
  axios.post('/api/r/model_s2', {
    sex: form.value.sex,
    height: form.value.height,
    alp: form.value.alp
  }).then((res: any) => {
    showThree.value = false
    typeThree.value = true
    threeValue.value = res.data.data
    // console.log(res)
  })
}
const show = ref<boolean>(false)
const type = ref<boolean>(false)
// const r = ref<any>()
const calc = () => {
  show.value = true
  type.value = false
  axios.post('/api/r/calc', { ...form.value }).then((res: any) => {
    show.value = false
    type.value = true
    const {model_tb_ar, model_ct_v_bmd, model_s2} = res.data.data
    valueOne.value = model_tb_ar
    twoValue.value = model_ct_v_bmd
    threeValue.value = model_s2 
  })
}
function round(value: number) {
  return Math.round(value * 10) / 10
}
</script>
<style scope>
.main {
  width: 100%;
  height: 100%;
}
</style>

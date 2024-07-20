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
                <n-input v-model:value="form.height">
                  <template #suffix>
                    cm
                  </template>
                </n-input>
              </n-form-item>
              <n-form-item label="Maximum distance between two lower limbs:">
                <n-input v-model:value="form.distanceCm">
                  <template #suffix>
                    cm
                  </template>
                </n-input>
              </n-form-item>
              <n-form-item label="ALP:">
                <n-input v-model:value="form.alp">
                  <template #suffix>
                    U/L
                  </template>
                </n-input>
              </n-form-item>
              <n-form-item label="β-CTX:">
                <n-input v-model:value="form.ctx">
                  <template #suffix>
                    ng/ml
                  </template>
                </n-input>
              </n-form-item>
              <div>
                <n-space>
                  <n-button type="primary" @click="calc">Calculate</n-button>
                </n-space>
              </div>
            </n-form>
          </n-gi>
          <n-gi :span="3">
            <n-card title="Result For Model_Tb.Ar2">
              <n-spin :show="showOne">
                <n-alert :type="typeOne ? 'success' : 'info'">
                  {{ typeOne ? 'Calculation complete.' : 'Ready for calculation.' }}
                </n-alert>
              </n-spin>
              <n-table v-show="typeOne" :bordered="false" :single-line="false">
                <thead>
                  <tr>
                    <th v-for="(data, index) in tableHeader" :key="index">{{ data }}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th v-for="(data, index) in valueOne" :key="index">{{ data }} mm²</th>
                  </tr>
                </tbody>
              </n-table>
            </n-card>
            <n-card title="Result For Model_Tb.vBMD2">
              <n-spin :show="showOne">
                <n-alert :type="typeOne ? 'success' : 'info'">
                  {{ typeOne ? 'Calculation complete.' : 'Ready for calculation.' }}
                </n-alert>
              </n-spin>
              <n-table v-show="typeOne" :bordered="false" :single-line="false">
                <thead>
                  <tr>
                    <th v-for="(data, index) in tableHeader" :key="index">{{ data }}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th v-for="(data, index) in twoValue" :key="index">{{ data }} mgHA/cm³</th>
                  </tr>
                </tbody>
              </n-table>
            </n-card>
            <n-card title="Result For Model_S2">
              <n-spin :show="showOne">
                <n-alert :type="typeOne ? 'success' : 'info'">
                  {{ typeOne ? 'Calculation complete.' : 'Ready for calculation.' }}
                </n-alert>
              </n-spin>
              <n-table v-show="typeOne" :bordered="false" :single-line="false">
                <thead>
                  <tr>
                    <th v-for="(data, index) in tableHeader" :key="index">{{ data }}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th v-for="(data, index) in threeValue" :key="index">{{ data }} N/mm</th>
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
const calc = () => {
  calculatorTbAr()
  calcCTVBMD()
  calcStiffness()
}
</script>
<style scope>
.main {
  width: 100%;
  height: 100%;
}
</style>

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
            <n-form ref="formRef" :model="form" :rules="rules">
              <n-form-item label="Sex:" path="sex">
                <n-radio-group v-model:value="form.sex">
                  <n-space>
                    <n-radio :value="0">Female = 0</n-radio>
                    <n-radio :value="1">Male = 1</n-radio>
                  </n-space>
                </n-radio-group>
              </n-form-item>
              <n-form-item label="Height:" path="height">
                <n-input-number v-model:value="form.height" :show-button="false">
                  <template #suffix>
                    cm
                  </template>
                </n-input-number>
              </n-form-item>
              <n-form-item label="Maximum distance between two lower limbs:" path="distanceCm">
                <n-input-number v-model:value="form.distanceCm" :show-button="false">
                  <template #suffix>
                    cm
                  </template>
                </n-input-number>
              </n-form-item>
              <n-form-item label="ALP:" path="alp">
                <n-input-number v-model:value="form.alp" :show-button="false">
                  <template #suffix>
                    U/L
                  </template>
                </n-input-number>
              </n-form-item>
              <n-form-item label="β-CTX:" path="ctx">
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
import type { FormRules, FormInst } from 'naive-ui'

const formRef = ref<FormInst | null>(null)
const tableHeader = ref<Array<string>>(['fit', 'lwr', 'upr'])

interface Model {
  sex: number | null
  height: number | null
  distanceCm: number | null
  alp: number | null
  ctx: number | null
}

const form = ref<Model>({
  sex: 1,
  height: null,
  distanceCm: null,
  alp: null,
  ctx: null
})


const valueOne = ref<Array<any>>([])
const twoValue = ref([])
const threeValue = ref([])

const show = ref<boolean>(false)
const type = ref<boolean>(false)
// const r = ref<any>()
const calc = () => {
  formRef.value?.validate((errors) => {
    if (!errors) {
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
    } else {
      console.log(errors)
    }
  })
}
function round(value: number) {
  return Math.round(value * 10) / 10
}
const rules: FormRules = {
  height: [
    { required: true, type: 'number', message: 'Height cannot be empty', trigger: ['blur', 'input'] },
  ],
  ctx: [
    { required: true, type: 'number', message: 'CTX cannot be empty', trigger: ['blur', 'input'] },
  ],
  alp: [
    { required: true, type: 'number', message: 'ALP cannot be empty', trigger: ['blur', 'input'] },
  ],
  distanceCm: [
    { required: true, type: 'number', message: 'DistanceCm cannot be empty', trigger: ['blur', 'input'] },
  ]
}
</script>
<style scope>
.main {
  width: 100%;
  height: 100%;
}
</style>

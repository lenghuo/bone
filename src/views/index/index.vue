<template>
  <div class="main">
    <n-flex vertical>
      <n-card title="Introduce" embedded>
        The calculator of trabecular area(Tb.Ar), cortical volmnetric bone mineral density(Ct.vBMD), stiffness of the distal tibia of the Chinese adolescent and pediatric patients with X-linked hypophosphatemia
      </n-card>
      <n-card
        title="Model For Test"
        embedded
        :bordered="false"
      >
        <n-tabs type="line" animated>
          <n-tab-pane name="model_tb_ar_2" tab="Model_Tb.Ar2">
            <n-grid x-gap="22" :cols="4">
              <n-gi :span="1">
                <n-form ref="tbArFormRef" :model="tbArFormValue">
                  <n-form-item label="Sex:" path="tbArFormValue.sex">
                    <n-radio-group v-model:value="tbArFormValue.sex">
                      <n-space>
                        <n-radio :value="0">Female = 0</n-radio>
                        <n-radio :value="1">Male = 1</n-radio>
                      </n-space>
                    </n-radio-group>
                  </n-form-item>
                  <n-form-item label="Height:">
                    <n-input v-model:value="tbArFormValue.height">
                      <template #suffix>
                        cm
                      </template>
                    </n-input>
                  </n-form-item>
                  <n-form-item label="ALP:">
                    <n-input v-model:value="tbArFormValue.alp">
                      <template #suffix>
                        U/L
                      </template>
                    </n-input>
                  </n-form-item>
                  <n-form-item label="β-CTX:">
                    <n-input v-model:value="tbArFormValue.ctx">
                      <template #suffix>
                        ng/ml
                      </template>
                    </n-input>
                  </n-form-item>
                  <div>
                    <n-space>
                      <n-button type="primary" @click="calculatorTbAr">Calculate</n-button>
                    </n-space>
                  </div>
                </n-form>
              </n-gi>
              <n-gi :span="3">
                <n-card title="Status/Out">
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
                        <th v-for="(data, index) in valueOne" :key="index">{{ data }}</th>
                      </tr>
                    </tbody>
                  </n-table>
                </n-card>
              </n-gi>
            </n-grid>
          </n-tab-pane>
          <n-tab-pane name="model_tb_v_bmd_2" tab="Model_Tb.vBMD2">
            <n-grid x-gap="22" :cols="4">
              <n-gi :span="1">
                <n-form ref="ctvBMDFormRef" :model="ctVBMDFormValue">
                  <n-form-item label="Sex:" path="ctVBMDFormValue.sex">
                    <n-radio-group v-model:value="ctVBMDFormValue.sex">
                      <n-space>
                        <n-radio :value="0">Female = 0</n-radio>
                        <n-radio :value="1">Male = 1</n-radio>
                      </n-space>
                    </n-radio-group>
                  </n-form-item>
                  <n-form-item label="Height:">
                    <n-input v-model:value="ctVBMDFormValue.height">
                      <template #suffix>
                        cm
                      </template>
                    </n-input>
                  </n-form-item>
                  <n-form-item label="Maximum distance between two lower limbs:">
                    <n-input v-model:value="ctVBMDFormValue.distanceCm">
                      <template #suffix>
                        cm
                      </template>
                    </n-input>
                  </n-form-item>
                  <n-form-item label="ALP:">
                    <n-input v-model:value="ctVBMDFormValue.alp">
                      <template #suffix>
                        U/L
                      </template>
                    </n-input>
                  </n-form-item>
                  <n-form-item label="β-CTX:">
                    <n-input v-model:value="ctVBMDFormValue.ctx">
                      <template #suffix>
                        ng/ml
                      </template>
                    </n-input>
                  </n-form-item>
                  <div>
                    <n-space>
                      <n-button type="primary" @click="calcCTVBMD">Calculate</n-button>
                    </n-space>
                  </div>
                </n-form>
              </n-gi>
              <n-gi :span="3">
                <n-card title="Status/Out">
                  <n-spin :show="showTwo">
                    <n-alert :type="typeTwo ? 'success' : 'info'">
                      {{ typeTwo ? 'Calculation complete.' : 'Ready for calculation.' }}
                    </n-alert>
                  </n-spin>
                  <n-table v-show="typeTwo" :bordered="false" :single-line="false">
                    <thead>
                      <tr>
                        <th v-for="(data, index) in tableHeader" :key="index">{{ data }}</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <th v-for="(data, index) in twoValue" :key="index">{{ data }}</th>
                      </tr>
                    </tbody>
                  </n-table>
                </n-card>
              </n-gi>
            </n-grid>
          </n-tab-pane>
          <n-tab-pane name="model_s2" tab="Model_S2">
            <n-grid x-gap="22" :cols="4">
              <n-gi :span="1">
                <n-form ref="tbArFormRef" :model="stiffnessFormValue">
                  <n-form-item label="Sex:" path="stiffnessFormValue.sex">
                    <n-radio-group v-model:value="stiffnessFormValue.sex">
                      <n-space>
                        <n-radio :value="0">Female = 0</n-radio>
                        <n-radio :value="1">Male = 1</n-radio>
                      </n-space>
                    </n-radio-group>
                  </n-form-item>
                  <n-form-item label="Height:">
                    <n-input v-model:value="stiffnessFormValue.height">
                      <template #suffix>
                        cm
                      </template>
                    </n-input>
                  </n-form-item>
                  <n-form-item label="ALP:">
                    <n-input v-model:value="stiffnessFormValue.alp">
                      <template #suffix>
                        U/L
                      </template>
                    </n-input>
                  </n-form-item>
                  <div>
                    <n-space>
                      <n-button type="primary" @click="calcStiffness">Calculate</n-button>
                    </n-space>
                  </div>
                </n-form>
              </n-gi>
              <n-gi :span="3">
                <n-card title="Status/Out">
                  <n-spin :show="showThree">
                    <n-alert :type="typeThree ? 'success' : 'info'">
                      {{ typeThree ? 'Calculation complete.' : 'Ready for calculation.' }}
                    </n-alert>
                  </n-spin>
                  <n-table v-show="typeThree" :bordered="false" :single-line="false">
                    <thead>
                      <tr>
                        <th v-for="(data, index) in tableHeader" :key="index">{{ data }}</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <th>{{ threeValue[0] }}</th>
                        <th>{{ threeValue[1] }}</th>
                        <th>{{ threeValue[2] }}</th>
                      </tr>
                    </tbody>
                  </n-table>
                </n-card>
              </n-gi>
            </n-grid>
          </n-tab-pane>
        </n-tabs>
      </n-card>
    </n-flex>
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import { Decimal } from 'decimal.js' 
import axios from 'axios'
const tableHeader = ref<Array<string>>(['fit', 'lwr', 'upr'])
interface TbArModel {
  sex: number;
  height: number;
  alp: number;
  ctx: number;
}
const tbArConstant = ref<TbArModel>({
  sex: 68.670,
  height: 8.924,
  alp: 0.238,
  ctx: 46.452,
})
interface ctVBMDModel {
  sex: number
  height: number
  distanceCm: number
  alp: number
  ctx: number
}
const ctVBMDConstant = ref<ctVBMDModel>({
  sex: -21.910,
  height: 1.002,
  distanceCm: -1.250,
  alp: -0.161,
  ctx: -38.416
})
interface StiffnessModel {
  sex: number,
  height: number,
  alp: number,
}
const stiffnessConstant = ref<StiffnessModel>({
  sex: 19340.879,
  height: 1752.351,
  alp: -43.616
})
const result = ref<any>({
  one: 0,
  two: 0,
  three: 0,
})
const tbArFormValue = ref<TbArModel>({
  sex: 0,
  height: 0,
  alp: 0,
  ctx: 0,
})
const ctVBMDFormValue = ref<ctVBMDModel>({
  sex: 0,
  height: 0,
  distanceCm: 0,
  alp: 0,
  ctx: 0
})
const stiffnessFormValue = ref<StiffnessModel>({
  sex: 0,
  height: 0,
  alp: 0,
})
const showOne = ref<boolean>(false)
const typeOne = ref<boolean>(false)
const valueOne = ref<Array<any>>([])
const calculatorTbAr = () => {
  showOne.value = true
  typeOne.value = false
  axios.post('/api/r/model_tb_ar_2', {
    ...tbArFormValue.value
  }).then((res: any) => {
    showOne.value = false
    typeOne.value = true
    valueOne.value = res.data.data
  })
}
function calcOne(model: TbArModel) {
  const sexMul = Decimal.mul(model.sex, tbArConstant.value.sex)
  const heightMul = Decimal.mul(model.height, tbArConstant.value.height)
  const alpMul = Decimal.mul(model.alp, tbArConstant.value.alp)
  const ctxMul = Decimal.mul(model.ctx, tbArConstant.value.ctx)
  return new Decimal(sexMul).add(heightMul).add(alpMul).add(ctxMul)
}
const showTwo = ref(false)
const typeTwo = ref(false)
const twoValue = ref([])
function calcCTVBMD() {
  showTwo.value = true
  typeTwo.value = false
  axios.post('/api/r/model_ct_v_bmd_2', {
    ...ctVBMDFormValue.value
  }).then((res) => {
    showTwo.value = false
    typeTwo.value = true
    twoValue.value = res.data.data
  })
  const value = calcTwo(ctVBMDFormValue.value)
  result.value.two = value
}
function calcTwo(model: ctVBMDModel) {
  return new Decimal(Decimal.mul(model.sex, ctVBMDConstant.value.sex))
            .add(Decimal.mul(model.height, ctVBMDConstant.value.height))
            .add(Decimal.mul(model.distanceCm, ctVBMDConstant.value.distanceCm))
            .add(Decimal.mul(model.alp, ctVBMDConstant.value.alp))
            .add(Decimal.mul(model.ctx, ctVBMDConstant.value.ctx))
}
const showThree = ref(false)
const typeThree = ref(false)
const threeValue = ref([])
function calcStiffness() {
  showThree.value = true
  typeThree.value = false
  axios.post('/api/r/model_s2', {
    sex: stiffnessFormValue.value.sex,
    height: stiffnessFormValue.value.height,
    alp: stiffnessFormValue.value.alp
  }).then((res: any) => {
    showThree.value = false
    typeThree.value = true
    threeValue.value = res.data.data
    // console.log(res)
  })
  const value = calcThree(stiffnessFormValue.value)
  result.value.three = value
}
function calcThree(model: StiffnessModel) {
  return new Decimal(Decimal.mul(model.sex, stiffnessConstant.value.sex))
            .add(Decimal.mul(model.alp, stiffnessConstant.value.alp))
            .add(Decimal.mul(model.height, stiffnessConstant.value.height))
}
</script>
<style scope>
.main {
  width: 100%;
  height: 100%;
}
</style>

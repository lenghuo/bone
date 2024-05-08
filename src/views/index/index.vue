<template>
  <div class="main">
    <n-flex vertical>
      <n-card title="Introduce" embedded>
        The calculator of trabecular area(Tb.Ar), cortical volmnetric bone mineral density(Ct.vBMD), stiffness of the distal tibia of the Chinese adolescent and pediatric patients with X-linked hypophosphatemia
      </n-card>
      <n-card
        title="The optimal calculating model of Tb.Ar of the distal tibia"
        embedded
        :bordered="false"
      >
        <div style="margin-bottom: 20px;">Calculate Model: Tb.Ar = {{ tbArConstant.sex }} × Sex + {{ tbArConstant.height }} × Height + {{ tbArConstant.alp }} × ALP + {{ tbArConstant.ctx }} × β-CTX</div>
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
        <template #footer>
          <div style="font-weight: 500; font-size: 30px;"> Result: Tb.Ar = {{ result.one }}</div>
        </template>
      </n-card>
      <n-card
        title="The optimal calculating model of Ct.vBMD of the distal tibia"
        embedded
        :bordered="false"
      >
        <div style="margin-bottom: 20px;">Calculate Model: Ct.vBMD = {{ ctVBMDConstant.sex }} × Sex + {{ ctVBMDConstant.height }} × Height + {{ ctVBMDConstant.mdbtll }} × Maximum distance between two lower limbs + {{ ctVBMDConstant.alp }} × ALP + {{ ctVBMDConstant.ctx }} × β-CTX</div>
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
            <n-input v-model:value="ctVBMDFormValue.mdbtll">
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
        <template #footer>
          <div style="font-weight: 500; font-size: 30px;"> Result: Ct.vBMD = {{ result.two }}</div>
        </template>
      </n-card>
      <n-card
        title="The optimal calculating model of Stiffness of the distal tibia"
        embedded
        :bordered="false"
      >
        <div style="margin-bottom: 20px;">Calculate Model: Stiffness = {{ stiffnessConstant.sex }} × Sex + {{ stiffnessConstant.height }} × Height + {{ stiffnessConstant.alp }} × ALP</div>
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
        <template #footer>
          <div style="font-weight: 500; font-size: 30px;"> Result: Stiffness = {{ result.three }}</div>
        </template>
      </n-card>
  </n-flex>
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import { Decimal } from 'decimal.js'
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
  mdbtll: number
  alp: number
  ctx: number
}
const ctVBMDConstant = ref<ctVBMDModel>({
  sex: -21.910,
  height: 1.002,
  mdbtll: -1.250,
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
  mdbtll: 0,
  alp: 0,
  ctx: 0
})
const stiffnessFormValue = ref<StiffnessModel>({
  sex: 0,
  height: 0,
  alp: 0,
})
const calculatorTbAr = () => {
  const value = calcOne(tbArFormValue.value)
  result.value.one = value
}
function calcOne(model: any) {
  const sexMul = Decimal.mul(model.sex, 68.670)
  const heightMul = Decimal.mul(model.height, 8.924)
  const alpMul = Decimal.mul(model.alp, 0.238)
  const ctxMul = Decimal.mul(model.ctx, 46.452)
  return new Decimal(sexMul).add(heightMul).add(alpMul).add(ctxMul)
}
function calcCTVBMD() {
  const value = calcTwo(ctVBMDFormValue.value)
  result.value.two = value
}
function calcTwo(model: ctVBMDModel) {
  return new Decimal(Decimal.mul(model.sex, ctVBMDConstant.value.sex))
            .add(Decimal.mul(model.height, ctVBMDConstant.value.height))
            .add(Decimal.mul(model.mdbtll, ctVBMDConstant.value.mdbtll))
            .add(Decimal.mul(model.alp, ctVBMDConstant.value.alp))
            .add(Decimal.mul(model.ctx, ctVBMDConstant.value.ctx))
}
function calcStiffness() {
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

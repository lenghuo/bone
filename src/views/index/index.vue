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
        <div style="margin-bottom: 20px;">Calculate Model: Tb.Ar = 68.670 × Sex + 8.924 × Height + 0.238 × ALP + 46.452 × β-CTX</div>
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
              <n-button type="warning">Reset</n-button>
            </n-space>
          </div>
        </n-form>
        <template #footer>
          <div style="font-weight: 500; font-size: 30px;"> Result: Tb.Ar = {{ result.one }}</div>
        </template>
      </n-card>
      <n-card
        title="The optimal calculating model of Tb.Ar of the distal tibia"
        embedded
        :bordered="false"
      >
        <div style="margin-bottom: 20px;">Calculate Model: Tb.Ar = 68.670 × Sex + 8.924 × Height + 0.238 × ALP + 46.452 × β-CTX</div>
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
              <n-button type="warning">Reset</n-button>
            </n-space>
          </div>
        </n-form>
        <template #footer>
          <div>PS: In Sex Input Female = 0, Male = 1</div>
          <div>123</div>
        </template>
      </n-card>
      <n-card
        title="The optimal calculating model of Tb.Ar of the distal tibia"
        embedded
        :bordered="false"
      >
        <div style="margin-bottom: 20px;">Calculate Model: Tb.Ar = 68.670 × Sex + 8.924 × Height + 0.238 × ALP + 46.452 × β-CTX</div>
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
              <n-button type="warning">Reset</n-button>
            </n-space>
          </div>
        </n-form>
        <template #footer>
          <div>PS: In Sex Input Female = 0, Male = 1</div>
          <div>123</div>
        </template>
      </n-card>
  </n-flex>
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
interface TbArModel {
  sex: number;
  height: number;
  alp: number;
  ctx: number;
}
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
const calculatorTbAr = () => {
  const value = calcOne(tbArFormValue.value)
  result.value.one = value
}
function calcOne(model: any) {
  return (model.sex * 68.670) + (model.height * 8.924) + (model.alp * 0.238) + (model.ctx * 46.452)
}
</script>
<style scope>
.main {
  width: 100%;
  height: 100%;
}
</style>

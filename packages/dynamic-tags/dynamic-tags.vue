<template>
  <div :class="[`${$CLS_PREFIX}-dynamic-tags`]">
    <el-tag
      v-for="(tag, index) in modelValue"
      :key="tag + '-' + index"
      :disable-transitions="true"
      v-bind="getTagProps(tag, index)"
      @close="handleClose(tag, index)"
      @click="handleClick(tag, index)"
    >
      <span>{{ tag }}</span>
    </el-tag>
    <template v-if="createable">
      <el-input
        v-if="inputVisible"
        ref="InputRef"
        v-model="inputValue"
        class="new-tag-input"
        :disabled="isDisabled"
        @keyup.enter="handleInputConfirm"
        @blur="handleInputConfirm"
      />
      <el-button v-else class="new-tag-button" :disabled="isDisabled" @click="showInput"
        >+ New Tag</el-button
      >
    </template>
  </div>
</template>

<script lang="ts">
import { $PREFIX } from '../utils/use-global-const'
export default { name: $PREFIX + 'DynamicTags', inheritAttrs: false }
</script>

<script setup lang="ts">
import { ref, watch, computed, nextTick } from 'vue'
import { useDisabled, useFormItem, type ElInput, type TagProps } from 'element-plus'
import { debugWarn } from 'element-plus/es/utils/error'
import { $CLS_PREFIX } from '../utils/use-global-const'
import { getIncludeAttrs } from '../utils/utils'

interface Props {
  modelValue: string[]
  createable?: boolean
  repeatable?: boolean
  disabled?: boolean
  validateEvent?: boolean
  customTagProp?: (tag: string, index: number) => Record<any, any> | undefined
  // el-tag
  type?: TagProps['type']
  closable?: TagProps['closable']
  hit?: TagProps['hit']
  color?: TagProps['color']
  effect?: TagProps['effect']
  round?: TagProps['round']
}

const props = withDefaults(defineProps<Props>(), {
  createable: true,
  closable: true,
  validateEvent: true,
  customTagProp: () => {
    return {}
  }
})

const emits = defineEmits(['close', 'update:modelValue', 'click', 'create'])

const inputVisible = ref(false)
const inputValue = ref('')
const InputRef = ref<InstanceType<typeof ElInput>>()
const isDisabled = useDisabled(computed(() => props.disabled))
const { formItem } = useFormItem()

watch(
  () => props.modelValue,
  () => {
    if (props.validateEvent) {
      formItem?.validate?.('change').catch((err) => debugWarn(err))
    }
  }
)

function getTagProps(tag: string, index: number) {
  const keys = ['closable', 'type', 'hit', 'color', 'effect', 'round']
  const tagProps = props.customTagProp(tag, index) || {}
  return { ...getIncludeAttrs(keys, props), ...tagProps }
}

function handleClose(tag: string, index: number) {
  let value = [...props.modelValue]
  value.splice(index, 1)
  emits('close', tag, index)
  emits('update:modelValue', value)
}

function handleClick(tag: string, index: number) {
  emits('click', tag, index)
}

function showInput() {
  inputVisible.value = true
  nextTick(() => {
    InputRef.value?.input?.focus()
  })
}

function handleInputConfirm() {
  if (inputValue.value && (props.modelValue.indexOf(inputValue.value) == -1 || props.repeatable)) {
    emits('update:modelValue', props.modelValue.concat(inputValue.value))
    emits('create', inputValue)
  }
  inputVisible.value = false
  inputValue.value = ''
}
</script>

<style lang="scss">
@use '../theme/vars.scss' as *;
.#{$cls-prefix}dynamic-tags {
  --tags-height: 28px;
}

.#{$cls-prefix}dynamic-tags .el-tag {
  height: var(--tags-height);
  line-height: calc(var(--tags-height) - 2px);
  padding: 0 10px;
  margin-right: 10px;
}

#{$cls-prefix}dynamic-tags .new-tag-input {
  height: var(--tags-height);
  width: 90px;
  vertical-align: bottom;
}

#{$cls-prefix}dynamic-tags .new-tag-input .el-input__inner {
  height: var(--tags-height);
  line-height: var(--tags-height);
}

#{$cls-prefix}dynamic-tags .new-tag-button {
  width: 90px;
  height: var(--tags-height);
  line-height: var(--tags-height);
  padding-top: 0px;
  padding-bottom: 0px;
}
</style>

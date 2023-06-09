<template>
  <el-tooltip
    :disabled="disabledTootip"
    :placement="placement"
    append-to="body"
    :content="content"
    :enterable="enterable"
    :offset="offset"
    :popper-class="popperClassName"
    :show-after="showAfter"
    :hide-after="hideAfter"
    :show-arrow="showArrow"
  >
    <div ref="wrapper" :class="className" :style="style" v-bind="$attrs" :title="title">
      <ellipsis-content />
    </div>
  </el-tooltip>
</template>

<script lang="ts">
import { $PREFIX } from '../utils/use-global-const'
export default { name: $PREFIX + 'Ellipsis' }
</script>

<script setup lang="ts">
import { computed, ref, useSlots, nextTick, type VNode, type FunctionalComponent } from 'vue'
import { $CLS_PREFIX } from '../utils/use-global-const'
import type { ElTooltipProps } from 'element-plus'

interface Props {
  lineClamp?: number
  wordClamp?: number
  titleTip?: boolean
  effect?: ElTooltipProps['effect']
  placement?: ElTooltipProps['placement']
  enterable?: ElTooltipProps['enterable']
  offset?: ElTooltipProps['offset']
  popperClass?: ElTooltipProps['popperClass']
  showArrow?: ElTooltipProps['showArrow']
  showAfter?: ElTooltipProps['showAfter']
  hideAfter?: ElTooltipProps['hideAfter']
}

const props = withDefaults(defineProps<Props>(), {
  wordClamp: 0,
  lineClamp: 1,
  showAfter: 750
})

const slots = useSlots()

const ellipsis = ref(false)
const wrapper = ref<HTMLDivElement | null>(null)
const content = ref('')

const clampMode = computed(() => {
  return props.wordClamp > 0 ? 'word' : 'line'
})

const className = computed(() => {
  let className = ''
  if (clampMode.value == 'line' && props.lineClamp > 1) className = '__line-clamp'
  if (clampMode.value == 'word' && props.wordClamp > 1) className = '__word-clamp'
  return [`${$CLS_PREFIX}-ellipsis`, className]
})

const popperClassName = computed(() => {
  return [props.popperClass || '', `${$CLS_PREFIX}-ellipsis-popper`]
})

const style = computed(() => {
  return clampMode.value == 'line' && props.lineClamp > 1
    ? { '-webkit-line-clamp': props.lineClamp }
    : ''
})

const title = computed(() => {
  return props.titleTip && ellipsis.value ? content.value : ''
})

const disabledTootip = computed(() => {
  return props.titleTip || ellipsis.value == false
})

const EllipsisContent: FunctionalComponent = () => {
  if (!slots.default) return null
  const nodes = slots.default()
  const node = getFirstNode(nodes)

  // wordClamp 文本截断...
  if (clampMode.value == 'word' && node && typeof node.children == 'string') {
    content.value = node.children
    if (node.children.length > props.wordClamp) {
      node.children = node.children.substring(0, props.wordClamp) + '...'
      ellipsis.value = true
    } else {
      ellipsis.value = false
    }
  }

  // lineClamp 多行截断..
  nextTick(() => {
    if (clampMode.value == 'line' && wrapper.value) {
      if (props.lineClamp > 1) {
        ellipsis.value = wrapper.value.scrollHeight > wrapper.value.clientHeight
      } else if (props.lineClamp === 1) {
        ellipsis.value = wrapper.value.scrollWidth > wrapper.value.clientWidth
      }
      content.value = wrapper.value?.textContent || ''
    }
  })

  return nodes
}

function getFirstNode(nodes: VNode[]): VNode {
  let node = nodes[0]
  if (Array.isArray(node.children)) {
    return getFirstNode(node.children as VNode[])
  }
  return node
}
</script>

<style lang="scss">
@use '../theme/vars.scss' as *;
.#{$cls-prefix}ellipsis {
  display: inline-block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 100%;
}

.#{$cls-prefix}ellipsis.__word-clamp {
  overflow: inherit;
  white-space: inherit;
  text-overflow: inherit;
}

.#{$cls-prefix}ellipsis.__line-clamp {
  display: -webkit-inline-box;
  width: 100%;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
  white-space: inherit;
}

.#{$cls-prefix}ellipsis-popper {
  max-width: 500px;
}
</style>

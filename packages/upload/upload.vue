<template>
  <ElUpload
    ref="elUpload"
    v-bind="$attrs"
    :file-list="modelValue"
    :class="[`${$CLS_PREFIX}-upload`, { 'limit-hide-trigger': isLimitHide }]"
    :list-type="listType"
    :limit="limit"
    :before-upload="beforeUploadHandler"
    :on-preview="onPreviewHandler"
    :on-exceed="onExceedHandler"
    :on-error="onErrorHandler"
  >
    <template v-if="$slots.trigger" #trigger>
      <slot name="trigger"></slot>
    </template>
    <template #tip>
      <slot name="tip">
        <div v-if="tip" class="el-upload__tip">{{ tip }}</div>
      </slot>
    </template>
    <template #default>
      <slot name="default">
        <template v-if="$attrs.drag === '' || $attrs.drag === true">
          <ElIcon class="el-icon--upload">
            <UploadFilled />
          </ElIcon>
          <div class="el-upload__text">
            {{ locale.drag }} <em>{{ locale.upload }}</em>
          </div>
        </template>
        <ElIcon v-else-if="listType == 'picture-card'">
          <Plus />
        </ElIcon>
        <ElButton v-else type="primary">{{ locale.upload }}</ElButton>
      </slot>
    </template>
  </ElUpload>
</template>

<script lang="ts">
import { $PREFIX } from '../utils/use-global-const'
export default { name: $PREFIX + 'Upload', inheritAttrs: false }
</script>

<script setup lang="ts">
import { ElMessageBox, ElMessage } from 'element-plus'
import { h, computed, ref, type VNode } from 'vue'
import { getFileTypeByUrl } from '../utils/utils'
import useLocale from '../utils/use-locale'
import { $CLS_PREFIX } from '../utils/use-global-const'

import type {
  UploadUserFile,
  UploadProps,
  UploadFile,
  UploadRawFile,
  messageType,
  UploadInstance,
  UploadStatus
} from 'element-plus'

interface Props extends /* @vue-ignore */ Partial<Omit<UploadProps, 'fileList'>> {
  modelValue: UploadProps['fileList']
  preview?: boolean
  message?: boolean
  limitHide?: boolean
  limitSize?: number
  tip?: string
  // el-upload
  limit?: UploadProps['limit']
  listType?: UploadProps['listType']
  onPreview?: UploadProps['onPreview']
  onError?: UploadProps['onError']
  onExceed?: UploadProps['onExceed']
  beforeUpload?: UploadProps['beforeUpload']
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: () => [],
  preview: true,
  message: true,
  listType: 'text'
})

const elUpload = ref<UploadInstance>()
const locale = useLocale({
  'zh-cn': {
    limitSize: '最大允许上传大小',
    limit: '最大允许上传个数',
    error: '文件上传失败',
    upload: '点击上传',
    drag: '将文件拖到此处，或'
  },
  en: {
    limitSize: 'Maximum allowed upload size',
    limit: 'Maximum number of uploads allowed',
    error: 'File upload failure',
    upload: 'Click to upload',
    drag: 'Drop file here or '
  }
})

const isLimitHide = computed(() => {
  return props.limitHide && props.limit !== undefined && props.modelValue.length >= props.limit
})

function onMessage(type: messageType, text: string) {
  if (props.message) {
    ElMessage[type](text)
  }
}

function beforeUploadHandler(file: UploadRawFile) {
  if (props.limitSize && file.size) {
    let kb = file.size / 1024
    if (kb > props.limitSize) {
      onMessage('warning', `${locale.value.limitSize}：${props.limitSize}kb`)
      return false
    }
  }
  if (props.beforeUpload) {
    return props.beforeUpload(file)
  }
  return true
}

function onExceedHandler(files: File[], uploadFiles: UploadUserFile[]) {
  onMessage('warning', `${locale.value.limit}${props.limit}`)
  if (props.onExceed) {
    return props.onExceed(files, uploadFiles)
  }
}

function onErrorHandler(err: Error, file: UploadFile, fileList: UploadFile[]) {
  onMessage('error', `${locale.value.error}`)
  if (props.onError) {
    return props.onError(err, file, fileList)
  }
}

function onPreviewHandler(file: UploadFile) {
  if (file.url && props.preview) {
    const fileUrl = file.url
    const type = getFileTypeByUrl(fileUrl)

    let message: VNode | null = null

    if (type == 'img') {
      message = h('img', {
        class: `${$CLS_PREFIX}-upload-preview-img`,
        src: fileUrl
      })
    } else if (type == 'video') {
      message = h('video', {
        class: `${$CLS_PREFIX}-upload-preview-video`,
        src: fileUrl,
        controls: true
      })
    } else if (type == 'audio') {
      message = h('audio', {
        class: `${$CLS_PREFIX}-upload-preview-audio`,
        src: fileUrl,
        controls: true
      })
    } else {
      message = h('p', null, '该文件不支持预览')
    }
    ElMessageBox({
      title: '',
      customClass: `${$CLS_PREFIX}-upload-preview-msgbox`,
      center: true,
      message,
      confirmButtonText: '下载',
      showConfirmButton: false
    }).then(() => {
      let a = document.createElement('a')
      a.href = fileUrl || ''
      a.download = file.name
      a.target = '_blank'
      a.click()
      a = null as any
    })
  }
  if (props.onPreview) {
    props.onPreview(file)
  }
}

function abort(file: UploadFile) {
  elUpload.value?.abort(file)
}
function submit() {
  elUpload.value?.submit()
}
function clearFiles(states: UploadStatus[]) {
  elUpload.value?.clearFiles(states)
}
function handleStart(rawFile: UploadRawFile) {
  elUpload.value?.handleStart(rawFile)
}
function handleRemove(file: UploadFile) {
  elUpload.value?.handleRemove(file)
}

defineExpose({ abort, submit, clearFiles, handleStart, handleRemove })
</script>

<style lang="scss">
@use '../theme/vars.scss' as *;
.#{$cls-prefix}upload {
  width: 100%;
}

/** 超出隐藏上传按钮 */
.#{$cls-prefix}upload.limit-hide-trigger .el-upload {
  display: none;
}

.#{$cls-prefix}upload.limit-hide-trigger .el-upload-list {
  margin-top: 0px;
}

/* 拖拽样式 */
.#{$cls-prefix}upload .el-upload-dragger {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 130px;
  width: 100%;
}

.#{$cls-prefix}upload .el-upload-dragger .el-icon-upload {
  font-size: 50px;
  margin: 0px;
}

.#{$cls-prefix}upload .el-upload-dragger .el-upload__text {
  font-size: 12px;
  line-height: 20px;
  padding: 0px 8px;
}

/* picture-card 拖拽样式 */
.#{$cls-prefix}upload .el-upload-list--picture-card .el-upload-dragger {
  border: 0px;
  height: 100%;
}

.#{$cls-prefix}upload .el-upload--picture-card .el-upload-dragger {
  border: 0px;
  height: 100%;
}

.#{$cls-prefix}upload .el-icon--close-tip {
  display: none !important;
}

/* 去掉过渡动画 */
.#{$cls-prefix}upload .el-upload-list__item {
  transition: inherit;
}

/* 预览弹窗 */
.el-message-box.#{$cls-prefix}upload-preview-msgbox {
  --el-messagebox-width: auto;
  width: auto;
  min-width: 300px;
  padding-bottom: 20px;
}

.#{$cls-prefix}upload-preview-msgbox .el-message-box__headerbtn {
  top: 10px;
}

.#{$cls-prefix}upload-preview-img {
  max-width: 1000px;
  max-height: 600px;
}

.#{$cls-prefix}upload-preview-video {
  max-width: 1000px;
  max-height: 600px;
}
</style>

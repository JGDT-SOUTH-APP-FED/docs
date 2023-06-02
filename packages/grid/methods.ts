import type { GridMethods, TableMethods, TableEditMethods, TableValidatorMethods } from 'vxe-table'

export const gridComponentMethodKeys: (
  | keyof GridMethods
  | keyof TableMethods
  | keyof TableEditMethods
  | keyof TableValidatorMethods
  | 'setFilter'
)[] =
  // vxe类型定义缺失
  [
    // vxe-grid 部分
    'dispatchEvent',
    'commitProxy',
    'getFormItems',
    'getPendingRecords',
    'zoom',
    'isMaximized',
    'maximize',
    'revert',
    'getProxyInfo',

    // vxe-table和vxe-grid公共部分
    'clearAll',
    'syncData',
    'updateData',
    'loadData',
    'reloadData',
    'reloadRow',
    'loadColumn',
    'reloadColumn',
    'getRowNode',
    'getColumnNode',
    'getRowIndex',
    'getVTRowIndex',
    'getVMRowIndex',
    'getColumnIndex',
    'getVTColumnIndex',
    'getVMColumnIndex',
    'createData',
    'createRow',
    'revertData',
    'clearData',
    'isInsertByRow',
    'isUpdateByRow',
    'getColumns',
    'getColumnById',
    'getColumnByField',
    'getTableColumn',
    'getData',
    'getCheckboxRecords',
    'getParentRow',
    'getRowSeq',
    'getRowById',
    'getRowid',
    'getTableData',
    'hideColumn',
    'showColumn',
    'resetColumn',
    'refreshColumn',
    'refreshScroll',
    'recalculate',
    'closeTooltip',
    'isAllCheckboxChecked',
    'isAllCheckboxIndeterminate',
    'getCheckboxIndeterminateRecords',
    'setCheckboxRow',
    'isCheckedByCheckboxRow',
    'isIndeterminateByCheckboxRow',
    'toggleCheckboxRow',
    'setAllCheckboxRow',
    'getRadioReserveRecord',
    'clearRadioReserve',
    'getCheckboxReserveRecords',
    'clearCheckboxReserve',
    'toggleAllCheckboxRow',
    'clearCheckboxRow',
    'setCurrentRow',
    'isCheckedByRadioRow',
    'setRadioRow',
    'clearCurrentRow',
    'clearRadioRow',
    'getCurrentRecord',
    'getRadioRecord',
    'getCurrentColumn',
    'setCurrentColumn',
    'clearCurrentColumn',
    'sort',
    'clearSort',
    'isSort',
    'getSortColumns',
    'closeFilter',
    'isFilter',
    'isRowExpandLoaded',
    'clearRowExpandLoaded',
    'reloadRowExpand',
    'reloadRowExpand',
    'toggleRowExpand',
    'setAllRowExpand',
    'setRowExpand',
    'isExpandByRow',
    'clearRowExpand',
    'clearRowExpandReserve',
    'getRowExpandRecords',
    'getTreeExpandRecords',
    'isTreeExpandLoaded',
    'clearTreeExpandLoaded',
    'reloadTreeExpand',
    'reloadTreeChilds',
    'toggleTreeExpand',
    'setAllTreeExpand',
    'setTreeExpand',
    'isTreeExpandByRow',
    'clearTreeExpand',
    'clearTreeExpandReserve',
    'getScroll',
    'scrollTo',
    'scrollToRow',
    'scrollToColumn',
    'clearScroll',
    'updateFooter',
    'updateStatus',
    'setMergeCells',
    'removeInsertRow',
    'removeMergeCells',
    'getMergeCells',
    'clearMergeCells',
    'setMergeFooterItems',
    'removeMergeFooterItems',
    'getMergeFooterItems',
    'clearMergeFooterItems',
    'openTooltip',
    'focus',
    'blur',
    'connect',

    // vxe-table-edit部分
    'insert',
    'insertAt',
    'remove',
    'removeCheckboxRow',
    'removeRadioRow',
    'removeCurrentRow',
    'getRecordset',
    'getInsertRecords',
    'getRemoveRecords',
    'getUpdateRecords',
    'getEditRecord',
    'getSelectedCell',
    'clearSelected',
    'isEditByRow',
    'setEditRow',
    'setEditCell',
    'setSelectCell',

    // vxe-table-validator
    'clearValidate',
    'fullValidate',
    'validate',

    //... 如有缺少在此处追加
    // xxx
    'setFilter'
  ]
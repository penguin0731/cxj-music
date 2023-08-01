<template>
  <div>
    <!-- <cxj-table :data="tableData">
      <cxj-table-column prop="id" label="id"></cxj-table-column>
      <cxj-table-column prop="name" label="名字"></cxj-table-column>
      <cxj-table-column prop="age" label="年龄"></cxj-table-column>
      <cxj-table-column prop="gender" label="性别"></cxj-table-column>
      <cxj-table-column prop="address" label="地址"></cxj-table-column>
      <cxj-table-column label="操作" width="300">
        <template #default="scope">
          <b>{{ scope.row.id }}+{{ scope.row.name }}={{ scope.$index }}</b>
        </template>
      </cxj-table-column>
    </cxj-table> -->
  </div>
</template>

<script setup>
import CxjTable from '@/baseComponents/cxj-table/cxj-table.vue';
import CxjTableColumn from '@/baseComponents/cxj-table/cxj-table-column';
import { ref } from 'vue';

const tableData = ref([
  {
    id: 1,
    name: 'aa',
    age: 12,
    gender: '男',
    address: 'xxxxx'
  },
  {
    id: 2,
    name: 'bb',
    age: 12,
    gender: '女',
    address: 'xxxxx'
  }
]);
</script>

<style lang="scss" scoped></style>

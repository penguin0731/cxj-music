import { computed, toRefs } from 'vue'
export default function (props, ctx) {
  const { dataSource } = toRefs(props);

  const index_dataSource = computed(() => {
    return dataSource.value.map((item, index) => {
      return {
        ...item,
        c_index: Number(index) + 1
      }
    })
  })

  /**
   * 深度读取键值
   * @param {*} item dataSource中的对象
   * @param {*} prop 需要读取的键值，可深度读取，如obj.a[0].b
   */
  const handleProp = (item, prop) => {
    console.log(prop)
    if (prop.includes('.')) {
      let props = prop.split('.');
      let value = props.reduce((obj, curProp) => {
        if (obj.hasOwnProperty(curProp)) {
          return obj[curProp]
        } else {
          let tempObj = obj;
          let matchArr = curProp.match(/\[.*?\]/g); // 匹配[]中的内容
          if (!matchArr) return curProp;
          let matchArrLen = matchArr.length;
          for (let i = 0; i < matchArrLen; i++) {
            let matchItem = matchArr[i];
            let matchKey = matchItem.replace('[', '').replace(']', '');
            tempObj = tempObj[matchKey];
          }
          return tempObj;
        }
      }, item);
      return value;
    } else {
      return item[prop];
    }
  }

  return {
    index_dataSource,
    handleProp
  }
}
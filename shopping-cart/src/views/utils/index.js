 const quchong = (arr) => {
    //  第一步，去重
    var hash = [];
    for (var i = 0; i < arr.length; i++) {
      for (var j = i + 1; j < arr.length; j++) {
        if (arr[i].id === arr[j].id) {
          ++i;
          j = i;
        }
      }
      arr[i].num = 0;
      hash.push(arr[i]);
    }
    // 第二步，统计重复个数
    hash.forEach(item => {
      arr.forEach(dd => {
        if (item.id === dd.id) {
          item.num++
        }
      })
    });
    return hash;
 }
 const uniqueFunc = (arr, id) => {
    const res = new Map();
    return arr.filter((item) => !res.has(item[id]) && res.set(item[id], 1))
  }
export {
    quchong,
    uniqueFunc
 }
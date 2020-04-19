function swap (array, i, j) {
  array[i] = array[i] + array[j];
  array[j] = array[i] - array[j];
  array[i] = array[i] - array[j];
}

function quickSort (array, start, end) {
  if (start >= end) {
    // 越界终止
    return array;
  }

  const x = array[start]; // 基准
  let i = start, j = end;
  // 左侧 <= 基准值 < 右侧
  while (i < j) {
    while (i < j && x < array[j]) {
      // 从后往前找到比x小的数
      j--;
    }
    i !== j && swap(array, i, j);
    while (i < j && array[i] <= x) {
      // 从前往后找到比x大的数
      i++;
    }
    i !== j && swap(array, i, j);
  }
  quickSort(array, start, i - 1);
  quickSort(array, i + 1, end);
  return array;
}

const array = [21, 32, 43, 98, 54, 45, 23, 4, 66, 86];

quickSort(array, 0, array.length - 1);
console.log(array);

export const formatByteSize = (bytes: number) => {
  if (bytes < 1024) return bytes + ' bytes';
  else if (bytes < 1048576) return (bytes / 1024).toFixed(3) + ' KB';
  else if (bytes < 1073741824) return (bytes / 1048576).toFixed(3) + ' MB';
  else return (bytes / 1073741824).toFixed(3) + ' GB';
};

export const roughSizeOfObject = (object: unknown) => {
  const objectList = [];
  const stack = [object];
  let bytes = 0;

  while (stack.length) {
    const value = stack.pop();

    if (typeof value === 'boolean') {
      bytes += 4;
    } else if (typeof value === 'string') {
      bytes += value.length * 2;
    } else if (typeof value === 'number') {
      bytes += 8;
    } else if (
      value !== null &&
      typeof value === 'object' &&
      objectList.indexOf(value) === -1
    ) {
      objectList.push(value);
      let i;
      for (i in value) {
        stack.push((value as Record<string, unknown>)[i]);
      }
    }
  }

  return formatByteSize(bytes);
};

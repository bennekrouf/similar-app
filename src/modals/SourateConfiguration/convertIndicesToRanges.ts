export function convertIndicesToRanges(indices: number[]) {
    // Sort indices to ensure they are in order
    indices.sort((a, b) => a - b);
  
    const ranges = [];
    let rangeStart = indices[0];
    let prev = indices[0];
  
    for (let i = 1; i < indices.length; i++) {
      // If current index is not consecutive, end the current range
      if (indices[i] !== prev + 1) {
        ranges.push(rangeStart === prev ? `${rangeStart}` : `${rangeStart}-${prev}`);
        rangeStart = indices[i];
      }
      prev = indices[i];
    }
  
    // Add the last range
    ranges.push(rangeStart === prev ? `${rangeStart}` : `${rangeStart}-${prev}`);
  
    return ranges;
  }
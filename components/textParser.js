const rules = [
  {delimiter: '\\(مشترك\\)', targetVariable: 'isCommon'},
  {
    delimiter: '\\(other_delimiter\\)',
    targetVariable: 'otherVariable',
    additionalLogic: true,
  },
];

export function parseText(text: string | any[]) {
  let parts = [];
  let start = 0;

  for (const rule of rules) {
    const {delimiter, targetVariable, additionalLogic} = rule;
    const regex = new RegExp(`${delimiter}(.*?)${delimiter}`, 'g');
    let match;

    while ((match = regex.exec(text)) !== null) {
      if (start < match.index) {
        parts.push({text: text.slice(start, match.index)});
      }

      const part = {text: match[1]};
      part[targetVariable] = true;

      if (additionalLogic) {
        // Additional logic specific to the rule
        // Set other properties based on the additional logic
      }

      parts.push(part);
      start = regex.lastIndex;
    }
  }

  if (start < text.length) {
    parts.push({text: text.slice(start)});
  }

  return parts;
}

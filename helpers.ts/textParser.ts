interface Rule {
  delimiter: string;
  targetVariable: string;
  additionalLogic?: boolean;
}

const rules: Rule[] = [
  {delimiter: '\\(مشترك\\)', targetVariable: 'isCommon'},
  {
    delimiter: '\\(مختلف\\)',
    targetVariable: 'isDifferent',
    additionalLogic: true,
  },
];

export function parseText(text: string | any[]) {
  let parts: {text: string; [key: string]: any}[] = [];
  let start = 0;

  for (const rule of rules) {
    const {delimiter, targetVariable, additionalLogic} = rule;
    const regex = new RegExp(`${delimiter}(.*?)${delimiter}`, 'g');
    let match;

    while ((match = regex.exec(text)) !== null) {
      if (start < match.index) {
        parts.push({text: text.slice(start, match.index)});
      }

      const part: {text: string; [key: string]: any} = {
        text: match[1],
        [targetVariable]: true, // Set the property dynamically using computed property names
      };

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

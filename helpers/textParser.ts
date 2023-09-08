interface Rule {
  delimiter: string;
  targetVariable: string;
  additionalLogic?: boolean;
}

const rules: Rule[] = [
  {delimiter: '\\((.*?)\\)', targetVariable: 'isCommon'},
  {
    delimiter: '\\[(.*?)\\]',
    targetVariable: 'isDifferent',
    additionalLogic: true,
  },
];

export function parseText(text: string, isOpposite: boolean | false) {
  if (!text) {
    return [];
  }
  let parts: {text: string; [key: string]: any}[] = [];
  let start = 0;

  for (const rule of rules) {
    const {delimiter, targetVariable, additionalLogic} = rule;
    const regex = new RegExp(`${delimiter}`, 'g');
    let match;

    while ((match = regex.exec(text)) !== null) {
      if (start < match.index) {
        parts.push({text: text.slice(start, match.index)});
      }

      const part: {text: string; [key: string]: any} = {
        text: match[1],
        [targetVariable]: true,
      };

      if (isOpposite) {
        part.isOpposite = true;
      }

      if (additionalLogic) {
        // Additional logic specific to the rule
        // Set other properties based on the additional logic
      }

      parts.push(part);
      start = regex.lastIndex;
    }
  }
  text = text.replace(/[\[\]]/g, "");

  if (start < text.length) {
    parts.push({text: text.slice(start)});
  }

  return parts;
}

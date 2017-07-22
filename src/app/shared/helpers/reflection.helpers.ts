export function getThisPropertyName(expression: () => any): string {
  const thisExpressionRegEx = /^\s*function\s*\(\)\s*{\s*(?:"use strict";)?\s*return\s+[a-z_]+.((?:(?:[a-z]+))+);?\s*}\s*$/i;

  const funcStr = expression.toString().replace(/\n/g, ' ');
  const funcStrMatch = funcStr.match(thisExpressionRegEx);

  if (!funcStrMatch) {
    throw new Error(`'${funcStr}' is not a valid this expression.`);
  }

  return funcStrMatch[1];
}

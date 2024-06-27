import { Analysis } from '@/types';

/**
 * Returns an array of label names from an Analysis object.
 *
 * @param {Analysis} analysis - The Analysis object containing labels.
 * @return {string[]} An array of label names.
 */
export function getLablesNames(analysis: Analysis): string[] {
  const labelNames: string[] = [];

  const data = analysis.labels;

  for (const key in data) {
    labelNames.push(data[key].name);
  }

  return labelNames;
}

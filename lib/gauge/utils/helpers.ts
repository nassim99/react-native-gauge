type validateValueType = (v: number, min?: number, max?: number) => number;

export const validateValue: validateValueType = (value, min = 0, max = 100) => {
  const val = value > max ? max : value < min ? min : value;
  return val;
};

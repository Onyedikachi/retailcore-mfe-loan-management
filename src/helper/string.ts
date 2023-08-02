export function capitalizeString(str: string) {
   return str.charAt(0).toUpperCase() + str.slice(1);
}

export const compareString = (value: string, secondValue: string) => {
   return value.toLowerCase() === secondValue.toLowerCase();
};

export const stringContains = (value: string, secondValue: string) => {
   return value.toLowerCase().includes(secondValue.toLowerCase());
};

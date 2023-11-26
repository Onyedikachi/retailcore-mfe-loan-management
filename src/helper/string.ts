export function capitalizeString(str: string) {
   return str.charAt(0)?.toUpperCase() + str.slice(1);
}

export const compareString = (value: string, secondValue: string) => {
   return value?.toLowerCase() === secondValue.toLowerCase();
};

export const stringContains = (value: string, secondValue: string) => {
   return value?.toLowerCase()?.includes(secondValue.toLowerCase());
};

export const transformText = (text?: string) => {
   const parts = text?.split('_');
   const capitalizedParts = parts?.map((part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase());
   const transformedText = capitalizedParts?.join('-');
   return transformedText;
};

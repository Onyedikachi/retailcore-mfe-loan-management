import * as Yup from 'yup';

export const InputFieldNames = {
   TITLE: 'title',

   DESCRIPTION: 'description',
   PERIODICITY_NUM_START: 'period_from',
   PERIODICITY_NUM_END: 'period_to',
   PERIODICITY_PERIOD: 'period',

   SET_FORMAT: 'is_doc_required',
   ADD_FORMAT: 'accepted_format',
} as const;

export const format = ['PDF', 'PNG', 'JPEG', 'XML', 'FIG', 'MS Word', 'PSD'];

export type InitialValues = typeof initialValues;
export const initialValues = () => ({
   [InputFieldNames.TITLE]: '',

   [InputFieldNames.DESCRIPTION]: '',

   [InputFieldNames.PERIODICITY_NUM_START]: '',

   [InputFieldNames.PERIODICITY_NUM_END]: '',

   [InputFieldNames.PERIODICITY_PERIOD]: '',

   [InputFieldNames.SET_FORMAT]: false,

   [InputFieldNames.ADD_FORMAT]: '',
});

export const validator = () =>
   Yup.object({
      [InputFieldNames.TITLE]: Yup.string().required('Enter requirement title'),

      [InputFieldNames.DESCRIPTION]: Yup.string()

         .required('Enter description for this requirement')

         .max(160, 'Should be less than 160 characters'),

      [InputFieldNames.PERIODICITY_NUM_START]: Yup.string().test(
         InputFieldNames.PERIODICITY_NUM_START,

         'Must be greater 0',

         function (value) {
            if (value) {
               return Number(value) > 0;
            }
         }
      ),

      [InputFieldNames.PERIODICITY_NUM_END]: Yup.string()

         .when(InputFieldNames.PERIODICITY_NUM_START, (periodicityNumStart, field) =>
            periodicityNumStart ? field.required('Field is required') : field
         )

         .test(InputFieldNames.PERIODICITY_NUM_END, 'Must be greater 0', function (value) {
            if (value) {
               return Number(value) > 0;
            }
         })

         .test(
            InputFieldNames.PERIODICITY_NUM_END,

            'Must be greater than start periodicity',

            function (value) {
               if (value) {
                  const { [InputFieldNames.PERIODICITY_NUM_START]: periodicityNumStart } = this.parent;

                  return Number(value) > Number(periodicityNumStart);
               }
            }
         ),

      [InputFieldNames.PERIODICITY_PERIOD]: Yup.string(),

      [InputFieldNames.SET_FORMAT]: Yup.boolean(),

      [InputFieldNames.ADD_FORMAT]: Yup.string().when(InputFieldNames.SET_FORMAT, (setFormat, field) =>
         setFormat ? field.required('Add at least one document format') : field
      ),
   });

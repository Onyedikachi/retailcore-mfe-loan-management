/* eslint-disable camelcase */
import { ObjectAny } from '@app/@types';
import * as Yup from 'yup';

export const InputFieldNames = {
   PERIODICITY_NUM_START: 'period_from',
   PERIODICITY_NUM_END: 'period_to',
   PERIODICITY_PERIOD: 'period',

   SET_FORMAT: 'is_doc_required',
   ADD_FORMAT: 'accepted_format',
} as const;

export const initialValues = (requirements: ObjectAny[]) => ({
   [fieldName]: requirements.map((item: ObjectAny) => ({
      [InputFieldNames.PERIODICITY_NUM_START]: item[InputFieldNames.PERIODICITY_NUM_START] ?? 0,
      [InputFieldNames.PERIODICITY_NUM_END]: item[InputFieldNames.PERIODICITY_NUM_END] ?? item ?? 0,
      [InputFieldNames.PERIODICITY_PERIOD]: item[InputFieldNames.PERIODICITY_PERIOD] ?? '',
      [InputFieldNames.SET_FORMAT]: item[InputFieldNames.SET_FORMAT] ?? false,
      [InputFieldNames.ADD_FORMAT]: item[InputFieldNames.ADD_FORMAT] ?? '',
   })),
});
export const fieldName = 'otherEligibiltyCriteria';
export const validator = () =>
   Yup.object().shape({
      [fieldName]: Yup.array()
         .of(
            Yup.object().shape({
               [InputFieldNames.PERIODICITY_NUM_START]: Yup.number().test(
                  InputFieldNames.PERIODICITY_NUM_START,
                  'Must be greater 0',
                  function (value) {
                     if (value) return value > 0;
                  }
               ),
               [InputFieldNames.PERIODICITY_NUM_END]: Yup.number()
                  .when(InputFieldNames.PERIODICITY_NUM_START, (periodicityNumStart, field) =>
                     periodicityNumStart ? field.required('Field is required') : field
                  )
                  .test(InputFieldNames.PERIODICITY_NUM_END, 'Must be greater 0', function (value) {
                     if (value) return value > 0;
                  })
                  .test(
                     InputFieldNames.PERIODICITY_NUM_END,
                     'Must be greater than start periodicity',
                     function (value) {
                        if (value) {
                           const { [InputFieldNames.PERIODICITY_NUM_START]: periodicityNumStart } =
                              this.parent;
                           return Number(value) > Number(periodicityNumStart);
                        }
                     }
                  ),
               [InputFieldNames.PERIODICITY_PERIOD]: Yup.string(),
               [InputFieldNames.SET_FORMAT]: Yup.boolean(),
               [InputFieldNames.ADD_FORMAT]: Yup.string().when(
                  InputFieldNames.SET_FORMAT,
                  (setFormat, field) =>
                     setFormat ? field.required('Add at least one document format') : field
               ),
            })
         )
         .required('Configure all selected requirements as required'),
   });

// // /* eslint-disable camelcase */
// // import { ObjectAny } from '@app/@types';
// // import { CommonFormFieldNames } from '@app/constants';
// // import { capitalizeString } from '@app/helper/string';
// // import * as Yup from 'yup';

// export const InputFieldNames = {
//    PERIODICITY_NUM_START: 'period_from',
//    PERIODICITY_NUM_END: 'period_to',
//    PERIODICITY_PERIOD: 'period',

//    SET_FORMAT: 'is_doc_required',
//    ADD_FORMAT: 'accepted_format',
// } as const;

// export const initialValues = (requirements: ObjectAny[]) => ({
//    [CommonFormFieldNames.OTHER_ELIGIBILITY_REQUIREMNTS]: requirements.map((item: ObjectAny) => {
//       return {
//          [InputFieldNames.PERIODICITY_NUM_START]: item[InputFieldNames.PERIODICITY_NUM_START] ?? 0,
//          [InputFieldNames.PERIODICITY_NUM_END]: item[InputFieldNames.PERIODICITY_NUM_END] ?? item ?? 0,
//          [InputFieldNames.PERIODICITY_PERIOD]:
//             capitalizeString(item[InputFieldNames.PERIODICITY_PERIOD]) ?? '',
//          [InputFieldNames.SET_FORMAT]: item[InputFieldNames.SET_FORMAT] ?? false,
//          [InputFieldNames.ADD_FORMAT]: item[InputFieldNames.ADD_FORMAT] ?? '',
//       };
//    }),
// });
// export const fieldName = 'otherEligibiltyCriteria';

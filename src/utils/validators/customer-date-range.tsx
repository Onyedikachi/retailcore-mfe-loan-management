import * as Yup from 'yup';

export const Fields = { START_DATE: 'startDate', END_DATE: 'endDate' } as const;

export const initialValues = { [Fields.START_DATE]: '', [Fields.END_DATE]: '' };

export const validationSchema = Yup.object().shape({
   startDate: Yup.string().required('Start Date is required'),
   endDate: Yup.string().required('End Date is required'),
});

export type FormValues = typeof initialValues;

import * as Yup from 'yup';

export const Fields = { ROUTE_TO: 'routeTo', REASON: 'reason' } as const;

export const initialValues = { [Fields.ROUTE_TO]: '', [Fields.REASON]: '' };

export const validationSchema = Yup.object().shape({
   [Fields.REASON]: Yup.string().required('Provide a reason for rejection'),
   [Fields.ROUTE_TO]: Yup.string(),
});

export type FormValues = typeof initialValues;

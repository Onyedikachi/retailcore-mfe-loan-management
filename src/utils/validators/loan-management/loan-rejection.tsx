import * as Yup from 'yup';

export const Fields = { ROUTE_TO: 'routeTo', REASON: 'reason' } as const;

export const initialValues = { [Fields.ROUTE_TO]: '', [Fields.ROUTE_TO]: '' };

export const validationSchema = Yup.object().shape({
   [Fields.REASON]: Yup.string().required('Provide a reason for rejection'),
   [Fields.ROUTE_TO]: Yup.string().required('Select who to route request to'),
});

export type FormValues = typeof initialValues;
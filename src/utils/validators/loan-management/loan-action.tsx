import * as Yup from 'yup';

export const Fields = { REASON: 'reason', DOC: 'doc', NOTIFY: 'notify' } as const;

export const initialValues = { [Fields.REASON]: '', [Fields.DOC]: '', [Fields.NOTIFY]: false };

export const validationSchema = Yup.object().shape({
   [Fields.REASON]: Yup.string().required('Provide a reason for this action'),
   [Fields.DOC]: Yup.mixed().required('Provide supporting document'),
   [Fields.NOTIFY]: Yup.boolean(),
});

export type FormValues = typeof initialValues;

import * as Yup from 'yup';

export const validationSchema = Yup.object().shape({
  city: Yup.string()
    .matches(
      /^[a-zA-Zа-яА-Я]+(?:[-\s]?[a-zA-Zа-яА-Я]+)*,\s*[a-zA-Zа-яА-Я'’\s-]+$/,
      'Should be "City, Region" separated by comma, only letters can be accepted'
    )
    .min(3, 'City should have at least 3 characters')
    .required('City is required'),
});
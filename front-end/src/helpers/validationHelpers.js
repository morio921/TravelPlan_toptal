import * as Yup from 'yup';

export const SigninSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email')
    .required('This field is required'),
  password: Yup.string()
    .required('This field is required'),
});

export const UserAddSchema = Yup.object().shape({
  firstName: Yup.string()
    .required('This field is required'),
  lastName: Yup.string()
    .required('This field is required'),
  email: Yup.string()
    .email('Invalid email')
    .required('This field is required'),
  password: Yup.string()
    .required('This field is required'),
  confirm_password: Yup.string()
    .test('passwords-match', 'Passwords must match', function(value) {
      return this.parent.password === value;
    })
    .required('This field is required'),
});

export const UserEditSchema = Yup.object().shape({
  firstName: Yup.string(),
  lastName: Yup.string(),
  email: Yup.string()
    .email('Invalid email'),
  password: Yup.string(),
  confirm_password: Yup.string()
    .test('passwords-match', 'Passwords must match', function(value) {
      return this.parent.password === value;
    }),
});

export const RecordEditSchema = Yup.object().shape({
  destination: Yup.string()
    .required('This field is required'),
  startDate: Yup.date()
    .required('This field is required'),
  endDate: Yup.date()
    .required('This field is required')
    .test('date-compare', 'End date must be later than start date', function(value) {
      return this.parent.startDate <= value;
    }),
  comment: Yup.string()
    .required('This field is required'),
});

export const RecordFilterSchema = Yup.object().shape({
  userName: Yup.string(),
  fromDate: Yup.date(),
  toDate: Yup.date()
    .test('date-compare', 'End date must be later than state date', function(value) {
      if(this.parent.fromDate && value)
        return this.parent.fromDate <= value;
      return true;
    })
});

export const signinInitialValues = {
  email: '',
  password: '',
};

export const signupInitialValues = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirm_password: ''
};

export const userInitialValues = {
  firstName: '',
  lastName: '',
  email: '',
  role: 'user',
  password: '',
  confirm_password: ''
};

export const recordInitialValues = {
  destination: '',
  startDate: '',
  endDate: '',
  comment: ''
};

export const filterInitialValues = {
  userName: '',
  fromDate: '',
  toDate: '',
};

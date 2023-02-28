import React, { useState } from 'react';
import { Formik, Form } from 'formik';
import { useUpdateUserMutation } from 'redux/api/userApi';
import { validationSchema } from './validation';
import { FieldWrapper } from '../UserDataItem.styled';
import UserUpdateButton from 'components/Ui-Kit/UserupdateButton/UserUpdateButton';
import UserInput from 'components/Ui-Kit/UserInput';
import Loader from 'components/Loader';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { selectUserState } from 'redux/user/userSelectors';
import { toast } from 'react-toastify';

const UserEmail = ({ isUpdating, setIsUpdating }) => {
  const [isDisabled, setIsDisabled] = useState(true);
  const [updateUser, { isLoading }] = useUpdateUserMutation();
  const user = useSelector(selectUserState);
  const initialValues = { email: user?.email || '' };

  const handleClick = (values, actions) => {
    if (isDisabled) {
      setIsDisabled(false);
      setIsUpdating(true);
      return;
    }
    if (!values.email) return;
    setIsDisabled(true);
    setIsUpdating(false);
  };

  const handleSubmit = async (values, actions) => {
    if (!isDisabled) {
      return;
    }

    if (values.email === user.email) return;

    // create formData
    const data = new FormData();
    data.append('email', values.email);
    const { data: response } = await updateUser(data);
    console.log('response', response);
    if (response.code === 200)
      toast.info('Email has been successfully updated');
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting, values, errors }) => (
        <Form>
          <FieldWrapper>
            <UserInput
              label="Email"
              name="email"
              type="email"
              disabled={isDisabled}
              placeholder={user?.email || ''}
            />
            <UserUpdateButton
              type="submit"
              disabled={isUpdating && isDisabled}
              isInputDisabled={isDisabled}
              onClick={() => {
                if (!values.email) {
                  values.email = user.email;
                  handleClick(values);
                }
                if (errors.email) return;
                handleClick(values);
              }}
            />
            {isLoading && <Loader />}
          </FieldWrapper>
        </Form>
      )}
    </Formik>
  );
};

UserEmail.propTypes = {
  isUpdating: PropTypes.bool,
  setIsUpdating: PropTypes.func,
};

export default UserEmail;

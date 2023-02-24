import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { selectIsAuthState } from 'redux/user/userSelectors';
import { selectStatusFilter } from 'redux/filter/filterSelectors';
import { useGetNoticeByCategoryQuery } from 'redux/api/noticesApi';
import Loader from 'components/Loader';
import NoticesCategoryList from 'components/NoticesCategoryList';
import Section from 'components/Section';
import TitlePage from 'components/Ui-Kit/TitlePage';
import FindPetFilter from 'components/FindPetFilter';
import SearchForm from 'components/Ui-Kit/SearchForm';
import { NavContainer } from './Notices.styled';
import AddPetButton from 'components/AddPetButton';
import ModalComponent from 'components/Modal';
import AddNoticeFormHeader from 'components/AddNoticeForm';
import NotificationAddNotice from 'components/NotificationAddNotice';
import AddPetForm from 'components/AddNoticeForm/AddPetForm';
import { AnimatePresence } from 'framer-motion';

const Notices = () => {
  const [isOpen, setIsOpen] = useState(false);

  const isAuth = useSelector(selectIsAuthState);
  const handleClick = () => {
    if (isAuth) {
      setIsOpen(true);
      document.body.classList.add('modal-open');
    } else {
      toast('You have to register or login to add Pet');
    }
  };
  const closeModal = () => {
    setIsOpen(false);
    document.body.classList.remove('modal-open');
  };

  const category = useSelector(selectStatusFilter);

  const {
    data: notices,
    error,
    isLoading,
    isFetching,
  } = useGetNoticeByCategoryQuery(category, { skip: !category });

  if (!notices) return;
  const showNotices = notices && !error && !isFetching;

  return (
    <Section>
      <TitlePage name={'Find your favorite pet'} />

      <SearchForm />

      <NavContainer>
        <FindPetFilter />
        <AddPetButton handleClick={handleClick} />
      </NavContainer>

      {isFetching && <Loader />}
      {showNotices && <NoticesCategoryList notices={notices} />}

      <AnimatePresence>
        {isOpen && (
          <ModalComponent closeModal={closeModal} key="popUp">
            <AddNoticeFormHeader />
            <AddPetForm onClose={closeModal} />
          </ModalComponent>
        )}
      </AnimatePresence>
    </Section>
  );
};

export default Notices;

import React, { useEffect, useState } from 'react';
import { Container, Title, Box, List } from './UserPetsList.styled';
import { useGetCurrentUserQuery } from 'redux/api/userApi';
import UserAddPetForm from 'components/UserAddPetForm';
import UserPetsListItem from './UserPetsListItem';
import Modal from 'components/Modal';
import { AnimatePresence } from 'framer-motion';
import AddPetButton from 'components/AddPetButton';

const UserPetsList = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [deletePetMutation] = petsApi.useDeletePetMutation();
  const { data: currentUserData, refetch: refetchCurrentUser } =
    useGetCurrentUserQuery();
  let dataPets = currentUserData ? currentUserData : [];

  useEffect(() => {
    if (dataPets) {
      setPets(dataPets.pets);
    }
  }, [dataPets]);

  const handleDelete = async petId => {
    window.confirm('Delete the pet?');
    try {
      const response = await deletePetMutation(petId);
      await refetchCurrentUser();
    } catch (error) {
      console.log(error);
    }
  };

  const handleIsOpen = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    document.body.classList.remove('modal-open');
  };

  return (
    <Container>
      <Box>
        <Title>My pets:</Title>
        <AddPetButton handleClick={handleIsOpen} />
      </Box>
      {data?.pets && (
        <List>
          {data?.pets.map(pet => {
            return <UserPetsListItem key={pet._id} pet={pet} />;
          })}
        </List>
      )}
      <AnimatePresence>
        {isOpen && (
          <Modal closeModal={closeModal} key="popUp">
            <UserAddPetForm closeModal={closeModal} />
          </Modal>
        )}
      </AnimatePresence>
    </Container>
  );
};

export default UserPetsList;

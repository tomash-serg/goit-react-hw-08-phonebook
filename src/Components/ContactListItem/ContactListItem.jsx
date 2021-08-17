//Styles
import css from './ContactListItem.module.css';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
//Components
import { GoTrashcan } from 'react-icons/go';
import Loader from 'react-loader-spinner';
//Utils
import { useDeleteContactMutation } from 'redux/contactApiServise';
import toast from 'react-hot-toast';
import PropTypes from 'prop-types';

export const ContactListItem = ({ contact }) => {
  const [deleteContact, { isLoading }] = useDeleteContactMutation();

  const hangleContactDelete = id => () => {
    return deleteContact(id)
      .then(
        toast.success('Удалено', {
          icon: GoTrashcan({ color: 'rgb(245, 210, 13)', size: '20' }),
        }),
      )
      .catch(error =>
        toast.error(`Возникла ошибка ${error.status}, сообщение ${error.data}`),
      );
  };

  return (
    <li className={css.listItem}>
      <span>{contact.name}</span>
      <span>{contact.tel}</span>
      <button
        className={isLoading ? css.buttonFetching : css.button}
        type="button"
        onClick={hangleContactDelete(contact.id)}
        disabled={isLoading}
      >
        {isLoading ? (
          <Loader type="TailSpin" color="#fff" height={12} width={12} />
        ) : (
          <>
            delete <GoTrashcan size="16" />
          </>
        )}
      </button>
    </li>
  );
};

ContactListItem.propTypes = {
  contact: PropTypes.shape({
    name: PropTypes.string.isRequired,
    tel: PropTypes.string.isRequired,
    id: PropTypes.isRequired,
  }),
};

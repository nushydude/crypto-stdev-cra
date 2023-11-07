import { Link } from 'react-router-dom';
import { routes } from '../config/routes';
import { MdAccountCircle } from 'react-icons/md';

type Props = {
  onClick?: () => void;
  size?: number;
};

const ProfileLink = ({ onClick, size = 44 }: Props) => {
  return (
    <Link
      to={routes.PROFILE}
      className="no-underline"
      onClick={(e) => {
        e.stopPropagation();
        onClick && onClick();
      }}
    >
      <MdAccountCircle size={size} />
    </Link>
  );
};

export default ProfileLink;

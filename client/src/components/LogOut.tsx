
import Cookies from 'universal-cookie';
import { useNavigate } from 'react-router-dom';

export default function LogOutButton() {
  const cookies = new Cookies();
  const navigate = useNavigate();

  const handleLogOut = (event: any) => {
    event.preventDefault();

    cookies.remove('TOKEN');
    navigate('/login');
  };

  return (
    <button onClick={handleLogOut}>
      Log Out
    </button>
  );
};

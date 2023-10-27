import { useNavigate } from 'react-router-dom';
import { useUserContext } from '../../context/userContext/useUser';

export default function RedirectButton({ path, name, clearToken }: { path: string, name: string, clearToken: boolean }) {
  const navigate = useNavigate();
  const { setUser } = useUserContext();

  function clearTokenData () {
    const emptyUser = {
      userId: null,
      accType: null,
      token: null
    }
    setUser(emptyUser);
    localStorage.removeItem('@token');

  }

  function redirect (path: string) {

    if (clearToken) clearTokenData();

    return navigate(path);
  }

  return (
    <div>
        <button
          onClick = {() => redirect(path)}
          className='redirect-button'
        >
          {name}
        </button>
    </div>
  )
}

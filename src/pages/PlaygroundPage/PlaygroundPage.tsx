import { useContext } from 'react';
import { UserContext } from '../../context/user';
import { Link } from 'react-router-dom';
import { routes } from '../../config/routes';

const PlaygroundPage = () => {
  const {
    fetchAccessToken,
    isLoggedIn,
    // login,
    // removeUser,
    // setAccessToken,
    // setRefreshToken,
    refreshToken,
    accessToken,
  } = useContext(UserContext);

  return (
    <div className="text-center  w-full sm:w-80 sm:pt-40 mx-auto flex flex-col justify-center items-center">
      <h1 className="text-3xl  font-bold mb-4">Playground page</h1>

      {isLoggedIn ? (
        <div className="w-full flex flex-col mb-8">
          <p className="mb-4 text-2xl">Logged in</p>
          <p className="mb-4  font-bold">Refresh token</p>
          <p className="mb-4 break-words">{refreshToken}</p>
          <p className="mb-4 font-bold">Access token</p>
          <p className="mb-8 break-words">{accessToken}</p>
          <button
            className="mx-auto w-48 bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded"
            onClick={() => fetchAccessToken()}
          >
            Fetch Access Token
          </button>
        </div>
      ) : (
        <div className="mb-8">
          <p className="text-red-300 font-bold mb-4">Not logged in</p>
          <Link
            to={routes.LOGIN}
            className="w-48 bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded"
          >
            Login
          </Link>
        </div>
      )}

      <button
        className="mx-auto w-48 bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded"
        onClick={() => fetchAccessToken()}
      >
        Fetch portfolios
      </button>
    </div>
  );
};

export default PlaygroundPage;

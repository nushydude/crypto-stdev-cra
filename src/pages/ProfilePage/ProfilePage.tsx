import useUser from '../../hooks/useUser';

const ProfilePage = () => {
  const { profile } = useUser();

  return (
    <div className="w-full p-8 border rounded-md md:w-96 mx-auto mt-4 bg-gray-50">
      <h1 className="text-2xl font-bold text-center mb-4">Profile</h1>
      <div className="grid gap-2 grid-cols-3">
        <h2 className="font-bold">Firstname</h2>
        <p className="col-span-2">{profile?.firstname}</p>
        <h2 className="font-bold">Lastname</h2>
        <p className="col-span-2">{profile?.lastname}</p>
        <h2 className="font-bold">Email</h2>
        <p className="col-span-2">{profile?.email}</p>
      </div>
    </div>
  );
};

export default ProfilePage;

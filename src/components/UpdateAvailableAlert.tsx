interface Props {
  closeToast: () => void;
}

export const UpdateAvailableAlert = ({ closeToast }: Props) => {
  return (
    <div>
      <p className="mb-4">An update to the app is available</p>

      <div className="flex justify-center">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => window.location.reload()}
        >
          Update now
        </button>

        <div className="w-2" />

        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={closeToast}
        >
          Update later
        </button>
      </div>
    </div>
  );
};

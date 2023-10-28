import {
  Button,
  ButtonCotainer,
  MessageText,
  Spacer,
} from './UpdateAvailableAlert.styles';

// closeToast is injected by react-toastify
export const UpdateAvailableAlert = ({ closeToast }: any) => {
  return (
    <div>
      <MessageText>An update to the app is available</MessageText>

      <ButtonCotainer>
        <Button
          onClick={() => {
            window.location.reload();
          }}
        >
          Update now
        </Button>

        <Spacer />

        <Button onClick={closeToast}>Update later</Button>
      </ButtonCotainer>
    </div>
  );
};

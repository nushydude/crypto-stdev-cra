import React from 'react';
import styled from 'styled-components';

const ButtonCotainer = styled.div`
  display: flex;
  justify-content: center;
`;

const Spacer = styled.div`
  width: 8px;
`;

const Button = styled.button`
  padding: 10px 20px;
`;

const MessageContainer = styled.div``;

const MessageText = styled.p`
  margin-bottom: 16px;
`;

// closeToast is injected by react-toastify
export const UpdateAvailableAlert = ({ closeToast }: any) => {
  return (
    <MessageContainer>
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
    </MessageContainer>
  );
};

import React from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { useLocalStorage } from "react-use";
import { ToastContainer, toast } from "react-toastify";
import { DEFAULT_SETTINGS } from "../../consts/DefaultSettings";
import { config } from "../../config";

const InputWrapper = styled.div`
  display: grid;
  grid-gap: 8px;
  grid-template-columns: 1fr 70px;
  margin-bottom: 20px;
`;

const Form = styled.form`
  h3 {
    margin-bottom: 8px;
  }

  input {
    width: 100%;
    padding: 10px;
    /* move to global style */
    margin: 0;
    box-sizing: border-box;
  }

  button {
    padding: 10px;
  }
`;

type FieldValues = {
  settingsJsonUri: string;
};

interface Props {
  onUpdate: Function;
}

export const SettingsJsonUri: React.FC<Props> = ({ onUpdate }) => {
  const [uri, setUri, removeUri] = useLocalStorage("settings-json-uri", "");
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, setSettings, removeSettings] = useLocalStorage(
    "settings",
    JSON.stringify(DEFAULT_SETTINGS)
  );

  const updateSettings = (newSettings: Object) => {
    setSettings(JSON.stringify(newSettings));
    onUpdate(newSettings);
  };

  const { register, handleSubmit } = useForm<FieldValues>({
    defaultValues: {}
  });

  const onSubmit = async ({ settingsJsonUri }: FieldValues) => {
    // if cleared
    if (!settingsJsonUri) {
      toast.warning("Settings file removed. Reverting to defaults.");
      updateSettings(DEFAULT_SETTINGS);
      removeUri();
      return;
    }

    // fetch JSON file
    try {
      const res = await fetch(`${config.API_URI}/settings`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ uri: settingsJsonUri })
      });

      // parse JSON file
      const settingsJson = await res.json();

      // save settings
      const { success, /* errorMessage, */ data } = settingsJson;

      if (success) {
        setUri(settingsJsonUri);
        updateSettings(data);
        toast.success("Woohoo! Settings downloaded and updated.");
      } else {
        toast.error(
          "Sorry, could not update settings. Keeping old settings untouched.",
          {
            toastId: "Exception"
          }
        );
      }
    } catch (error) {
      toast.error(
        "Sorry, could not update settings. Keeping old settings untouched.",
        {
          toastId: "Exception"
        }
      );
    }
  };

  return (
    <div>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
      />
      <Form onSubmit={handleSubmit(onSubmit)}>
        <h3>Settings JSON URI</h3>

        <InputWrapper>
          <input
            id="settingsJsonUri"
            defaultValue={uri}
            title={uri}
            {...register("settingsJsonUri")}
          />

          <button type="submit">{uri ? "Update" : "Save"}</button>
        </InputWrapper>
      </Form>
      <p>Note:</p> <p></p>If using a shared link from Google Drive, make sure to
      run it through{" "}
      <a href="https://sites.google.com/site/gdocs2direct/">
        Google Drive Direct Link Generator
      </a>{" "}
      first to get the direct link and paste it in the box above.
    </div>
  );
};

import { Alert, AlertColor, Snackbar } from "@mui/material";
import { createContext, FC, useContext, useState } from "react";

interface SnackbarContextValue {
  showSnackbar: (message: string, severity: AlertColor) => void;
  successSnackbar: (message: string) => void;
  warningSnackbar: (message: string) => void;
  infoSnackbar: (message: string) => void;
  errorSnackbar: (message: string) => void;
  closeSnackbar: () => void;
}

const SnackbarContext = createContext<SnackbarContextValue>({
  showSnackbar: () => {},
  successSnackbar: () => {},
  warningSnackbar: () => {},
  infoSnackbar: () => {},
  errorSnackbar: () => {},
  closeSnackbar: () => {},
});

export const useSnackbar = () => useContext(SnackbarContext);

interface SnackbarProviderProps {
  children: React.ReactNode;
}

export const SnackbarProvider: FC<SnackbarProviderProps> = ({ children }) => {
  const [open, setOpen] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [severity, setSeverity] = useState<AlertColor>("success");

  const closeSnackbar = () => {
    setOpen(false);
  };

  const showSnackbar = (newMessage: string, newSeverity: AlertColor) => {
    setOpen(true);
    setMessage(newMessage);
    setSeverity(newSeverity);
  };

  const successSnackbar = (newMessage: string) =>
    showSnackbar(newMessage, "success");
  const warningSnackbar = (newMessage: string) =>
    showSnackbar(newMessage, "warning");
  const infoSnackbar = (newMessage: string) => showSnackbar(newMessage, "info");
  const errorSnackbar = (newMessage: string) =>
    showSnackbar(newMessage, "error");

  return (
    <SnackbarContext.Provider
      value={{
        showSnackbar,
        successSnackbar,
        warningSnackbar,
        infoSnackbar,
        errorSnackbar,
        closeSnackbar,
      }}
    >
      {children}
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={closeSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert onClose={closeSnackbar} severity={severity}>
          {message}
        </Alert>
      </Snackbar>
    </SnackbarContext.Provider>
  );
};

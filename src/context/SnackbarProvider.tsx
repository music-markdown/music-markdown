import { Alert, AlertColor, Snackbar } from "@mui/material";
import { createContext, FC, useCallback, useContext, useState } from "react";

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

  const showSnackbar = useCallback(
    (newMessage: string, newSeverity: AlertColor) => {
      setOpen(true);
      setMessage(newMessage);
      setSeverity(newSeverity);
    },
    [],
  );

  const successSnackbar = useCallback(
    (newMessage: string) => showSnackbar(newMessage, "success"),
    [showSnackbar],
  );
  const warningSnackbar = useCallback(
    (newMessage: string) => showSnackbar(newMessage, "warning"),
    [showSnackbar],
  );
  const infoSnackbar = useCallback(
    (newMessage: string) => showSnackbar(newMessage, "info"),
    [showSnackbar],
  );
  const errorSnackbar = useCallback(
    (newMessage: string) => showSnackbar(newMessage, "error"),
    [showSnackbar],
  );

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

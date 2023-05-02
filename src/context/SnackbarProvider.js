import { Alert, Snackbar } from "@mui/material";
import { createContext, useContext, useState } from "react";

const SnackbarContext = createContext();

export const useSnackbar = () => useContext(SnackbarContext);

export default function SnackbarProvider({ children }) {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState("success");

  const closeSnackbar = () => setOpen(false);

  const showSnackbar = (newMessage, newSeverity) => {
    setOpen(true);
    setMessage(newMessage);
    setSeverity(newSeverity);
  };

  const successSnackbar = (newMessage) => showSnackbar(newMessage, "success");
  const warningSnackbar = (newMessage) => showSnackbar(newMessage, "warning");
  const infoSnackbar = (newMessage) => showSnackbar(newMessage, "info");
  const errorSnackbar = (newMessage) => showSnackbar(newMessage, "error");

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
}

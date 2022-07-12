import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Paper,
} from "@mui/material";
import QRCode from "react-qr-code";

export default function QrCodeDialog({ open, close }) {
  return (
    <Dialog open={open} onClose={close}>
      <DialogTitle id="share-song-qr-dialog-title">Song QR Code</DialogTitle>
      <DialogContent>
        <Paper
          style={{
            background: "white",
            padding: "1em",
          }}
        >
          <QRCode
            style={{ height: "auto", width: "100%" }}
            value={window.location.href}
            viewBox={`0 0 256 256`}
          />
        </Paper>
        <DialogContentText sx={{ mt: 1 }}>
          Scan this QR code to view the current song on your device.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={close}>Close</Button>
      </DialogActions>
    </Dialog>
  );
}

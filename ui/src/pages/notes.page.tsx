import { useState } from "react";
import { Container, TextField, Button, Typography } from "@mui/material";
import {
  encryptData,
  decryptData,
  generateAESKey,
  arrayBufferToBase64,
  base64ToArrayBuffer,
} from "../utils/crypto";
import { EncryptedNote } from "../types/note.type";

const NotesPage = () => {
  const [note, setNote] = useState("");
  const [key, setKey] = useState<CryptoKey | null>(null);
  const [encryptedNote, setEncryptedNote] = useState<EncryptedNote | null>(
    null
  );
  const [decryptedNote, setDecryptedNote] = useState<string | null>(null);

  const handleEncrypt = async () => {
    const key = await generateAESKey();
    setKey(key);
    const { iv, encryptedData } = await encryptData(key, note);

    setEncryptedNote({
      iv: arrayBufferToBase64(iv),
      encryptedData: arrayBufferToBase64(encryptedData),
    });
  };

  const handleDecrypt = async () => {
    if (!encryptedNote || key == null) return;

    const { iv, encryptedData } = encryptedNote;
    const decrypted = await decryptData(
      key,
      base64ToArrayBuffer(iv),
      base64ToArrayBuffer(encryptedData)
    );
    setDecryptedNote(decrypted);
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Secret Note-Taking App
      </Typography>
      <TextField
        fullWidth
        multiline
        rows={4}
        label="Note"
        value={note}
        onChange={(e) => setNote(e.target.value)}
      />
      <div className="my-3">
        <Button variant="contained" color="primary" onClick={handleEncrypt}>
          Encrypt Note
        </Button>
        <Button variant="contained" color="secondary" onClick={handleDecrypt}>
          Decrypt Note
        </Button>
      </div>
      <Typography variant="h6" gutterBottom>
        Encrypted Note: {encryptedNote ? JSON.stringify(encryptedNote) : "N/A"}
      </Typography>
      <Typography variant="h6" gutterBottom>
        Decrypted Note: {decryptedNote || "N/A"}
      </Typography>
    </Container>
  );
};

export default NotesPage;

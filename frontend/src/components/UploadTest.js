import { useState } from "react";
import { uploadFile } from "../services/firebaseStorage";

function UploadTest() {
  const [file, setFile] = useState(null);
  const [url, setUrl] = useState("");

  const handleUpload = async () => {
    if (!file) return;
    const downloadUrl = await uploadFile(file);
    setUrl(downloadUrl);
  };

  return (
    <div>
      <h2>Upload test Firebase</h2>
      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      <button onClick={handleUpload}>Upload</button>

      {url && (
        <p>
          Fichier : <a href={url}>Voir</a>
        </p>
      )}
    </div>
  );
}

export default UploadTest;

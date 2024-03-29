// qrScanner.js

// ... Other imports ...

/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/jsx-no-undef */

export const handleToggleScanner = () => {
  setScannerVisible(!scannerVisible);
};

const QRCodeScanner = () => {
  const [qrCodeData, setQrCodeData] = useState(null);
  const [scannerVisible, setScannerVisible] = useState(false);

  const handleScan = (data) => {
    if (data) {
      setQrCodeData(data);
    }
  };

  const handleError = (error) => {
    console.error(error);
  };


  return (
    <div>
      <button onClick={handleToggleScanner}>Open Scanner</button>
      {scannerVisible && (
        <div>
          <QrReader
            delay={300}
            onError={handleError}
            onScan={handleScan}
            style={{ width: '100%' }}
          />
          {qrCodeData && <p>Scanned Data: {qrCodeData}</p>}
        </div>
      )}
    </div>
  );
};

export default QRCodeScanner;

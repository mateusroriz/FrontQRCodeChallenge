import React, { useState, ChangeEvent, FormEvent } from 'react';
import QRCode from 'qrcode.react';
import api from './service/api';

interface TransactionData {
  payerIdentifier: string;
  value: string;
  recieverIdentifier: string;
}

function App() {
  const [formData, setFormData] = useState<TransactionData>({
    payerIdentifier: '',
    value: '',
    recieverIdentifier: '',
  })
  const [QrCode, setQrCode] = useState('') 

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleSubmit = async (event: FormEvent ) => {
    event.preventDefault();

    const { payerIdentifier, value, recieverIdentifier } = formData;
    const data = { 
      payerIdentifier,
      value, 
      recieverIdentifier
    };

    await api.post('/transactions', data)
    .then(function (response) {
      setQrCode(response.data.qrCodeString)
    }) 
  }

  return (
    <>
        <form onSubmit={handleSubmit}>
          <div className="field">
            <label htmlFor="payerIdentifier">CNPJ/CPF do Pagador</label>
            <input 
              type="number"
              name="payerIdentifier"
              id="payerIdentifier"
              value={formData.payerIdentifier}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="field">
            <label htmlFor="value">Valor da Transferencia</label>
            <input
              type="number"
              name="value"
              id="value"
              value={formData.value}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="field">
            <label htmlFor="recieverIdentifier">CNPJ/CPF do Recebedor</label>
            <input 
              type="number"
              name="recieverIdentifier"
              id="recieverIdentifier"
              value={formData.recieverIdentifier}
              onChange={handleInputChange}
              required
            />
          </div>
          <button type="submit">
              Transerir Valor
          </button>
        </form>
        { QrCode ?
          <QRCode value={QrCode} size={400} />: ''
        }

  </>

  );
}
export default App;
import { Layout, Select, Space, Button, Modal } from 'antd';
import { useCrypto } from '../../context/crypto-context';
import { useEffect, useState } from 'react';
import CoinInfoModal from '../CoinInfoModal';


const headerStyle = {
    width: '100%',
    textAlign: 'center',
    height: 60,
    padding: '1rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
};

export default function AppHeader() {
  const [select, setSelect] = useState(false);
  const [coin, setCoin] = useState(null);
  const [modal, setModal] = useState(false);
  const {crypto} = useCrypto();

  useEffect(() => {
    const keypress = (event) => {
      if(event.key === '/'){
        setSelect((prev) => !prev)
      }
    }
    document.addEventListener('keypress', keypress);
    return () => document.removeEventListener('keypress', keypress);
  }, [])

  function handleSelect(value) {
    setCoin(crypto.find(c => c.id === value))
    setModal(true);
  }

  return (<Layout.Header style={headerStyle}>
    <Select
      style={{
        width: 250,
      }}
      open={select}
      onSelect={handleSelect}
      onClick={() => setSelect((prev) => !prev)}
      value="press / to open"
      optionLabelProp='label'
      options={crypto.map(coin => ({
        label: coin.name,
        value: coin.id,
        icon: coin.icon
      }))}
      optionRender={(option) => (
        <Space>
          <img 
            style={{width: 20}}
            src={option.data.icon} 
            alt={option.data.label} /> {option.data.label}
        </Space>
      )}
    />
    <Button type="primary">Add Asset Text</Button>

    <Modal 
      open={modal} 
      onOk={() => setModal(false)} 
      onCancel={() => setModal(false)}
      footer={null}
    >
      <CoinInfoModal coin={coin}/>
    </Modal>
  </Layout.Header>)
}
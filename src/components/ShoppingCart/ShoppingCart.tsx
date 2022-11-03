import {
  IonList,
  IonItem,
  IonLabel,
  IonInput,
  IonListHeader,
  IonGrid,
  IonRow,
  IonCol,
  IonContent,
  IonButton,
} from '@ionic/react';
import { useRef, useState } from 'react';

interface Item {
  id?: string;
  name?: string;
  price?: string;
}

const ShoppingCart = () => {
  const budget = useRef<HTMLIonInputElement | null>(null);
  const itemName = useRef<HTMLIonInputElement | null>(null);
  const itemPrice = useRef<HTMLIonInputElement | null>(null);
  const [items, setItems] = useState(Array<Item>);
  const addItem = () => {
    const newItem: Item = {
      name: itemName.current?.value?.toString() ?? '',
      price: itemPrice.current?.value?.toString() ?? ''
    };

    if (itemName.current) itemName.current.value = '';
    if (itemPrice.current) itemPrice.current.value = '';

    setItems([...items, newItem]);
  };

  return (
    <>
      <IonList>
        <IonListHeader>
          <IonLabel>Totais</IonLabel>
        </IonListHeader>

        <IonItem>
          <IonLabel>Budget</IonLabel>
          <IonInput placeholder="9999.99" ref={budget}></IonInput>
        </IonItem>

        <IonItem>
          <IonLabel>Total</IonLabel>
          <IonInput placeholder="9999.99" readonly={true}></IonInput>
        </IonItem>
      </IonList>

      <IonList>
        <IonListHeader>
          <IonLabel>Adicionar Itens</IonLabel>
        </IonListHeader>

        <IonItem>
          <IonLabel>Item</IonLabel>
          <IonInput placeholder="1kg de arroz" ref={itemName}></IonInput>
        </IonItem>

        <IonItem>
          <IonLabel>Preço</IonLabel>
          <IonInput placeholder="3.99" ref={itemPrice}></IonInput>
        </IonItem>

        <IonItem>
          <IonButton style={{ width: '100%' }} onClick={addItem}>
            Adicionar
          </IonButton>
        </IonItem>
      </IonList>

      <IonContent>
        <h2>Lista</h2>

        <IonGrid fixed={true} style={{ border: '1px solid #ffffff' }}>
          <IonRow style={{ fontWeight: 'bold' }}>
            <IonCol style={{ border: '1px solid #ffffff' }}>Item</IonCol>
            <IonCol style={{ border: '1px solid #ffffff' }}>Preço</IonCol>
          </IonRow>

          {
            items.map(item => (
              <IonRow>
                <IonCol>{item.name}</IonCol>
                <IonCol>{item.price}</IonCol>
              </IonRow>
            ))}
        </IonGrid>
      </IonContent>
    </>
  );
};

export default ShoppingCart;

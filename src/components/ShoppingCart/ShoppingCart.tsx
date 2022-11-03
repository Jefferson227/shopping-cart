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
import { useRef, useState, useEffect } from 'react';
import { v4 as uuid } from 'uuid';

interface Item {
  id: string;
  name?: string;
  price?: string;
}

const ShoppingCart = () => {
  const budget = useRef<HTMLIonInputElement | null>(null);
  const total = useRef<HTMLIonInputElement | null>(null);
  const budgetMinusTotal = useRef<HTMLIonInputElement | null>(null);
  const itemName = useRef<HTMLIonInputElement | null>(null);
  const itemPrice = useRef<HTMLIonInputElement | null>(null);
  const [items, setItems] = useState(Array<Item>);
  const addItem = () => {
    const newItem: Item = {
      id: uuid(),
      name: itemName.current?.value?.toString() ?? '',
      price: itemPrice.current?.value?.toString() ?? ''
    };

    if (itemName.current) itemName.current.value = '';
    if (itemPrice.current) itemPrice.current.value = '';

    setItems([...items, newItem]);
  };

  const deleteItem = (itemId: string) => {
    const newItems = items.filter(item => item.id !== itemId);

    if (newItems.length === 0)
      localStorage.setItem('items', '[]');

    setItems(newItems);
  };

  useEffect(() => {
    if (items.length > 0)
      localStorage.setItem('items', JSON.stringify(items));

    const sum = items
      .map(item => parseFloat(item.price ?? '0'))
      .reduce((sum, current) => sum += current, 0);

    const budgetMinusTotalSum = (parseFloat(budget.current?.value?.toString() ?? '0') - sum).toFixed(2);

    if (total.current) total.current.value = sum.toFixed(2);
    if (budgetMinusTotal.current) budgetMinusTotal.current.value = budgetMinusTotalSum;
  }, [items]);

  useEffect(() => {
    const jsonItems = JSON.parse(localStorage.getItem('items') ?? '[]');

    if (jsonItems.length === 0) return;

    setItems(jsonItems);
    console.log('items loaded');
  }, []);

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
          <IonInput placeholder="9999.99" ref={total} readonly={true}></IonInput>
        </IonItem>

        <IonItem>
          <IonLabel>Budget - Total</IonLabel>
          <IonInput placeholder="9999.99" ref={budgetMinusTotal} readonly={true}></IonInput>
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
            <IonCol style={{ border: '1px solid #ffffff' }}>Deletar</IonCol>
          </IonRow>

          {
            items.map((item, index) => (
              <IonRow key={index}>
                <IonCol>{item.name}</IonCol>
                <IonCol>{parseFloat(item.price ?? '0').toFixed(2)}</IonCol>
                <IonCol><IonButton onClick={() => deleteItem(item.id)}>Deletar</IonButton></IonCol>
              </IonRow>
            ))}
        </IonGrid>
      </IonContent>
    </>
  );
};

export default ShoppingCart;

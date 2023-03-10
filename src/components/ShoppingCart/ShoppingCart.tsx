import {
  IonList,
  IonItem,
  IonLabel,
  IonInput,
  IonListHeader,
  IonPage,
} from '@ionic/react';
import { useRef, useState, useEffect } from 'react';
import { v4 as uuid } from 'uuid';
import { Item } from '../../interfaces/Item';
import ItemList from '../ItemList/ItemList';
import AddItem from '../AddItem/AddItem';

const ShoppingCart = () => {
  const page = useRef(undefined);
  const [budget, setBudget] = useState(0);
  const total = useRef<HTMLIonInputElement | null>(null);
  const budgetMinusTotal = useRef<HTMLIonInputElement | null>(null);
  const itemName = useRef<HTMLIonInputElement | null>(null);
  const itemPrice = useRef<HTMLIonInputElement | null>(null);
  const itemQuantity = useRef<HTMLIonInputElement | null>(null);
  const [items, setItems] = useState(Array<Item>);
  const addItem = () => {
    const newItem: Item = {
      id: uuid(),
      name: itemName.current?.value?.toString() ?? '',
      price: itemPrice.current?.value?.toString().replace(/,/g, '.') ?? '',
      quantity: itemQuantity.current?.value?.toString() ?? '',
    };

    if (itemName.current) itemName.current.value = '';
    if (itemPrice.current) itemPrice.current.value = '';

    setItems([...items, newItem]);
  };

  const deleteItem = (itemId: string) => {
    const newItems = items.filter((item) => item.id !== itemId);

    if (newItems.length === 0) localStorage.setItem('items', '[]');

    setItems(newItems);
  };

  useEffect(() => {
    if (items.length > 0) localStorage.setItem('items', JSON.stringify(items));

    const sum = items
      .map(
        (item) =>
          parseFloat(item.quantity ?? '0') * parseFloat(item.price ?? '0')
      )
      .reduce((sum, current) => (sum += current), 0);

    const budgetMinusTotalSum = (parseFloat(budget.toString()) - sum).toFixed(
      2
    );

    if (total.current) total.current.value = sum.toFixed(2);
    if (budgetMinusTotal.current)
      budgetMinusTotal.current.value = budgetMinusTotalSum;
  }, [items, budget]);

  useEffect(() => {
    const jsonItems = JSON.parse(localStorage.getItem('items') ?? '[]');

    if (jsonItems.length === 0) return;

    setItems(jsonItems);
  }, []);

  return (
    <IonPage ref={page}>
      <IonList>
        <IonListHeader>
          <IonLabel>Totais</IonLabel>
        </IonListHeader>

        <IonItem>
          <IonLabel>Budget</IonLabel>
          <IonInput
            placeholder="9999.99"
            type="number"
            inputMode="decimal"
            value={budget}
            onIonChange={(e) =>
              setBudget(parseInt(e.target.value?.toString() ?? '0'))
            }
          ></IonInput>
        </IonItem>

        <IonItem>
          <IonLabel>Total</IonLabel>
          <IonInput
            placeholder="9999.99"
            ref={total}
            readonly={true}
          ></IonInput>
        </IonItem>

        <IonItem>
          <IonLabel>Budget - Total</IonLabel>
          <IonInput
            placeholder="9999.99"
            ref={budgetMinusTotal}
            readonly={true}
          ></IonInput>
        </IonItem>
      </IonList>

      <AddItem
        page={page}
        itemName={itemName}
        itemQuantity={itemQuantity}
        itemPrice={itemPrice}
        addItem={addItem}
      />

      <ItemList items={items} deleteItem={deleteItem} />
    </IonPage>
  );
};

export default ShoppingCart;

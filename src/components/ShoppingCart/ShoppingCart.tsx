import { useRef, useState, useEffect } from 'react';
import { v4 as uuid } from 'uuid';
import { Item } from '../../interfaces/Item';
import ItemList from '../ItemList/ItemList';
import AddItem from '../AddItem/AddItem';
import { Total } from '../../interfaces/Total';

interface ShoppingCartProps {
  page: React.MutableRefObject<undefined>;
  total: Total | undefined;
  setTotal: React.Dispatch<React.SetStateAction<Total | undefined>>;
}

const ShoppingCart: React.FC<ShoppingCartProps> = ({
  page,
  total,
  setTotal,
}) => {
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

    setTotal({ total: sum, budget: total?.budget ?? 0 });
  }, [setTotal, items, total?.budget]);

  useEffect(() => {
    const jsonItems = JSON.parse(localStorage.getItem('items') ?? '[]');

    if (jsonItems.length === 0) return;

    setItems(jsonItems);
  }, []);

  return (
    <>
      <AddItem
        page={page}
        itemName={itemName}
        itemQuantity={itemQuantity}
        itemPrice={itemPrice}
        addItem={addItem}
      />

      <ItemList items={items} deleteItem={deleteItem} />
    </>
  );
};

export default ShoppingCart;

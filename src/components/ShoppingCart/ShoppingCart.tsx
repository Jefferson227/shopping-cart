import { useState, useEffect } from 'react';
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
  const [items, setItems] = useState(Array<Item>);

  const addItem = (item: Item) => {
    if (item.id === '') item.id = uuid();

    setItems([...items, item]);
  };

  const deleteItem = (itemId: string) => {
    const newItems = items.filter((item) => item.id !== itemId);

    if (newItems.length === 0) localStorage.setItem('items', '[]');

    setItems(newItems);
  };

  useEffect(() => {
    if (items.length > 0) localStorage.setItem('items', JSON.stringify(items));

    const sum = items
      .map((item) => item.quantity * item.price)
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
      <AddItem page={page} addItem={addItem} />
      <ItemList items={items} deleteItem={deleteItem} />
    </>
  );
};

export default ShoppingCart;

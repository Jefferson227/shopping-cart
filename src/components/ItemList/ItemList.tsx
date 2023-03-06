import {
  IonContent,
  IonList,
  IonItemSliding,
  IonItem,
  IonLabel,
  IonItemOption,
  IonItemOptions,
  IonListHeader,
} from '@ionic/react';
import { Item } from '../../interfaces/Item';

interface ItemListProps {
  items: Array<Item>;
  deleteItem: (itemId: string) => void;
}

const ItemList: React.FC<ItemListProps> = ({ items, deleteItem }) => {
  return (
    <IonContent>
      <IonListHeader>
        <IonLabel>Lista</IonLabel>
      </IonListHeader>

      <IonList>
        {items.map((item, index) => (
          <IonItemSliding key={index}>
            <IonItem>
              <IonLabel slot="start">
                <h2>{item.name}</h2>
                <p>Quantidade: {parseFloat(item.quantity ?? '0')}</p>
              </IonLabel>

              <IonLabel slot="end">
                <h2 style={{ textAlign: 'right' }}>
                  {(
                    parseFloat(item.quantity ?? '0') *
                    parseFloat(item.price ?? '0')
                  ).toFixed(2)}
                </h2>
                <p>
                  Preço unitário: {parseFloat(item.price ?? '0').toFixed(2)}
                </p>
              </IonLabel>
            </IonItem>

            <IonItemOptions>
              <IonItemOption color="danger" onClick={() => deleteItem(item.id)}>
                Deletar
              </IonItemOption>
            </IonItemOptions>
          </IonItemSliding>
        ))}
      </IonList>
    </IonContent>
  );
};

export default ItemList;

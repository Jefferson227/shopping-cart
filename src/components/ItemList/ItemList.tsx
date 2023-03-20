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
import Utils from '../../utils/Utils';

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
                <p>Quantidade: {Utils.showAsLocaleDecimal(item.quantity)}</p>
              </IonLabel>

              <IonLabel slot="end">
                <h2 style={{ textAlign: 'right' }}>
                  {Utils.showAsLocaleCurrency(item.quantity * item.price)}
                </h2>
                <p>Unidade: {Utils.showAsLocaleCurrency(item.price)}</p>
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

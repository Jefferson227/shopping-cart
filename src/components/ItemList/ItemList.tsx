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
  const localeCurrency = new Intl.NumberFormat(navigator.language, {
    style: 'currency',
    currency: 'BRL',
  });

  const localeDecimal = new Intl.NumberFormat(navigator.language, {
    style: 'decimal',
  });

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
                <p>
                  Quantidade:{' '}
                  {/* {localeDecimal.format(parseFloat(item.quantity ?? '0'))} */}
                  {localeDecimal.format(item.quantity)}
                </p>
              </IonLabel>

              <IonLabel slot="end">
                <h2 style={{ textAlign: 'right' }}>
                  {/* {localeCurrency.format(
                    parseFloat(item.quantity ?? '0') *
                      parseFloat(item.price ?? '0')
                  )} */}
                  {localeCurrency.format(item.quantity * item.price)}
                </h2>
                <p>
                  Unidade:{' '}
                  {/* {localeCurrency.format(parseFloat(item.price ?? '0'))} */}
                  {localeCurrency.format(item.price)}
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

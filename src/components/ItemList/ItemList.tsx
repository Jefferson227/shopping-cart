import { IonContent, IonGrid, IonRow, IonCol } from '@ionic/react';
import { Item } from '../../interfaces/Item';

interface ItemListProps {
  items: Array<Item>;
  deleteItem: (itemId: string) => void;
}

const ItemList: React.FC<ItemListProps> = ({ items, deleteItem }) => {
  return (
    <IonContent>
      <h2>Lista</h2>

      <IonGrid fixed={true} style={{ border: '1px solid #ffffff' }}>
        <IonRow style={{ fontWeight: 'bold' }}>
          <IonCol style={{ border: '1px solid #ffffff' }}>Item</IonCol>
          <IonCol style={{ border: '1px solid #ffffff' }}>Qtd</IonCol>
          <IonCol style={{ border: '1px solid #ffffff' }}>Preço</IonCol>
          <IonCol style={{ border: '1px solid #ffffff' }}>Total</IonCol>
          <IonCol style={{ border: '1px solid #ffffff' }}>Deletar</IonCol>
        </IonRow>

        {items.map((item, index) => (
          <IonRow key={index}>
            <IonCol>{item.name}</IonCol>
            <IonCol style={{ textAlign: 'center' }}>
              {parseInt(item.quantity ?? '0')}
            </IonCol>
            <IonCol style={{ textAlign: 'center' }}>
              {parseFloat(item.price ?? '0').toFixed(2)}
            </IonCol>
            <IonCol style={{ textAlign: 'center' }}>
              {(
                parseFloat(item.quantity ?? '0') * parseFloat(item.price ?? '0')
              ).toFixed(2)}
            </IonCol>
            <IonCol style={{ textAlign: 'center' }}>
              <div onClick={() => deleteItem(item.id)}>&#10060;</div>
            </IonCol>
          </IonRow>
        ))}
      </IonGrid>
    </IonContent>
  );
};

export default ItemList;

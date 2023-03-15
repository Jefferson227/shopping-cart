import {
  IonButton,
  IonButtons,
  IonCheckbox,
  IonContent,
  IonFab,
  IonFabButton,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonModal,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import { add } from 'ionicons/icons';
import { useEffect, useRef, useState } from 'react';
import { Item } from '../../interfaces/Item';
import Utils from '../../utils/Utils';

interface AddItemProps {
  page: React.MutableRefObject<undefined>;
  addItem: (item: Item) => void;
}

const AddItem: React.FC<AddItemProps> = ({ page, addItem }) => {
  const modal = useRef<HTMLIonModalElement>(null);
  const [allFieldsArePopulated, setAllFieldsArePopulated] = useState(false);
  const [canDismiss, setCanDismiss] = useState(false);
  const [presentingElement, setPresentingElement] = useState<
    HTMLElement | undefined
  >(undefined);

  const [itemName, setItemName] = useState('');
  const [itemQuantity, setItemQuantity] = useState('1');
  const [itemPrice, setItemPrice] = useState(Utils.applyCurrencyMask('0.00'));

  useEffect(() => {
    setPresentingElement(page.current);
  }, [page]);

  useEffect(() => {
    setAllFieldsArePopulated(
      itemName !== '' &&
        itemQuantity !== '' &&
        itemQuantity !== '0' &&
        itemPrice !== '' &&
        itemPrice !== Utils.applyCurrencyMask('0.00')
    );
  }, [itemName, itemQuantity, itemPrice]);

  function dismiss() {
    modal.current?.dismiss();
  }

  function forceDismiss() {
    setCanDismiss(true);
    setTimeout(() => dismiss(), 0);
  }

  function addItemAndDismiss() {
    addItem({
      id: '',
      name: itemName,
      quantity: itemQuantity,
      price: Utils.convertCurrencyToFloat(itemPrice).toFixed(),
    });
    dismiss();
  }

  return (
    <>
      <IonModal
        ref={modal}
        trigger="open-modal"
        canDismiss={canDismiss}
        presentingElement={presentingElement}
      >
        <IonHeader>
          <IonToolbar>
            <IonTitle>Adicionar Itens</IonTitle>
            <IonButtons slot="end">
              <IonButton onClick={() => forceDismiss()}>Fechar</IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>

        <IonContent>
          <IonItem>
            <IonLabel>Item</IonLabel>
            <IonInput
              placeholder="1kg de arroz"
              onIonChange={(e) => {
                setItemName(e.target?.value ? e.target.value.toString() : '');
              }}
            ></IonInput>
          </IonItem>

          <IonItem>
            <IonLabel>Quantidade</IonLabel>
            <IonInput
              placeholder="1"
              type="number"
              inputMode="decimal"
              value={itemQuantity}
              onIonChange={(e) => {
                setItemQuantity(
                  e.target?.value ? e.target.value.toString() : '0'
                );
              }}
            ></IonInput>
          </IonItem>

          <IonItem>
            <IonLabel>Preço</IonLabel>
            <IonInput
              inputMode="decimal"
              value={itemPrice}
              onIonChange={(e) => {
                setItemPrice(Utils.applyCurrencyMask(e.target.value));
              }}
            ></IonInput>
          </IonItem>

          <IonItem>
            <IonLabel {...{ for: 'terms' }}>Manter esta janela aberta</IonLabel>

            <IonCheckbox
              id="terms"
              checked={!canDismiss}
              onIonChange={(ev) => {
                setCanDismiss(!ev.detail.checked);
              }}
            ></IonCheckbox>
          </IonItem>

          <IonButton
            expand="full"
            disabled={!allFieldsArePopulated}
            onClick={() => addItemAndDismiss()}
          >
            {canDismiss ? 'Adicionar e fechar' : 'Adicionar'}
          </IonButton>
        </IonContent>
      </IonModal>

      <IonFab id="open-modal" slot="fixed" vertical="top" horizontal="end">
        <IonFabButton>
          <IonIcon icon={add}></IonIcon>
        </IonFabButton>
      </IonFab>
    </>
  );
};

export default AddItem;

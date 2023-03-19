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
import { add, addOutline, removeOutline } from 'ionicons/icons';
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
  const [itemQuantity, setItemQuantity] = useState(1.0);
  const [itemPrice, setItemPrice] = useState(0.0);

  useEffect(() => {
    setPresentingElement(page.current);
  }, [page]);

  useEffect(() => {
    setAllFieldsArePopulated(
      itemName !== '' && itemQuantity !== 0 && itemPrice !== 0
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
      quantity: itemQuantity, //Utils.convertCurrencyToFloat(itemQuantity).toFixed(3),
      price: itemPrice, //Utils.convertCurrencyToFloat(itemPrice).toFixed(2),
    });

    setItemName('');
    setItemQuantity(1.0); //Utils.applyDecimalMask(3, '1.000'));
    setItemPrice(0.0); //Utils.applyCurrencyMask('0.00'));

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
              value={itemName}
              onIonChange={(e) => {
                setItemName(e.target?.value ? e.target.value.toString() : '');
              }}
            ></IonInput>
          </IonItem>

          <IonItem>
            <IonLabel>Quantidade</IonLabel>
            <IonInput
              placeholder="1"
              inputMode="decimal"
              value={Utils.applyDecimalMask(3, itemQuantity.toFixed(3))}
              onIonChange={(e) => {
                setItemQuantity(Utils.convertCurrencyToFloat(e.target.value));
              }}
            ></IonInput>

            <IonButton
              onClick={() => {
                setItemQuantity(itemQuantity + 1);
              }}
            >
              <IonIcon icon={addOutline}></IonIcon>
            </IonButton>

            <IonButton
              onClick={() => {
                setItemQuantity(itemQuantity - 1);
              }}
              disabled={Utils.convertCurrencyToFloat(itemQuantity, 3) < 1}
            >
              <IonIcon icon={removeOutline}></IonIcon>
            </IonButton>
          </IonItem>

          <IonItem>
            <IonLabel>Preço</IonLabel>
            <IonInput
              inputMode="decimal"
              value={Utils.applyCurrencyMask(itemPrice.toFixed(2))}
              onIonChange={(e) => {
                setItemPrice(Utils.convertCurrencyToFloat(e.target.value));
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

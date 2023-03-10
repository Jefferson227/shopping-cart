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

interface AddItemProps {
  page: React.MutableRefObject<undefined>;
  itemName: React.MutableRefObject<HTMLIonInputElement | null>;
  itemPrice: React.MutableRefObject<HTMLIonInputElement | null>;
  itemQuantity: React.MutableRefObject<HTMLIonInputElement | null>;
  addItem: () => void;
}

const AddItem: React.FC<AddItemProps> = ({
  page,
  itemName,
  itemPrice,
  itemQuantity,
  addItem,
}) => {
  const modal = useRef<HTMLIonModalElement>(null);
  const [allFieldsArePopulated, setAllFieldsArePopulated] = useState(false);
  const [canDismiss, setCanDismiss] = useState(false);
  const [presentingElement, setPresentingElement] = useState<
    HTMLElement | undefined
  >(undefined);

  useEffect(() => {
    setPresentingElement(page.current);
  }, [page]);

  function dismiss() {
    modal.current?.dismiss();
  }

  function forceDismiss() {
    setCanDismiss(true);
    setTimeout(() => dismiss(), 0);
  }

  function addItemAndDismiss() {
    addItem();
    dismiss();
  }

  function validateFields() {
    setAllFieldsArePopulated(
      itemName.current?.value !== '' &&
        itemQuantity.current?.value !== '' &&
        itemPrice.current?.value !== ''
    );
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
              ref={itemName}
              onIonChange={() => validateFields()}
            ></IonInput>
          </IonItem>

          <IonItem>
            <IonLabel>Quantidade</IonLabel>
            <IonInput
              placeholder="1"
              type="number"
              inputMode="decimal"
              ref={itemQuantity}
              onIonChange={() => validateFields()}
            ></IonInput>
          </IonItem>

          <IonItem>
            <IonLabel>Preço</IonLabel>
            <IonInput
              placeholder="3.99"
              type="number"
              inputMode="decimal"
              ref={itemPrice}
              onIonChange={() => validateFields()}
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

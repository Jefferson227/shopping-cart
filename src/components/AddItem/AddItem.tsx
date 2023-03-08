import {
  IonButton,
  IonButtons,
  IonCheckbox,
  IonContent,
  IonFab,
  IonFabButton,
  IonHeader,
  IonIcon,
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
}

const AddItem: React.FC<AddItemProps> = ({ page }) => {
  const modal = useRef<HTMLIonModalElement>(null);

  const [canDismiss, setCanDismiss] = useState(false);
  const [presentingElement, setPresentingElement] = useState<
    HTMLElement | undefined
  >(undefined);

  useEffect(() => {
    setPresentingElement(page.current);
  }, []);

  function dismiss() {
    modal.current?.dismiss();
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
            <IonTitle>Modal</IonTitle>
            <IonButtons slot="end">
              <IonButton onClick={() => dismiss()}>Close</IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>

        <IonContent>
          <p className="ion-padding-horizontal">
            You must accept the terms and conditions to close this modal.
          </p>
          <IonItem>
            <IonLabel className="ion-text-wrap" {...{ for: 'terms' }}>
              Do you accept the terms and conditions?
            </IonLabel>
            <IonCheckbox
              id="terms"
              checked={canDismiss}
              onIonChange={(ev) => {
                setCanDismiss(ev.detail.checked);
              }}
            ></IonCheckbox>
          </IonItem>
        </IonContent>
      </IonModal>

      <IonFab id="open-modal" slot="fixed" vertical="bottom" horizontal="end">
        <IonFabButton>
          <IonIcon icon={add}></IonIcon>
        </IonFabButton>
      </IonFab>
    </>
  );
};

export default AddItem;

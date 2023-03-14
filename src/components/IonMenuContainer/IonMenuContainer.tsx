import {
  IonMenu,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonInput,
  IonItem,
  IonLabel,
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
} from '@ionic/react';
import { useRef } from 'react';
import { Total } from '../../interfaces/Total';

interface IonMenuContainerProps {
  contentId: string;
  total: Total | undefined;
  setTotal: React.Dispatch<React.SetStateAction<Total | undefined>>;
}

const IonMenuContainer: React.FC<IonMenuContainerProps> = ({
  contentId,
  total,
  setTotal,
}) => {
  const budget = useRef<HTMLIonInputElement | null>(null);

  return (
    <IonMenu contentId={contentId}>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Totais</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <IonItem>
          <IonLabel>Budget</IonLabel>

          <IonInput
            placeholder="1300.00"
            type="number"
            inputMode="decimal"
            ref={budget}
            onIonBlur={(e) =>
              setTotal({
                budget: parseFloat(budget.current?.value?.toString() ?? '0'),
                total: total?.total ?? 0,
              })
            }
          ></IonInput>
        </IonItem>

        <IonCard>
          <IonCardHeader>
            <IonCardTitle>{total?.total.toFixed(2)}</IonCardTitle>
            <IonCardSubtitle>Total</IonCardSubtitle>
          </IonCardHeader>

          <IonCardHeader>
            <IonCardTitle>
              {((total?.budget ?? 0) - (total?.total ?? 0)).toFixed(2)}
            </IonCardTitle>
            <IonCardSubtitle>Total - Budget</IonCardSubtitle>
          </IonCardHeader>
        </IonCard>
      </IonContent>
    </IonMenu>
  );
};

export default IonMenuContainer;

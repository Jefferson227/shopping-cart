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
            inputMode="decimal"
            type="number"
            value={total?.budget}
            onIonChange={(e) =>
              setTotal({
                budget: parseInt(e.target.value?.toString() ?? '0'),
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
              {((total?.total ?? 0) - (total?.budget ?? 0)).toFixed(2)}
            </IonCardTitle>
            <IonCardSubtitle>Total - Budget</IonCardSubtitle>
          </IonCardHeader>
        </IonCard>
      </IonContent>
    </IonMenu>
  );
};

export default IonMenuContainer;

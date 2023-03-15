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
import { useState } from 'react';
import { Total } from '../../interfaces/Total';
import Utils from '../../utils/Utils';

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
  const [budget, setBudget] = useState(Utils.applyCurrencyMask('0,00'));

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
            type="text"
            inputMode="decimal"
            value={budget}
            onIonChange={(e) =>
              setBudget(Utils.applyCurrencyMask(e.target.value))
            }
            onIonBlur={(e) =>
              setTotal({
                budget: Utils.convertCurrencyToFloat(budget),
                total: total?.total ?? 0,
              })
            }
          ></IonInput>
        </IonItem>

        <IonCard>
          <IonCardHeader>
            <IonCardTitle>
              {Utils.applyCurrencyMaskWithSymbol(total?.total.toFixed(2))}
            </IonCardTitle>
            <IonCardSubtitle>Total</IonCardSubtitle>
          </IonCardHeader>

          <IonCardHeader>
            <IonCardTitle>
              {Utils.applyCurrencyMaskWithSymbol(
                ((total?.budget ?? 0) - (total?.total ?? 0)).toFixed(2)
              )}
            </IonCardTitle>
            <IonCardSubtitle>Total - Budget</IonCardSubtitle>
          </IonCardHeader>
        </IonCard>
      </IonContent>
    </IonMenu>
  );
};

export default IonMenuContainer;

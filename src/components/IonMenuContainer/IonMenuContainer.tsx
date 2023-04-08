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
import Service from '../../service/Service';

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
  const [budget, setBudget] = useState(
    Utils.applyCurrencyMask(Service.getBudget())
  );

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
            onIonChange={(e) => {
              Service.setBudget((e.target.value ?? '0,00').toString());
              setBudget(Utils.applyCurrencyMask(e.target.value));
            }}
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
              {Utils.showAsLocaleCurrency(total?.total ?? 0)}
            </IonCardTitle>
            <IonCardSubtitle>Total</IonCardSubtitle>
          </IonCardHeader>

          <IonCardHeader>
            <IonCardTitle>
              {Utils.showAsLocaleCurrency(
                (total?.budget ?? 0) - (total?.total ?? 0)
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

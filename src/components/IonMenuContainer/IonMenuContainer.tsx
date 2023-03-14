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
  const [budget, setBudget] = useState('0,00');

  function applyCurrencyMask(e: any) {
    let value = e.target.value;

    value = value.replace('.', '').replace(',', '').replace(/\D/g, '');

    const options = { minimumFractionDigits: 2 };
    const result = new Intl.NumberFormat(navigator.language, options).format(
      parseFloat(value) / 100
    );

    setBudget(result);
  }

  function convertCurrencyToFloat(val: string) {
    return parseFloat(val.replaceAll(',', '').replaceAll('.', '')) / 100;
  }

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
            type="text"
            inputMode="decimal"
            value={budget}
            onIonChange={(e) => applyCurrencyMask(e)}
            onIonBlur={(e) =>
              setTotal({
                budget: convertCurrencyToFloat(budget),
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

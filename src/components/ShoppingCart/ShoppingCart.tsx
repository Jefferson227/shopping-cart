import {
  IonList,
  IonItem,
  IonLabel,
  IonInput,
  IonListHeader,
  IonGrid,
  IonRow,
  IonCol,
  IonContent,
  IonButton,
} from '@ionic/react';
import { useRef, useState } from 'react';

const ShoppingCart = () => {
  const budget = useRef<HTMLIonInputElement>(null);
  const item = useRef<HTMLIonInputElement>(null);
  const price = useRef<HTMLIonInputElement>(null);
  const test = () => console.log(budget.current?.value);

  return (
    <>
      <IonList>
        <IonListHeader>
          <IonLabel>Totais</IonLabel>
        </IonListHeader>

        <IonItem>
          <IonLabel>Budget</IonLabel>
          <IonInput placeholder="9999.99" ref={budget}></IonInput>
        </IonItem>

        <IonItem>
          <IonLabel>Total</IonLabel>
          <IonInput placeholder="9999.99" readonly={true}></IonInput>
        </IonItem>
      </IonList>

      <IonList>
        <IonListHeader>
          <IonLabel>Adicionar Itens</IonLabel>
        </IonListHeader>

        <IonItem>
          <IonLabel>Item</IonLabel>
          <IonInput placeholder="1kg de arroz" ref={item}></IonInput>
        </IonItem>

        <IonItem>
          <IonLabel>Preço</IonLabel>
          <IonInput placeholder="3.99" ref={price}></IonInput>
        </IonItem>

        <IonItem>
          <IonButton style={{ width: '100%' }} onClick={test}>
            Adicionar
          </IonButton>
        </IonItem>
      </IonList>

      <IonContent>
        <h2>Lista</h2>

        <IonGrid fixed={true} style={{ border: '1px solid #ffffff' }}>
          <IonRow style={{ fontWeight: 'bold' }}>
            <IonCol style={{ border: '1px solid #ffffff' }}>Item</IonCol>
            <IonCol style={{ border: '1px solid #ffffff' }}>Preço</IonCol>
          </IonRow>

          <IonRow>
            <IonCol>aaaaa</IonCol>
            <IonCol>3.99</IonCol>
          </IonRow>

          <IonRow>
            <IonCol>bbbbb</IonCol>
            <IonCol>3.99</IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </>
  );
};

export default ShoppingCart;

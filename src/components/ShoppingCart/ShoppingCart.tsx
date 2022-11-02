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

const ShoppingCart = () => {
  return (
    <>
      <IonList>
        <IonListHeader>
          <IonLabel>Totais</IonLabel>
        </IonListHeader>

        <IonItem>
          <IonLabel>Budget</IonLabel>
          <IonInput placeholder="9999.99"></IonInput>
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
          <IonLabel>Nome</IonLabel>
          <IonInput placeholder="1kg de arroz"></IonInput>
        </IonItem>

        <IonItem>
          <IonLabel>Preço</IonLabel>
          <IonInput placeholder="3.99"></IonInput>
        </IonItem>

        <IonItem>
          <IonButton style={{ width: '100%' }}>Adicionar</IonButton>
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

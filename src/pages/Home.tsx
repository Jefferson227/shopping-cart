import {
  IonButtons,
  IonContent,
  IonHeader,
  IonMenu,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import './Home.css';
import ShoppingCart from '../components/ShoppingCart/ShoppingCart';
import { useRef } from 'react';

const Home: React.FC = () => {
  const page = useRef(undefined);

  return (
    <>
      <IonMenu contentId="main-content">
        <IonHeader>
          <IonToolbar>
            <IonTitle>Menu Content</IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonContent className="ion-padding">
          This is the menu content.
        </IonContent>
      </IonMenu>

      <IonPage id="main-content" ref={page}>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonMenuButton></IonMenuButton>
            </IonButtons>
            <IonTitle>Shopping Cart</IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonContent fullscreen>
          <IonHeader collapse="condense">
            <IonToolbar>
              <IonTitle size="large">Shopping Cart</IonTitle>
            </IonToolbar>
          </IonHeader>

          <ShoppingCart page={page} />
        </IonContent>
      </IonPage>
    </>
  );
};

export default Home;

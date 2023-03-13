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
import IonMenuContainer from '../components/IonMenuContainer/IonMenuContainer';

const Home: React.FC = () => {
  const page = useRef(undefined);

  return (
    <>
      <IonMenuContainer contentId="main-content" />

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

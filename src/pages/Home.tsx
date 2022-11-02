import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import './Home.css';
import ShoppingCart from '../components/ShoppingCart/ShoppingCart';

const Home: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Shopping Cart</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Shopping Cart</IonTitle>
          </IonToolbar>
        </IonHeader>

        <ShoppingCart />
      </IonContent>
    </IonPage>
  );
};

export default Home;

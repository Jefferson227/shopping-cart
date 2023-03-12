import {
  IonContent,
  IonHeader,
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
    <IonPage ref={page}>
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

        <ShoppingCart page={page} />
      </IonContent>
    </IonPage>
  );
};

export default Home;

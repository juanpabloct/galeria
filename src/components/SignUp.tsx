import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import {
  IonPage,
  IonContent,
  IonInput,
  IonButton,
  IonTitle
} from '@ionic/react';
import { useAuth } from '../context/AuthContext';
import { server } from '../contants';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const history = useHistory();

  const handleSignUp = async () => {
    try {
      const _ = await fetch(server + 'newUser/', {
        method: 'POST',
        body: JSON.stringify({
          email,
          password
        })
      });
      login();
      history.push('/');
    } catch (error) {
      alert('Contraseña debe tener al menos 6 caracteres');
    }
  };

  return (
    <IonPage>
      <IonContent className='ion-padding'>
        <IonTitle className='ion-text-center'>Registro</IonTitle>
        <IonInput
          placeholder='Correo electrónico'
          onIonChange={(e) => setEmail(e.detail.value!)}
        />
        <IonInput
          type='password'
          placeholder='Contraseña'
          onIonChange={(e) => setPassword(e.detail.value!)}
        />
        <IonButton expand='full' onClick={handleSignUp}>
          Registrarse
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default SignUp;

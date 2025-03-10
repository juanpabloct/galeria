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

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const history = useHistory();

  const handleSignIn = async () => {
    try {
      const loginServer = await (
        await fetch(server + 'login/', {
          method: 'POST',
          body: JSON.stringify({
            email,
            password
          })
        })
      ).json();
      console.log(loginServer);
      // localStorage.setItem("" ,token);
      login();
      history.push('/');
    } catch (err) {
      alert('Credenciales incorrectas');
    }
  };

  return (
    <IonPage>
      <IonContent className='ion-padding'>
        <IonTitle className='ion-text-center'>Iniciar Sesión</IonTitle>
        <IonInput
          placeholder='Correo electrónico'
          onIonChange={(e) => setEmail(e.detail.value!)}
        />
        <IonInput
          type='password'
          placeholder='Contraseña'
          onIonChange={(e) => setPassword(e.detail.value!)}
        />
        <IonButton expand='full' onClick={handleSignIn}>
          Iniciar Sesión
        </IonButton>

        {/* Contenedor centrado */}
        <div style={{ textAlign: 'center', marginTop: '10px' }}>
          <IonButton fill='clear' onClick={() => history.push('/signup')}>
            ¿No tienes cuenta?
          </IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default SignIn;

    //vista inicio de sesión signIn
    import {
        setDoc, doc, db,
        auth, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider
    } from '../firebase/firebaseconfig.js';
  
import{createNewUser}from './signup.js'

    export const formSignIn = () => {
        const  signInContent = `
        <section class="back-principal">
            <div id="seccion1" class="divs2">
                <img src="img/viajeros.png" width="200px"/>
                <h2 class="bienvenidos"> Bienvenidos a Viajeros </h2>
                <form id="signInForm" class="formulario">
                <button type="submit" id="btn-signin-google"><i class="fa fa-google"></i> Sign In with Google</button>
                <input type="text" placeholder="Email" id = "email">
                <input type="password" placeholder="Contraseña" id = "password">
                <button type="submit" id ="btn-signin"><a href = "#/home">Inicia Sesión</a></button>
                    
                <p>¿No tienes una cuenta? <a href = "#/signup">Registrate</a></p>
                </form>
            </div>
            <div id="seccion2" class="divs2"></div>
        </section>
        `;
        const signInContainer = document.createElement('div');
        signInContainer.innerHTML = signInContent;
        signInContainer.querySelector('#btn-signin').addEventListener('click', signInHandler);
        signInContainer.querySelector('#btn-signin-google').addEventListener('click', signInGoogleHandler);

        return signInContainer;
    };

    export const signInHandler = (e) => {
        e.preventDefault();
        const signInForm = document.querySelector('#signInForm');
        const email = signInForm['email'].value;
        const password = signInForm['password'].value;
        console.log(email + ' y ' + password)

        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Agregar nvo user
            const user=userCredential.user;
            const emailRegister = userCredential.user.email;
            const userIdRegister = userCredential.user.uid;
            console.log(userCredential);
            console.log(emailRegister, userIdRegister);
            alert('usuario autentificado');
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log('error en signup', errorMessage, errorCode);
        });
    }

    const provider = new GoogleAuthProvider();
    export const signInGoogleHandler = (e) => {
        e.preventDefault();
        signInWithPopup(auth, provider)
        .then((result) => {
            // The signed-in user info.
            const user = result.user;
            const name = user.displayName;
            const emailRegister = user.email;
            const userIdRegister = user.uid;

            console.log(emailRegister, userIdRegister);
            console.log(result);
            createNewUser(name, emailRegister, userIdRegister);
        })
        .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log('error en signup', errorMessage, errorCode);

        // The email of the user's account used.
        //const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
        });

    };
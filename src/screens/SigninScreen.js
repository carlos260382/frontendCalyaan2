/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link,NavLink } from 'react-router-dom';
import { signin } from '../actions/userActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import styles from '../style/SigninScreen.module.css';
import logo from '../assent/logo.png';

export default function SigninScreen(props) {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const redirect = props.location.search
		? props.location.search.split('=')[1]
		: '/';

	const userSignin = useSelector(state => state.userSignin);
	const { userInfo, loading, error } = userSignin;

	const dispatch = useDispatch();
	const submitHandler = e => {
		e.preventDefault();
		dispatch(signin(email, password));
	};
	useEffect(() => {
		if (userInfo) {
			props.history.push(redirect);
		}
	}, [props.history, redirect, userInfo]);
	return (
		<div className={styles.container}>
			<div className={styles.logo}>
					<NavLink to='/'>
						
							<img src={logo} alt='imagen principal' />
						
					</NavLink>
				</div>
			<form className='form' onSubmit={submitHandler}>
				<div className={styles.inicio}>
					<h1>Iniciar sesión</h1>
				</div>
				{loading && <LoadingBox></LoadingBox>}
				{error && <MessageBox variant='danger'>{error}</MessageBox>}
				<div>
					<label htmlFor='email'>Email</label>
					<input
						type='email'
						id='email'
						placeholder='Ingrese su email'
						required
						onChange={e => setEmail(e.target.value)}
					></input>
				</div>

				<div className={styles.mail} >
					<label htmlFor='password'>Contraseña</label>
					<input 
						type='password'
						id='password'
						placeholder='Ingrese su contraseña'
						required
						onChange={e => setPassword(e.target.value)}
					></input>
				</div>
				
				
				<label>
                Recordar contraseña: <br/>
                <input type="checkbox" name="checkbox"/>
            	</label>

				
				<div>
					<label />
					<button type='submit'>Iniciar sesión</button>
				</div>
				<div>
					<label />
					<div className={styles.register}>
					<div className={styles.register}>
						<Link to={`/recoverPassword`}>¿Olvidaste tu contraseña?</Link>
					</div><br/>
						¿No tienes una cuenta?<br/> <Link to={'/register/01'}>Regístrate gratis.</Link>
					</div>

				</div>
			</form>
		</div>
	);
}

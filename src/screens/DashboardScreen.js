// eslint-disable-next-line no-unused-vars
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Chart from 'react-google-charts';
import { summaryOrder } from '../actions/orderActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import styles from '../style/DashboardScreen.module.css';

export default function DashboardScreen() {
	const orderSummary = useSelector(state => state.orderSummary);
	const { loading, summary, error } = orderSummary;
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(summaryOrder());
	}, [dispatch]);
	return (
		<div className={styles.container}>
			<div className='row'>
				<h1>Dashboard</h1>
			</div>
			{loading ? (
				<LoadingBox />
			) : error ? (
				<MessageBox variant='danger'>{error}</MessageBox>
			) : (
				<>
					<ul className='row summary'>
						<li>
							<div className='summary-title color1'>
								<span>
									<i className='fa fa-users' /> Usuarios
								</span>
							</div>
							<div className='summary-body'>{summary.users[0].numUsers}</div>
						</li>
						<li>
							<div className='summary-title color2'>
								<span>
									<i className='fa fa-shopping-cart' /> Pedidos
								</span>
							</div>
							<div className='summary-body'>
								{summary.orders[0] ? summary.orders[0].numOrders : 0}
							</div>
						</li>
						<li>
							<div className='summary-title color3'>
								<span>
									<i className='fa fa-money' /> Ventas
								</span>
							</div>
							<div className='summary-body'>
								$
								{summary.orders[0]
									? summary.orders[0].totalSales.toFixed(2)
									: 0}
							</div>
						</li>
					</ul>
					<div>
						<div>
							<h2>Ventas</h2>
							{summary.dailyOrders.length === 0 ? (
								<MessageBox>Sin ventas</MessageBox>
							) : (
								<Chart
									width='100%'
									height='400px'
									chartType='AreaChart'
									loader={<div>Grafico</div>}
									data={[
										['Date', 'Sales'],
										...summary.dailyOrders.map(x => [x._id, x.sales]),
									]}
								></Chart>
							)}
						</div>
					</div>
					<div>
						<h2>Categorias</h2>
						{summary.serviceCategories.length === 0 ? (
							<MessageBox>Sin Categorias</MessageBox>
						) : (
							<Chart
								width='100%'
								height='400px'
								chartType='PieChart'
								loader={<div>Grafico de Cargas</div>}
								data={[
									['Category', 'Products'],
									...summary.serviceCategories.map(x => [x._id, x.count]),
								]}
							/>
						)}
					</div>
				</>
			)}
		</div>
	);
}

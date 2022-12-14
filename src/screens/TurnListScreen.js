// eslint-disable-next-line no-unused-vars
import React, { useEffect } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
// import { Carousel } from 'react-responsive-carousel';
// import Turn from "../components/Turn";
import TurnCard from "../components/TurnCard.js";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { useDispatch, useSelector } from "react-redux";
import { listTurns } from "../actions/turnAction";
import styles from "../style/ServiceListScreen.module.css";

// import { listTopSellers } from '../actions/userActions';
// import { Link } from 'react-router-dom';

export default function TurnListScreen() {
  const dispatch = useDispatch();
  const turnList = useSelector((state) => state.turnList);
  const { loadingTurn, error, turns } = turnList;

  // const userTopSellersList = useSelector((state) => state.userTopSellersList);
  // const {
  //   loading: loadingSellers,
  //   error: errorSellers,
  //   users: sellers,
  // } = userTopSellersList;

  useEffect(() => {
    dispatch(listTurns());
    // dispatch(listTopSellers());
  }, [dispatch]);

  console.log("turnos", turns);
  return (
    <div className={styles.container}>
      <h2>Lista de Turnos</h2>
      {loadingTurn ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <>
          {turns.length === 0 && (
            <MessageBox>No se encontró ningún turno</MessageBox>
          )}
          <div className="row center">
            {turns?.map((turn) => (
              <TurnCard key={turn._id} turn={turn}></TurnCard>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

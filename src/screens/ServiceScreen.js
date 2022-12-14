/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { createReview, detailsService } from "../actions/serviceActions";
import { addToCart } from "../actions/cartActions.js";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import Rating from "../components/Rating";
import { SERVICE_REVIEW_CREATE_RESET } from "../constants/serviceConstants";
import Swal from "sweetalert2";
import styles from "../style/ServiceScreen.module.css";

export default function ServiceScreen(props) {
  const dispatch = useDispatch();
  const serviceId = props.match.params.id;
  // const [qty, setQty] = useState(1);
  const serviceDetails = useSelector((state) => state.serviceDetails);
  const { loading, error, service } = serviceDetails;
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  const serviceReviewCreate = useSelector((state) => state.serviceReviewCreate);
  const {
    loading: loadingReviewCreate,
    error: errorReviewCreate,
    success: successReviewCreate,
  } = serviceReviewCreate;

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  useEffect(() => {
    if (successReviewCreate) {
      window.alert("Review Submitted Successfully");
      setRating("");
      setComment("");
      dispatch({ type: SERVICE_REVIEW_CREATE_RESET });
    }
    dispatch(detailsService(serviceId));
  }, [dispatch, serviceId, successReviewCreate]);
  const addToCartHandler = () => {
    if (serviceId) {
      dispatch(addToCart(serviceId, 1));
    }

    props.history.push("/signin?redirect=cart");
    // props.history.push(`/cart/${serviceId}?qty=${qty}`);
  };
  const submitHandler = (e) => {
    e.preventDefault();
    if (comment && rating) {
      dispatch(
        createReview(serviceId, { rating, comment, name: userInfo.name })
      );
    } else {
      Swal.fire("Por favor ingrese comentario y calificaci??n");
    }
  };

  return (
    <div className={styles.container}>
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <div>
          <div className={styles.container1}>
            <div className={styles.col1}>
              <img src={service.image} alt={service.name}></img>
            </div>
            <div className={styles.col2}>
              <ul>
                <li>
                  <h1>{service.name}</h1>
                </li>
                {/* <li>
                  <Rating
                    rating={service.rating}
                    numReviews={service.numReviews}
                  ></Rating>
                </li> */}
                <li>Precio : ${service.price}</li>
                <li>
                  Descripci??n:
                  <p className={styles.p}>{service.description}</p>
                </li>
                <div>
                  {/* <div className={styles.price}>
                  <span>Precio</span>
                  <div className={styles.price}>${service.price}</div>
                </div> */}

                  {service.countInStock > 0 && (
                    <div className={styles.btn}>
                      <button onClick={addToCartHandler}>
                        Completa tu pedido
                      </button>
                    </div>
                  )}
                </div>
              </ul>
            </div>
          </div>
          <div className={styles.back}>
            <Link to="/">Volver al Inicio</Link>
          </div>
          <div className={styles.rese??as}>
            <h2>Rese??as</h2>
            {service.reviews.length === 0 && (
              <MessageBox>
                <h2>No hay Rese??as</h2>
              </MessageBox>
            )}
            <ul>
              {service.reviews.map((review) => (
                <li key={review._id}>
                  <strong>{review.name}</strong>
                  <Rating rating={review.rating} caption=" "></Rating>
                  <p>{review.createdAt.substring(0, 10)}</p>
                  <p>{review.comment}</p>
                </li>
              ))}
            </ul>
          </div>
          <div className={styles.form1}>
            {userInfo ? (
              <>
                <h2>Escribe una rese??a</h2>
                <form onSubmit={submitHandler}>
                  <div className={styles.rating}>
                    <div>
                      <label htmlFor="rating">Rating</label>
                      <select
                        id="rating"
                        value={rating}
                        onChange={(e) => setRating(e.target.value)}
                      >
                        <option value="">Selecciona</option>
                        <option value="1">1- Bajo</option>
                        <option value="2">2- Medio</option>
                        <option value="3">3- Bueno</option>
                        <option value="4">4- Muy Bueno</option>
                        <option value="5">5- Excelente</option>
                      </select>
                    </div>
                  </div>
                  <div className={styles.textarea}>
                    <label>Comentario</label>
                    <textarea
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                    ></textarea>

                    <div className={styles.ContenBtn}>
                      <label />
                      <button className={styles.btnForm} type="submit">
                        Enviar
                      </button>
                    </div>
                  </div>
                  <div>
                    {loadingReviewCreate && <LoadingBox></LoadingBox>}
                    {errorReviewCreate && (
                      <MessageBox variant="danger">
                        {errorReviewCreate}
                      </MessageBox>
                    )}
                  </div>
                </form>
              </>
            ) : (
              <MessageBox>
                Por favor <Link to="/signin">Inicie sesi??n</Link> Para escribir
                una rese??a
              </MessageBox>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listUsersProfessional } from "../actions/userActions";
import Axios from "axios";

import styles from "../style/ServiceListScreen.module.css";

export default function ProfessionalReport() {
  const [userSeller, setUserseller] = useState();

  //const sellerMode = props.match.path.indexOf("/seller") >= 0;
  //   const orderList = useSelector((state) => state.orderList);
  //   const { loading, error, orders } = orderList;
  // const orderDelete = useSelector((state) => state.orderDelete);
  //   const {
  //     loading: loadingDelete,
  //     error: errorDelete,
  //     success: successDelete,
  //   } = orderDelete;

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  //   const userListProfessional = useSelector(
  //     (state) => state.userListProfessional
  //   );
  //   const { loading, error, usersProfessional } = userListProfessional;

  const dispatch = useDispatch();

  const getUserProfessional = async () => {
    try {
      const { data } = await Axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/api/users/professional`,
        {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        }
      );
      console.log("data", data);
      setUserseller(data);
    } catch (error) {
      console.log(error);
    }
  };

  dispatch(listUsersProfessional());

  useEffect(() => {
    getUserProfessional();
  }, []);

  //   const deleteHandler = (order) => {
  //     if (window.confirm("¿Desea eliminar el pedido?")) {
  //       if (dispatch(deleteOrder(order._id))) {
  //         setTimeout(() => {
  //           window.location.replace("");
  //         }, 2000);
  //       }
  //     }
  //   };

  //   const changeToDo = (order) => {
  //     if (window.confirm("¿Va confirmar que realizo el servicio?")) {
  //       if (dispatch(deliverOrder(order._id))) {
  //         setTimeout(() => {
  //           window.location.replace("");
  //         }, 2000);
  //       }
  //     }
  //     window.location.replace("");
  //   };

  //   const changePay = (order) => {
  //     if (window.confirm("¿Confirma que el servicio fue pagado?")) {
  //       if (dispatch(payOrder(order._id))) {
  //         setTimeout(() => {
  //           window.location.replace("");
  //         }, 2000);
  //       }
  //     }
  //     window.location.replace("");
  //   };
  console.log("profesionales", userSeller);
  return (
    <div className={styles.container}>
      <h1>LISTA DE PROFESIONALES</h1>
    </div>
  );
}

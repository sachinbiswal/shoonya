import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import retreatPageCSS from "./retreatPage.module.css";
import { getRetreatDataService } from "../../services/retreatsServices";

export const RetreatPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [retreat, setRetreat] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const response = await getRetreatDataService(id);
        if (response?.status === 200) {
          setRetreat(response?.data);
        }
      } catch (e) {
        console.log(e);
      }
    })();
  }, [id]);

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const retreatDate = new Date(retreat?.date * 1000);

  const redirectToHome = () => {
    navigate('/');
  };

  return (
    <div className={retreatPageCSS.card}>
      <div>
        <img src={retreat?.image} alt={retreat?.title} />
      </div>
      <div className={retreatPageCSS.contents}>
        <h2>{retreat?.title}</h2>
        <p>{retreat?.description}</p>
        <span>
          <span className={retreatPageCSS.description}>Type:</span> {retreat?.type}
        </span>
        <span>
          <span className={retreatPageCSS.description}>Date:</span>
          {`${months[retreatDate.getUTCMonth()]} ${retreatDate.getUTCDate()}-${
            retreatDate.getUTCDate() + retreat?.duration
          } ,${retreatDate.getUTCFullYear()}`}
        </span>
        <span>
          <span className={retreatPageCSS.description}>Duration:</span> {retreat?.duration} days
        </span>
        <span>
          <span className={retreatPageCSS.description}>Price:</span> ${retreat?.price}
        </span>
        <span>
          <span className={retreatPageCSS.description}>Location:</span> {retreat?.location}, India
        </span>
        <div>
          {retreat?.tag?.map((ele, i) => (
            <span key={i} className={retreatPageCSS.tags}>
              #{ele}
            </span>
          ))}
        </div>
        <button onClick={redirectToHome} className={retreatPageCSS.backButton}>Back to Home</button>
      </div>
    </div>
  );
};

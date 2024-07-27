import { useNavigate } from "react-router-dom";
import { PageButtons } from "../../components/pageButtons/pageButtons";
import { RetreatCard } from "../../components/retreatCard/retreatCard";
import { useRetreats } from "../../context/retreatContext";
import HomepageCSS from "./homePage.module.css"
import { Filter } from "../../components/filter/filter";


export const HomePage = () => {
  const { retreatState, retreatDispatch, retreatsByType, searchRetreat, searchByDate } = useRetreats();
  const navigate = useNavigate();

  return (
    <>
      <div className="heroContainer">
        <h2>Meditation is Life</h2>
        <i>
          “The rhythm of the body, the melody of the mind, and the harmony of the soul create the symphony of life.” - B.K.S. Iyengar
        </i>
      </div>
      <Filter
        typeOptions={retreatState.types}
        dateOptions={retreatState.allYears}
        onTypeChange={(type) => retreatsByType(type)}
        onSearch={(text) => searchRetreat(text)}
        onDateChange={(date) => searchByDate(date)}
      />
      <div className={HomepageCSS.cardContainer}>
        {retreatState.data.length > 0 ? (
          retreatState.data.map((data) => (
            <RetreatCard
              key={data.id}
              {...data}
              handleClick={() => navigate(`/retreats/${data.id}`)}
            />
          ))
        ) : (
          <p>No retreats found.</p>
        )}
      </div>
      <PageButtons
        currentPage={retreatState.page}
        onNext={() => {
          if (retreatState.data.length > 0) {
            retreatDispatch({ type: "PAGE", value: retreatState.page + 1 });
          }
        }}
        onPrevious={() => {
          if (retreatState.page > 1) {
            retreatDispatch({ type: "PAGE", value: retreatState.page - 1 });
          }
        }}
        disableNext={retreatState.data.length < 3}
      />
    </>
  );
};

import { createContext, useContext, useEffect, useReducer } from "react";
import { initalState, retreatReducer } from "../reducer/retreatReducer";
import {
  getAllRetreats,
  getRetreatsService,
  searchRetreatsByTypeService,
} from "../services/retreatsServices";
import { debouncedFilter, debouncedSearch } from "../utils/debounceSearch";

const RetreatContext = createContext();

export const RetreatProvider = ({ children }) => {
  const [retreatState, retreatDispatch] = useReducer(
    retreatReducer,
    initalState
  );
  const { page, sortByDate, sortByType, search, allData } = retreatState;
  useEffect(() => {
    (async () => {
      try {
        const response = await getAllRetreats();
        if (response?.status === 200) {
          retreatDispatch({ type: "SET_ALL", value: response?.data });
        }
      } catch (e) {
        console.log(e);
      }
    })();
  }, []);
  useEffect(() => {
    if (sortByDate === "" && sortByType === "" && search === "") {
      (async () => {
        try {
          const response = await getRetreatsService(page);
          if (response?.status === 200) {
            retreatDispatch({ type: "LOAD", value: response?.data });
          }
        } catch (e) {
          console.log(e);
        }
      })();
    } else if (sortByDate !== "" && sortByType !== "" && search !== "") {
      console.log(Number(sortByDate) + 1);
      const data = allData.filter((retreat) => {
        const retreatDate = new Date(retreat.date * 1000);
        const retreatYear = retreatDate.getUTCFullYear();

        // Check if the retreat is within the specified date range
        const isWithinDateRange =
          retreatYear >= Number(sortByDate) &&
          retreatYear <= Number(sortByDate) + 1;

        // Case-insensitive keyword search
        const lowerSearch = search.toLowerCase();
        const isKeywordMatch =
          retreat.title.toLowerCase().includes(lowerSearch) ||
          retreat.description.toLowerCase().includes(lowerSearch) ||
          retreat.location.toLowerCase().includes(lowerSearch);

        // Return true if both conditions are met
        return isWithinDateRange && isKeywordMatch;
      });
      const itemsPerPage = 3;
      const start = (page - 1) * itemsPerPage;
      const end = start + itemsPerPage - 1;
      retreatDispatch({ type: "LOAD", value: data.slice(start, end) });
    } else if (search !== "" && sortByType !== "") {
      (async () => {
        try {
          const response = await debouncedFilter(search, sortByType, page);
          if (response?.status === 200) {
            retreatDispatch({ type: "LOAD", value: response?.data });
          }
        } catch (e) {
          console.log(e);
        }
      })();
    } else if (search !== "") {
      (async () => {
        try {
          const response = await debouncedSearch(search, page);
          if (response?.status === 200) {
            retreatDispatch({ type: "LOAD", value: response?.data });
          }
        } catch (e) {
          console.log(e);
        }
      })();
    } else if (sortByType !== "") {
      (async () => {
        try {
          const response = await searchRetreatsByTypeService(sortByType, page);
          if (response?.status === 200) {
            retreatDispatch({ type: "LOAD", value: response?.data });
          }
        } catch (e) {
          console.log(e);
        }
      })();
    }
  }, [page, sortByDate, sortByType, search,allData]);

  const searchByDate = (date) => {
    retreatDispatch({ type: "SORT_BY_DATE", value: date });
  };

  const retreatsByType = (type) => {
    retreatDispatch({ type: "SORT_BY_TYPE", value: type });
  };
  const searchRetreat = (search) => {
    retreatDispatch({ type: "SEARCH", value: search });
  };
  return (
    <RetreatContext.Provider
      value={{
        retreatState,
        retreatDispatch,
        searchByDate,
        retreatsByType,
        searchRetreat,
      }}
    >
      {children}
    </RetreatContext.Provider>
  );
};

export const useRetreats = () => useContext(RetreatContext);

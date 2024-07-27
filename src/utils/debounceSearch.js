import { getFilteredRetreatsService, searchRetreatsService } from "../services/retreatsServices";

const debounceSearch=(cb,delay)=>{
    let timerId;
    let controller;
    return function(...args){
      return new Promise((res, rej) => {
        if (controller) {
          controller.abort();
        }
        clearTimeout(timerId);
        controller = new AbortController();
        timerId = setTimeout(async () => {
          try {
            const result = await cb.apply(this, [
              ...args,
              { signal: controller.signal },
            ]);
            res(result);
          } catch (e) {
            rej(e);
          }
        }, delay);
      });
    }
  }

  export const debouncedSearch=debounceSearch(searchRetreatsService,1000);
  export const debouncedFilter=debounceSearch(getFilteredRetreatsService,1000);
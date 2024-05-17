interface Movie {
    Title: string;
    Year: string;
    imdbID: string;
    Type: string;
    Poster: string;
    Rating: number;
  }

const FILTERS_AND_SORTS = {
    sortBy: (str: string, arr: Movie[])=>{
        if (str == "raiting") {
            return arr.sort((a: any, b: any) => b.Rating - a.Rating);
          } else if (str == "year") {
            return arr.sort((a: any, b: any) => b.Year - a.Year);
          } else {
            return arr;
          }
    },
    filterByRaiting: (from: any, to: any, arr: Movie[]) =>{
        if(from > 0 || to > 0) {
            return arr.filter((item)=> {
                return item.Rating >= from && item.Rating <= to;
            })
        }
        return arr
    },

    filterByYear: (from: any, to: any, arr: Movie[]) =>{
        if(from > 0 || to > 0) {
            return arr.filter((item)=> {
                return item.Year >= from && item.Year <= to;
            })
        }
        return arr
    },

    applyFiltersAndSorts: (arr: Movie[], functions: any) => {
        for (const fn of functions) {
            arr = fn(arr)
        }
        return arr
    } 

}

export default FILTERS_AND_SORTS
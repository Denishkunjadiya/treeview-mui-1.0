import data from "../pages/data";

export const FETCH_DATA = 'FETCH_DATA';

export const fetchData = () => {
    data()
    return {
        type: FETCH_DATA,
        payload: fetchData,
    }
}
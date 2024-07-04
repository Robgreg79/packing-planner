import axios from "axios";
import { Weather } from "../models/weather";

const BASE_URL = "http://127.0.0.1:5001/gc-packing-planner/us-central1/api";

interface AutocompleteResult {
    Key: string;
    LocalizedName: string;
}

interface ForecastResult {
    DailyForecasts: Weather[];
}

export const getAutocompleteSuggestions = async (query: string): Promise<AutocompleteResult[]> => {
    return (await axios.get(`${BASE_URL}/autocomplete?q=${query}`)).data;
};

export const fetchOneDayForecastByLocation = async (locationKey: string): Promise<ForecastResult> => {
    return (await axios.get(`${BASE_URL}/forecast/1day/${locationKey}`)).data;
};

export const fetchFiveDayForecastByLocation = async (locationKey: string): Promise<ForecastResult> => {
    return (await axios.get(`${BASE_URL}/forecast/5day/${locationKey}`)).data;
};

import FoodEntry from "./domain/FoodEntry";
import axios from "axios";

class FoodConnector {
    getFoodByIdContaining = async (text) => {
        console.log('getFoodByIdContaining', text);

        const response = await axios.get('http://localhost:8080/food?id=' + text);
        const foods = [];
        const jsons = await response.data;
        for (const j of jsons) {
            foods.push(j);
        }

        return foods;
    }

    getFoodEntries = async () => {
        console.log('getFoodEntries')

        const response = await axios.get('http://localhost:8080/food-entry/all');
        const foodEntries = [];
        const jsons = await response.data;
        for (const j of jsons) {
            foodEntries.push(new FoodEntry(j));
        }
        console.log(foodEntries)
        return foodEntries;
    }

    postFoodEntry = async (foodEntry) => {
        console.log('postFoodEntry', foodEntry)
        const response = await axios.post('http://localhost:8080/food-entry', foodEntry);
        return response.data; // id: number
    }

    removeFoodEntry = async (foodEntry) => {
        console.log('removeFoodEntry', foodEntry)
        const response = await axios.delete('http://localhost:8080/food-entry/' + foodEntry.id);
        return response.data;
    }
}

const foodConnector = new FoodConnector();

export default foodConnector;
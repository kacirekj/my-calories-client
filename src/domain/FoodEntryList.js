import FoodEntry from "./FoodEntry";

class FoodEntryList {
    static sortByDateDesc(foodEntries) {
        foodEntries.sort(function (a, b) {
            if (a.date < b.date) {
                return 1;
            }
            if (a.date > b.date) {
                return -1;
            }
            if (a.id < b.id) {
                return -1;
            }
            if (a.id > b.id) {
                return 1;
            }
            return 0;
        })
    }

    static getTotalCalories(foodEntries) {
        let sum = 0;
        foodEntries.forEach(foodEntry => sum += FoodEntry.getTotalCalories(foodEntry));
        return FoodEntry.round(sum);
    }
}

export default FoodEntryList;
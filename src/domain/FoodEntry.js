class FoodEntry {
    constructor(json) {
        Object.assign(this, json);
        this.isEdit = false;
    }

    static getTotalCalories(foodEntry) {
        return FoodEntry.round(foodEntry.amount / 100 * foodEntry.food.calories);
    }

    static getCzechDate(foodEntry) {
        return foodEntry.date.toISOString().slice(0, 10);
    }

    static round(val) {
        if (val < 10) {
            return Math.round(val * 10) / 10
        } else if (val < 1000) {
            return Math.round(val);
        } else {
            return Math.round(val / 10) * 10;
        }
    }

}

export default FoodEntry;
import './App.css';
import {BrowserRouter, Link, Route, Switch} from "react-router-dom";
import {Fragment, useEffect, useState, memo} from "react";
import foodConnector from "./FoodConnector";
import FoodEntry from "./domain/FoodEntry";
import FoodEntryList from "./domain/FoodEntryList";

function App() {
    const [foodEntriesGroupByDate, setFoodEntriesGroupByDate] = useState({});

    useEffect(() => {
            console.log(App.name, useEffect.name)
            foodConnector.getFoodEntries().then(fe => {
                console.log('foodConnector.getFoodEntries');
                setFoodEntriesGroupByDate(
                    fe.reduce(
                        (result, foodEntry) => {
                            if (!result[foodEntry.date]) {
                                result[foodEntry.date] = [];
                            }
                            result[foodEntry.date].push(foodEntry);
                            return result;
                        },
                        {}
                    )
                );
            })
        }, []
    )

    return (
        <div>
            <BrowserRouter>
                <nav className="navbar navbar">
                    <ul className="nav">
                        <li>
                            <Link to="/">Zaznamy</Link>
                        </li>
                        <li>
                            <Link to="/category">Potraviny</Link>
                        </li>
                        <li>
                            <Link to="/products">Uzivatele</Link>
                        </li>
                    </ul>
                </nav>
                <Switch>
                    <Route exact path="/">
                        <FoodEntriesPage foodEntriesGroupByDate={foodEntriesGroupByDate}/>
                    </Route>
                </Switch>
            </BrowserRouter>
        </div>
    );
}

const FoodEntriesPage = (props) => {
    return (
        <div>
            <h2>Zaznamy</h2>
            <FoodEntriesTable foodEntriesGroupByDate={props.foodEntriesGroupByDate}/>
        </div>
    )
};

const FoodEntriesTable = (props) => {
    return (
        <table>
            <thead>
            <tr>
                <th>Datum</th>
                <th>Potravina</th>
                <th>Mnozstvi</th>
                <th>Energie</th>
                <th>Akce</th>

            </tr>
            </thead>
            <tbody>
            <FoodEntriesTableSearchFood/>

            {Object.keys(props.foodEntriesGroupByDate).map(date => (
                    <FoodEntriesTableDay key={date} date={date} foodEntries={props.foodEntriesGroupByDate[date]}/>
                )
            )}
            </tbody>
        </table>
    )
}

const FoodEntriesTableDay = (props) => {
    const [foodEntries, setFoodEntries] = useState([]);
    const [totalCalories, setTotalCalories] = useState(0);
    const [isExpand, setIsExpand] = useState(false);

    useEffect(() => {
        console.log(FoodEntriesTableDay.name, useEffect.name, 0)
        setFoodEntries(props.foodEntries);
    }, [props.foodEntries])

    useEffect(() => {
        console.log(FoodEntriesTableDay.name, useEffect.name, 1)
        setTotalCalories(FoodEntryList.getTotalCalories(foodEntries))
    }, [foodEntries])

    const updateFoodEntry = (changedFoodEntry) => {
        console.log(FoodEntriesTableDay.name, updateFoodEntry.name);
        setFoodEntries(foodEntries.map(foodEntry => changedFoodEntry.id === foodEntry.id ? changedFoodEntry : foodEntry))
    }

    const removeFoodEntry = (removeFoodEntry) => {
        console.log(FoodEntriesTableDay.name, removeFoodEntry.name);
        setFoodEntries(foodEntries.filter(foodEntry => removeFoodEntry.id !== foodEntry.id))
    }

    const toggleExpand = () => {
        console.log(FoodEntriesTableDay.name, toggleExpand.name);
        setIsExpand(!isExpand);
    }

    return (
        <Fragment>
            <tr onClick={() => toggleExpand()}>
                <td>{props.date}</td>
                <td></td>
                <td></td>
                <td>{totalCalories}</td>
                <td>
                </td>

            </tr>
            {isExpand && foodEntries.map(foodEntry => (
                    <FoodEntriesTableDayRow key={foodEntry.id} foodEntry={foodEntry} onChange={updateFoodEntry}
                                            onRemove={removeFoodEntry}/>
                )
            )}
        </Fragment>
    )
}

const FoodEntriesTableSearchFood = (props) => {
    return (
        <tr>
            <td><input type="date"/></td>
            <td><Searchbox/></td>
            <td><input type="number"/></td>
            <td>0</td>
            <td><input type="button" value="+"/></td>
        </tr>
    )
}

const FoodEntriesTableDayRow = (props) => {
    const [totalCalories, setTotalCalories] = useState(FoodEntry.getTotalCalories(props.foodEntry));

    useEffect(() => {
        console.log(FoodEntriesTableDayRow.name, useEffect.name)
        setTotalCalories(FoodEntry.getTotalCalories(props.foodEntry))
    }, [props.foodEntry])

    const called = () => {
        console.log('Called!')
    }

    return (
        <tr>
            <td><input type="date" value={props.foodEntry.date}/></td>
            <td><Searchbox value={props.foodEntry.food.name}/></td>
            <td>
                <input type="number"
                       value={props.foodEntry.amount}
                       step={20}
                       onChange={(val) =>
                           props.onChange({...props.foodEntry, amount: val.target.value})
                       }/>
            </td>
            <td>{props.foodEntry.food.calories}</td>
            <td>{totalCalories}</td>
            <td>
                <input type="button" value="-" onClick={() => props.onRemove({...props.foodEntry})}/>
            </td>
        </tr>
    )
}


const Searchbox = (props) => {
    const [value, setValue] = useState(props.value)
    const [isExpand, setIsExpand] = useState(false)

    const toggleExpand = () => {
        console.log(Searchbox.name, toggleExpand.name);
        setIsExpand(!isExpand);
    }

    const onInputChange = (e) => {
        console.log(Searchbox.name, toggleExpand.name);
        setValue(e.target.value)
        setIsExpand(true);
    }

    const onInputBlur = (e) => {
        console.log(Searchbox.name, toggleExpand.name);
        setIsExpand(false);
    }

    const onPanelClick = (e) => {
        console.log(Searchbox.name, toggleExpand.name);
        setIsExpand(false);
    }

    return (
        <div className="searchbox">
            <input type="select" value={value} onChange={(e) => onInputChange(e)} onBlur={onInputBlur}/>
            {/*{isExpand && (*/}
            {/*    <div className="searchbox-items">*/}
            {/*        <table>*/}
            {/*            <tbody>*/}
            {/*            <tr>*/}
            {/*                <td>Ahoj</td>*/}
            {/*            </tr>*/}
            {/*            </tbody>*/}
            {/*        </table>*/}
            {/*    </div>*/}
            {/*)}*/}

        </div>
    )
}

export default App;
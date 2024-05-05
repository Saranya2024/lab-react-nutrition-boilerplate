import { Component } from "react";
import foodData from "../resources/FoodData";
import "./FoodBox.css";

class FoodBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      foodItems: foodData.map((food) => ({
        id: food.id,
        quantity: 0,
        totalCalories: 0,
      })),
      searchTerm: "",
    };
  }

  handleQuantityChange = (id, quantity) => {
    this.setState((prevState) => ({
      foodItems: prevState.foodItems.map((foodItem) =>
        foodItem.id === id
          ? { ...foodItem, quantity: quantity >= 0 ? quantity : 0 }
          : foodItem
      ),
    }));
  };

  handlePlusClick = (id) => {
    this.setState((prevState) => ({
      foodItems: prevState.foodItems.map((foodItem) =>
        foodItem.id === id
          ? {
              ...foodItem,
              quantity: foodItem.quantity + 1,
              totalCalories: (foodItem.quantity + 1) * foodData.find((food) => food.id === id).cal,
            }
          : foodItem
      ),
    }));
  };

  handleResetClick = (id) => {
    this.setState((prevState) => ({
      foodItems: prevState.foodItems.map((foodItem) =>
        foodItem.id === id ? { ...foodItem, quantity: 0, totalCalories: 0 } : foodItem
      ),
    }));
  };

  handleSearchChange = (e) => {
    this.setState({ searchTerm: e.target.value });
  };

  render() {
    const { foodItems, searchTerm } = this.state;
    const filteredFoodItems = foodItems.filter((foodItem) =>
      foodData.find((food) => food.id === foodItem.id).name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
      <div className="box">
        <div className="search-container">
          <p>Search</p>
          <input
            type="text"
            value={searchTerm}
            onChange={this.handleSearchChange}
          />
        </div>
        <div>
          {filteredFoodItems.map((foodItem) => {
            const { id, quantity, totalCalories } = foodItem;
            const { name, cal, img } = foodData.find((food) => food.id === id);
            return (
              <div key={id}>
                <div style={{ display: "flex" }}>
                  <div className="food-container">
                    <img src={img} alt={name} />
                    <div>
                      <p>{name}</p>
                      <p>{cal} calories</p>
                    </div>
                    <div className="input-container">
                      <input
                        type="number"
                        value={quantity}
                        onChange={(e) => this.handleQuantityChange(id, parseInt(e.target.value, 10))}
                      />
                      <button onClick={() => this.handlePlusClick(id)} className="plus-button">+</button>
                    </div>
                  </div>
                  <div className="total-calories-container">
                    <p>
                      {quantity} {name} = {totalCalories} calories
                    </p>
                    <button onClick={() => this.handleResetClick(id)}>Reset</button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default FoodBox;

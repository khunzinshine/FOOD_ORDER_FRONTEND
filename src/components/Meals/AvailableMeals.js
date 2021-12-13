import React, { useEffect, useState } from 'react';
import Card from '../UI/Card';
import MealItem from '../Meals/MealItem/MealItem';
import classes from './AvailableMeals.module.css';

const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMeals = async () => {
      const response = await fetch(
        'https://foodorderapp-12fa3-default-rtdb.asia-southeast1.firebasedatabase.app/meals.json'
      );
      const responseData = await response.json();
      const loadMeals = [];
      for (const key in responseData) {
        loadMeals.push({
          id: key,
          name: responseData[key].name,
          description: responseData[key].description,
          price: responseData[key].price,
        });
      }
      setMeals(loadMeals);
      setLoading(false)
    };
    fetchMeals();
  }, []);

  if(loading) {
      return <section className={classes.mealsLoading}>
          <h1>Loading...</h1>
      </section>
  }

  const mealsList = meals.map((meal) => (
    <MealItem
      key={meal.id}
      id={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));
  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;

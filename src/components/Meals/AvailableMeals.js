import React, { useEffect, useState } from 'react';
import Card from '../UI/Card';
import MealItem from '../Meals/MealItem/MealItem';
import classes from './AvailableMeals.module.css';

const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMeals = async () => {
      const response = await fetch(
        'https://foodorderapp-12fa3-default-rtdb.asia-southeast1.firebasedatabase.app/meals.json'
      );
      if(!response.ok) {
          throw new Error('Something went wrong!')
      }
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
    fetchMeals().catch((error) => {setLoading(false)
    setError(error.message)})
  }, []);

  if(loading) {
      return <section className={classes.mealsLoading}>
          <h1>Loading...</h1>
      </section>
  }

  if (error) {
    return <section className={classes.mealsError}>
    <p>{error}</p>
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

import { useEffect, useState } from 'react';

import Header from '../../components/Header';
import api from '../../services/api';
import Food from '../../components/Food';
import ModalAddFood from '../../components/ModalAddFood';
import ModalEditFood from '../../components/ModalEditFood';
import { FoodsContainer } from './styles';

interface FoodPropsAPI {
    id: number;
    isAvailable: boolean;
    image: string;
    name: string;
    description: string;
    price: string;
}

interface FoodProps {
    image: string;
    name: string;
    description: string;
    price: string;
}

function Dashboard() {

    const [foods, setFoods] = useState<FoodPropsAPI[]>([]);
    const [editingFood, setEditingFood] = useState({} as FoodPropsAPI);
    const [modalOpen, setModalOpen] = useState(false);
    const [editModalOpen, setEditModalOpen] = useState(false);

    useEffect(() => {
        async function fetchFoods() {
            const response = await api.get<FoodPropsAPI[]>('/foods');
            setFoods(response.data);
        }

        fetchFoods();  
    }, []);    

    async function handleAddFood(food: FoodProps) {
        try {
            const response = await api.post('/foods', {
                ...food,
                available: true,
            });

            setFoods([...foods, response.data])
        } catch (error) {
            console.log(error);
        }
    }

    async function handleUpdateFood(food: FoodProps) {
        try {
            const foodUpdated = await api.put(
                `/foods/${editingFood.id}`,
                { ...editingFood, ...food },
            );
    
            const foodsUpdated = foods.map(food =>
                food.id !== foodUpdated.data.id ? food : foodUpdated.data,
            );

            setFoods(foodsUpdated);
        } catch (error) {
            console.log(error);
        }
    }

    async function handleDeleteFood(id: number) {
        await api.delete(`/foods/${id}`);

        const foodsFiltered = foods.filter(food => food.id !== id);
    
        setFoods(foodsFiltered);
    }

    function toggleModal() {
        setModalOpen(!modalOpen);
    }

    function toggleEditModal() {
        setEditModalOpen(!editModalOpen);
    }

    function handleEditFood(food: FoodPropsAPI) {
        setEditingFood(food);
        setEditModalOpen(true);
    }

    return (
        <>
            <Header openModal={toggleModal} />

            <ModalAddFood
                isOpen={modalOpen}
                setIsOpen={toggleModal}
                handleAddFood={handleAddFood}
            />

            <ModalEditFood
                isOpen={editModalOpen}
                setIsOpen={toggleEditModal}
                editingFood={editingFood}
                handleUpdateFood={handleUpdateFood}
            />

            <FoodsContainer data-testid="foods-list">
                {foods &&
                    foods.map(food => (
                        <Food
                            key={food.id}
                            food={food}
                            handleDelete={handleDeleteFood}
                            handleEditFood={handleEditFood}
                        />
                    ))}
            </FoodsContainer>
        </>
    );
}

export default Dashboard;

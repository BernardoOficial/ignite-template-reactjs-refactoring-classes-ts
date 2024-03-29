import { useRef } from 'react';
import { FiCheckSquare } from 'react-icons/fi';
import { SubmitHandler, FormHandles } from '@unform/core'

import { Form } from './styles';
import Modal from '../Modal';
import Input from '../Input';

interface FoodProps {
    image: string;
    name: string;
    description: string;
    price: string;
}

interface ModalAddFoodProps {
    isOpen: boolean;
    editingFood: FoodProps;
    setIsOpen: () => void;
    handleUpdateFood: (food: FoodProps) => void;
}

interface FormData {
    image: string;
    name: string;
    description: string;
    price: string;
}

function ModalEditFood({ isOpen, setIsOpen, editingFood, handleUpdateFood }: ModalAddFoodProps) {

    const formRef = useRef<FormHandles>(null);

    const handleSubmit: SubmitHandler<FormData> = async (data: FormData) => {
        handleUpdateFood(data);
        setIsOpen();
    };

    return (
        <Modal isOpen={isOpen} setIsOpen={setIsOpen}>

            <Form ref={formRef} onSubmit={handleSubmit} initialData={editingFood}>

                <h1>Editar Prato</h1>

                <Input name="image" placeholder="Cole o link aqui" />
                <Input name="name" placeholder="Ex: Moda Italiana" />
                <Input name="price" placeholder="Ex: 19.90" />
                <Input name="description" placeholder="Descrição" />

                <button type="submit" data-testid="edit-food-button">
                    <div className="text">Editar Prato</div>
                    <div className="icon">
                        <FiCheckSquare size={24} />
                    </div>
                </button>

            </Form>

        </Modal>
    );
}


export default ModalEditFood;

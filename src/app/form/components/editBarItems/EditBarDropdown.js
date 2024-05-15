import { useContext } from "react";

import { v4 as uuidv4 } from 'uuid';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGripVertical, faTrash, faPlus } from "@fortawesome/free-solid-svg-icons";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

import FormActiveItemContext from "@/contexts/FormActiveItem";

export default function EditBarDropdown({ item }) {
    const { setFormActiveItem } = useContext(FormActiveItemContext);

    // Change the item's label, placeholder, and description on type
    const updateItem = (e) => {
        const { name, value } = e.target;
        setFormActiveItem(oldItem => {
            return {
                ...oldItem,
                [name]: value
            }
        });
    }

    // Add option
    const addOption = () => {
        setFormActiveItem(oldItem => {
            return {
                ...oldItem,
                options: [
                    ...oldItem.options,
                    {
                        id: uuidv4(),
                        label: "",
                        value: ""
                    }
                ]
            }
        });
    }

    // Update option
    const updateOption = (e, id) => {
        const { name, value } = e.target;
        setFormActiveItem(oldItem => {
            return {
                ...oldItem,
                options: oldItem.options.map(option => {
                    if (option.id === id) {
                        return {
                            ...option,
                            [name]: value
                        }
                    }
                    return option;
                })
            }
        });
    }

    // Remove option
    const removeOption = (id) => {
        setFormActiveItem(oldItem => {
            return {
                ...oldItem,
                options: oldItem.options.filter(option => option.id !== id)
            }
        });
    }

    // Update option order
    const updateItemOptionsOrder = (result) => {
        if (!result.destination) return;
        const items = Array.from(item.options);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);
        setFormActiveItem(oldItem => {
            return {
                ...oldItem,
                options: items
            }
        });
    }

    return (
        <div className="text-gray-300">
            {/* Label */}
            <div>
                <label className="block text-sm font-medium leading-6">
                    Label
                </label>
                <div className="mt-2">
                    <input
                    type="text"
                    name="label"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    placeholder="e.g. First Name"
                    value={item.label}
                    onChange={updateItem}
                    />
                </div>
            </div>

            {/* Options */}
            <div className="mt-3">
                <label className="block text-sm font-medium leading-6">
                    Options
                </label>
                <div className="mt-2">
                    <DragDropContext
                    onDragEnd={updateItemOptionsOrder}
                    >
                        <Droppable droppableId={`options-${item.id}`}>
                            {provided => (
                                <div
                                ref={provided.innerRef}
                                {...provided.droppableProps}
                                className="flex flex-col gap-4"
                                >
                                    {item.options.map((option, index) => (
                                    <Draggable
                                        key={option.id}
                                        draggableId={`${option.id}`}
                                        index={index}
                                    >
                                        {provided => (
                                            <div 
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                            className="flex flex-row gap-2">
                                                <div><FontAwesomeIcon icon={faGripVertical} className="my-auto text-gray-400 cursor-move" /></div>
                                                <div className="grow">
                                                    <div>
                                                        <input
                                                        type="text"
                                                        name="label"
                                                        className="block w-full rounded-md border-0 py-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 text-xs sm:leading-6"
                                                        placeholder="e.g. John Doe"
                                                        value={option.label}
                                                        onChange={e => updateOption(e, option.id)}
                                                        />
                                                        <div className="mt-1 text-xs">Text for people to read</div>
                                                    </div>
                                                    <div className="mt-1">
                                                        <input
                                                        type="text"
                                                        name="value"
                                                        className="block w-full rounded-md border-0 py-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 text-xs sm:leading-6"
                                                        placeholder="e.g. John Doe"
                                                        value={option.value}
                                                        onChange={e => updateOption(e, option.id)}
                                                        />
                                                        <div className="mt-1 text-xs">Text that shows up as the result</div>
                                                    </div>
                                                </div>
                                                <div><FontAwesomeIcon icon={faTrash} className="my-auto text-gray-400 cursor-pointer hover:text-white" onClick={() => removeOption(option.id)}/></div>
                                            </div>
                                        )}
                                    </Draggable>
                                    ))}
                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>
                    </DragDropContext>
                    {/* Add option button */}
                    <div className="flex flex-row gap-2 cursor-pointer text-gray-400 hover:text-white w-fit mt-4" onClick={addOption}>
                        <div><FontAwesomeIcon icon={faPlus} className="my-auto" /></div>
                        <div>Add option</div>
                    </div>
                </div>
            </div>

            {/* Description */}
            <div className="mt-3">
                <label className="block text-sm font-medium leading-6">
                    Description
                </label>
                <div className="mt-2">
                    <textarea
                    rows={4}
                    name="description"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    value={item.description}
                    onChange={updateItem}
                    />
                </div>
            </div>
        </div>
    );
}
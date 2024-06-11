import Link from "next/link";
import { useContext, useState } from "react";

import { v4 as uuidv4 } from 'uuid';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGripVertical, faTrash, faPlus } from "@fortawesome/free-solid-svg-icons";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

import FormActiveItemContext from "@/app/form/[formId]/edit/contexts/FormActiveItem";

export default function EditBarGrid({ item }) {
    const { setFormActiveItem } = useContext(FormActiveItemContext);
    const [activeTab, setActiveTab] = useState("rows");

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

    // Add either row or column
    const addOption = () => {
        setFormActiveItem(oldItem => {
            return {
                ...oldItem,
                [activeTab]: [
                    ...oldItem[activeTab],
                    {
                        id: uuidv4(),
                        text: `New ${activeTab === "rows" ? "row" : "column"}`
                    }
                ]
            }
        });
    }

    // Remove either row or column
    const removeOption = (id) => {
        setFormActiveItem(oldItem => {
            return {
                ...oldItem,
                [activeTab]: oldItem[activeTab].filter(option => option.id !== id)
            }
        });
    }

    // Update the text of either row or column
    const updateOption = (e, id) => {
        const { name, value } = e.target;
        setFormActiveItem(oldItem => {
            return {
                ...oldItem,
                [activeTab]: oldItem[activeTab].map(option => {
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

    // Update the order of either row or column
    const updateItemOptionsOrder = (result) => {
        const { source, destination } = result;
        if (!destination) {
            return;
        }
        if (source.droppableId === destination.droppableId) {
            setFormActiveItem(oldItem => {
                return {
                    ...oldItem,
                    [activeTab]: oldItem[activeTab].map((option, index) => {
                        if (index === source.index) {
                            return oldItem[activeTab][destination.index];
                        }
                        if (index === destination.index) {
                            return oldItem[activeTab][source.index];
                        }
                        return option;
                    })
                }
            });
        }
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

            {/* Row and col select tab */}
            <div role="tablist" className="tabs tabs-bordered mt-5">
                <Link href="#" role="tab" className={`tab ${activeTab === "rows" ? "tab-active" : "hover:text-gray-200"}`} onClick={() => setActiveTab("rows")}>Rows</Link>
                <Link href="#" role="tab" className={`tab ${activeTab === "cols" ? "tab-active" : "hover:text-gray-200"}`} onClick={() => setActiveTab("cols")}>Columns</Link>
            </div>

            {/* Rows */}
            <div className={`mt-3 ${activeTab === "cols" ? "hidden" : ""}`}>
                <label className="block text-sm font-medium leading-6">
                    Rows
                </label>
                <div className="mt-2">
                    <DragDropContext
                    onDragEnd={updateItemOptionsOrder}
                    >
                        <Droppable droppableId={`rows-${item.id}`}>
                            {provided => (
                                <div
                                ref={provided.innerRef}
                                {...provided.droppableProps}
                                className="flex flex-col gap-4"
                                >
                                    {item.rows.map((row, index) => (
                                    <Draggable
                                        key={row.id}
                                        draggableId={`${row.id}`}
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
                                                        name="text"
                                                        className="block w-full rounded-md border-0 py-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 text-xs sm:leading-6"
                                                        placeholder="e.g. John Doe"
                                                        value={row.text}
                                                        onChange={e => updateOption(e, row.id)}
                                                        />
                                                        <div className="mt-1 text-xs">Text for people to read</div>
                                                    </div>
                                                </div>
                                                <div>
                                                <FontAwesomeIcon 
                                                    icon={faTrash} 
                                                    className="my-auto text-gray-400 cursor-pointer hover:text-white" 
                                                    onClick={() => removeOption(row.id)}
                                                    />
                                                </div>
                                            </div>
                                        )}
                                    </Draggable>
                                    ))}
                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>
                    </DragDropContext>
                    {/* Add row button */}
                    <div 
                        className="flex flex-row gap-2 cursor-pointer text-gray-400 hover:text-white w-fit mt-4"
                        onClick={addOption}
                        >
                        <div><FontAwesomeIcon icon={faPlus} className="my-auto" /></div>
                        <div>Add row</div>
                    </div>
                </div>
            </div>

            {/* Columns */}
            <div className={`mt-3 ${activeTab === "rows" ? "hidden" : ""}`}>
                <label className="block text-sm font-medium leading-6">
                    Columns
                </label>
                <div className="mt-2">
                    <DragDropContext
                    onDragEnd={updateItemOptionsOrder}
                    >
                        <Droppable droppableId={`cols-${item.id}`}>
                            {provided => (
                                <div
                                ref={provided.innerRef}
                                {...provided.droppableProps}
                                className="flex flex-col gap-4"
                                >
                                    {item.cols.map((col, index) => (
                                    <Draggable
                                        key={col.id}
                                        draggableId={`${col.id}`}
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
                                                        name="text"
                                                        className="block w-full rounded-md border-0 py-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 text-xs sm:leading-6"
                                                        placeholder="e.g. John Doe"
                                                        value={col.text}
                                                        onChange={e => updateOption(e, col.id)}
                                                        />
                                                        <div className="mt-1 text-xs">Text for people to read</div>
                                                    </div>
                                                </div>
                                                <div>
                                                <FontAwesomeIcon
                                                    icon={faTrash}
                                                    className="my-auto text-gray-400 cursor-pointer hover:text-white"
                                                    onClick={() => removeOption(col.id)}
                                                    />
                                                </div>
                                            </div>
                                        )}
                                    </Draggable>
                                    ))}
                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>
                    </DragDropContext>
                    {/* Add col button */}
                    <div 
                        className="flex flex-row gap-2 cursor-pointer text-gray-400 hover:text-white w-fit mt-4"
                        onClick={addOption}
                        >
                        <div><FontAwesomeIcon icon={faPlus} className="my-auto" /></div>
                        <div>Add column</div>
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
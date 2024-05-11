"use client";

import { useContext } from "react";

import { v4 as uuidv4 } from 'uuid';
import { Responsive, WidthProvider } from "react-grid-layout";

import { rowHeight } from "@/data/gridLayout";
import gridItemData from "@/data/gridItemData";
import LayoutItemsContext from "@/contexts/LayoutItemsContext";
import FormActiveItemContext from "@/contexts/FormActiveItem";
import FormField from "./formItems/FormField";

const ResponsiveGridLayout = WidthProvider(Responsive);

export default function FormEditorBoard() {
    const { layoutItems, setLayoutItems } = useContext(LayoutItemsContext);
    const { formActiveItem, setFormActiveItem } = useContext(FormActiveItemContext);

    // Add new item to layout when dragging an item from sidebar
    const onDrop = (_layout, layoutItem, event) => {
        console.log("Call on drop")
        const type = event.dataTransfer.getData("type");
        const newItem = {
            ...layoutItem,
            i: uuidv4(),
            ...gridItemData[type],
            resizeHandles: ['sw', 'nw', 'se', 'ne']
        };
        setLayoutItems({lg: [...layoutItems.lg, newItem] });
    }

    // Save layout changes for resizing an item
    const onResizeStop = (layout, oldItem, newItem, placeholder, e, element) => {
        const newLayoutItems = {lg: []}
        newLayoutItems.lg = layoutItems.lg.map(item => {
            if (item.i === oldItem.i) {
                return {
                    ...item,
                    w: newItem.w,
                    h: newItem.h
                };
            }
            return item;
        })
        setLayoutItems(newLayoutItems);
    }

    // Save layout changes for dragging an item
    const onDragStop = (layout, oldItem, newItem, placeholder, e, element) => {
        // If the item is dropped in the same position (meaning it's a click, not a drag), open the edit bar
        if (oldItem.x === newItem.x && oldItem.y === newItem.y) {
            const item = layoutItems.lg.find(item => item.i === oldItem.i);
            setFormActiveItem(item);
            return;
        }

        // If the item is dropped in a different position, save the new position
        const newLayoutItems = {lg: []}
        newLayoutItems.lg = layoutItems.lg.map(item => {
            if (item.i === oldItem.i) {
                return {
                    ...item,
                    x: newItem.x,
                    y: newItem.y
                };
            }
            return item;
        })
        console.log(newLayoutItems)
        setLayoutItems(newLayoutItems); 
    }

    // If click in the board but not in any item, close the edit bar
    const closeEditBar = (e) => {
        if (e.target.closest(".layout-item") === null && formActiveItem) {
            setFormActiveItem(null);
        }
    }

    return (
        <div onClick={closeEditBar}>
            <ResponsiveGridLayout 
                className="layout bg-white min-h-screen" 
                cols={{ lg: 48, md: 48, sm: 24, xs: 24, xxs: 24}}
                rowHeight={rowHeight} 
                breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
                margin={[0,0]}
                layouts={layoutItems}
                isDroppable={true}
                onDrop={onDrop}
                onDragStop={onDragStop}
                onResizeStop={onResizeStop}
                compactType={null}
                allowOverlap={true}
                >
                {layoutItems.lg.map(item => (
                    <div 
                        key={item.i} 
                        className={`layout-item bg-white border-2 ${formActiveItem && formActiveItem.i === item.i ? "border-blue-400 z-50" : "border-white"}  hover:border-blue-400 hover:z-50 cursor-move-all`}
                        >
                        <FormField item={item} />
                    </div>
                ))}
            </ResponsiveGridLayout>
        </div>
    );
}
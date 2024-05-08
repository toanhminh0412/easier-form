"use client";

import { useContext, useState } from "react";

import { v4 as uuidv4 } from 'uuid';
import { Responsive, WidthProvider } from "react-grid-layout";

import gridItemData from "@/data/gridItemData";
import LayoutItemsContext from "@/contexts/LayoutItemsContext";
import FormField from "./formItems/FormField";

const ResponsiveGridLayout = WidthProvider(Responsive);

export default function FormEditorBoard() {
    const { layoutItems, setLayoutItems } = useContext(LayoutItemsContext);
    const [isDraggedFromOutside, setIsDraggedFromOutside] = useState(false);

    // Add new item to layout when dragging an item from sidebar
    const onDrop = (_layout, layoutItem, event) => {
        const type = event.dataTransfer.getData("type");
        const newItem = {
            ...layoutItem,
            i: uuidv4(),
            ...gridItemData[type]
        };
        setLayoutItems({lg: [...layoutItems.lg, newItem] });
        setIsDraggedFromOutside(true);
    }

    // Save layout changes for layout changes
    const onLayoutChange = (newLayout, allLayouts) => {
        const layout = newLayout.filter(item => item.i !== "__dropping-elem__");
        if (isDraggedFromOutside) {
            setIsDraggedFromOutside(false);
            return;
        }

        // Get the new position and size for each item
        const newLayoutItems = {lg: []}
        newLayoutItems.lg = layoutItems.lg.map(item => {
            const newItem = layout.find(newItem => newItem.i === item.i);
            if (newItem) {
                return {
                    ...item,
                    x: newItem.x,
                    y: newItem.y,
                    w: newItem.w,
                    h: newItem.h
                };
            }
            return item;
        })
        setLayoutItems(newLayoutItems);
    }

    return (
        <ResponsiveGridLayout 
            className="layout bg-white min-h-screen" 
            cols={{ lg: 24, md: 24, sm: 12, xs: 12, xxs: 12}}
            rowHeight={30} 
            breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
            margin={[0,0]}
            layouts={layoutItems}
            onLayoutChange={onLayoutChange}
            isDroppable={true}
            onDrop={onDrop}
            compactType={null}
            allowOverlap={true}>
            {layoutItems.lg.map(item => (
                <div key={item.i} className="bg-white p-3 border-2 border-white hover:border-blue-400" data-grid={item}>
                    <FormField item={item} />
                </div>
            ))}
        </ResponsiveGridLayout>
    );
}
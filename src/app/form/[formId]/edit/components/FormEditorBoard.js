"use client";

import { useContext, useState, useEffect } from "react";

import { v4 as uuidv4 } from 'uuid';
import { Responsive, WidthProvider } from "react-grid-layout";

import { rowHeight } from "@/data/gridLayout";
import gridItemData from "@/data/gridItemData";
import LayoutItemsContext from "@/app/form/[formId]/edit/contexts/LayoutItemsContext";
import FormActiveItemContext from "@/app/form/[formId]/edit/contexts/FormActiveItem";
import FormField from "./formItems/FormField";

const ResponsiveGridLayout = WidthProvider(Responsive);

export default function FormEditorBoard() {
    const { layoutItems, setLayoutItems } = useContext(LayoutItemsContext);
    const { formActiveItem, setFormActiveItem, deleteActiveItem } = useContext(FormActiveItemContext);
    const [layoutHeight, setLayoutHeight] = useState(1200);

    useEffect(() => {
        updateLayoutHeight(layoutItems.lg, 400);
    }, [layoutItems]);

    // Maintain a padding at the bottom of the layout 
    const updateLayoutHeight = (layout, paddingBottom) => {
        const maxY = Math.max(...layout.map(item => item.y + item.h));
        setLayoutHeight(maxY * rowHeight + paddingBottom);
    };

    // Add new item to layout when dragging an item from sidebar
    const onDrop = (_layout, layoutItem, event) => {
        const type = event.dataTransfer.getData("type");
        const newItem = {
            ...layoutItem,
            i: uuidv4(),
            ...gridItemData[type],
            resizeHandles: type !== "separator" ? ['sw', 'nw', 'se', 'ne'] : ['e', 'w']
        };
        setLayoutItems({lg: [...layoutItems.lg, newItem] });
    }

    // Save layout changes for dragging an item
    const onDragStop = (layout, oldItem, newItem, placeholder, e, element) => {
        // If the item is dropped in the same position (meaning it's a click, not a drag), open the edit bar
        if (oldItem.x === newItem.x && oldItem.y === newItem.y) {
            const item = layoutItems.lg.find(item => item.i === oldItem.i);
            setFormActiveItem(item);
            return;
        }
    }

    // Save new layout items when layout changes
    const onLayoutChange = (newLayout) => {
        setLayoutItems(oldLayoutItems => {
            const updatedLayoutItems = oldLayoutItems.lg.map(item => {
                const newItem = newLayout.find(newItem => newItem.i === item.i);
                return {
                    ...item,
                    x: newItem.x,
                    y: newItem.y,
                    w: newItem.w,
                    h: newItem.h
                }
            });
            const newLayoutItems = {lg: updatedLayoutItems};
            return newLayoutItems;
        });
    }

    // If click in the board but not in any item, close the edit bar
    const closeEditBar = (e) => {
        if (e.target.closest(".layout-item") === null && formActiveItem) {
            setFormActiveItem(null);
        }
    }

    return (
        <div onClick={closeEditBar} tabIndex={0} onKeyDown={e => {
            if (e.key === "Backspace" && formActiveItem) {
                deleteActiveItem();
            }
        }}>
            <ResponsiveGridLayout 
                className="layout bg-white min-h-screen shadow-lg w-full"
                style={{ height: `${layoutHeight}px` }}
                cols={{ lg: 48, md: 48, sm: 48, xs: 48, xxs: 48}}
                rowHeight={rowHeight} 
                breakpoints={{ lg: 2000, md: 1300, sm: 900, xs: 500, xxs: 0 }}
                margin={[0,0]}
                layouts={layoutItems}
                isDroppable={true}
                onDrop={onDrop}
                onDragStop={onDragStop}
                onLayoutChange={onLayoutChange}
                compactType={null}
                allowOverlap={true}
                autoSize={true}
                >
                {layoutItems.lg.map(item => (
                    <div 
                        key={item.i} 
                        className={`layout-item bg-white border-2 ${formActiveItem && formActiveItem.i === item.i ? "border-blue-400 z-50" : "border-white"}  hover:border-blue-400 cursor-move cursor-move-all hover:z-50`}
                        data-grid={{
                            x: item.x,
                            y: item.y,
                            w: item.w,
                            h: item.h,
                            minW: item.minW,
                            minH: item.minH,
                            static: item.static,
                            resizeHandles: item.resizeHandles
                        }}
                        >
                        <FormField item={item} readOnly />
                    </div>
                ))}
            </ResponsiveGridLayout>
        </div>
    );
}
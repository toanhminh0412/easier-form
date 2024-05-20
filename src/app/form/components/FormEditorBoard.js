"use client";

import { useContext, useState, useEffect } from "react";

import { v4 as uuidv4 } from 'uuid';
import { Responsive, WidthProvider } from "react-grid-layout";

import { rowHeight } from "@/data/gridLayout";
import gridItemData from "@/data/gridItemData";
import LayoutItemsContext from "@/app/form/contexts/LayoutItemsContext";
import FormActiveItemContext from "@/app/form/contexts/FormActiveItem";
import ModeContext from "../contexts/ModeContext";
import FormField from "./formItems/FormField";

const ResponsiveGridLayout = WidthProvider(Responsive);

export default function FormEditorBoard() {
    const { layoutItems, setLayoutItems } = useContext(LayoutItemsContext);
    const { formActiveItem, setFormActiveItem, deleteActiveItem } = useContext(FormActiveItemContext);
    const { mode } = useContext(ModeContext);
    const [layoutWidth, setLayoutWidth] = useState(800);

    useEffect(() => {
        if (mode === "edit") {
            // Calculate the layout width by subtracting the sidebar width from the window width
            const sidebarWidth = document.querySelector("#sidebar").offsetWidth;
            setLayoutWidth(window.innerWidth - sidebarWidth);
        } else {
            // Set the layout width to the window width
            setLayoutWidth(window.innerWidth);
        }
    }, [mode]);

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

        // If the resized item is the active item, update the active item
        if (formActiveItem && formActiveItem.i === oldItem.i) {
            setFormActiveItem(oldFormActiveItem => {
                return {
                    ...oldFormActiveItem,
                    x: newItem.x,
                    y: newItem.y,
                    w: newItem.w,
                    h: newItem.h
                }
            });
        }
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

        // If the dragged item is the active item, update the active item
        if (formActiveItem && formActiveItem.i === oldItem.i) {
            setFormActiveItem(oldFormActiveItem => {
                return {
                    ...oldFormActiveItem,
                    x: newItem.x,
                    y: newItem.y
                }
            });
        }
    }

    // If click in the board but not in any item, close the edit bar
    const closeEditBar = (e) => {
        if (e.target.closest(".layout-item") === null && formActiveItem) {
            setFormActiveItem(null);
        }
    }

    return (
        <div onClick={closeEditBar} tabIndex={0} onKeyDown={e => {
            console.log(e.key)
            if (e.key === "Backspace" && formActiveItem) {
                deleteActiveItem();
            }
        }}>
            <ResponsiveGridLayout 
                className="layout bg-white min-h-screen"
                style={{ width: `${layoutWidth}px` }}
                cols={{ lg: 48, md: 48, sm: 48, xs: 48, xxs: 48}}
                rowHeight={rowHeight} 
                breakpoints={{ lg: 2000, md: 1300, sm: 900, xs: 500, xxs: 0 }}
                margin={[0,0]}
                layouts={layoutItems}
                isDroppable={true}
                onDrop={onDrop}
                onDragStop={onDragStop}
                onResizeStop={onResizeStop}
                compactType={null}
                allowOverlap={true}
                autoSize={true}
                >
                {layoutItems.lg.map(item => (
                    <div 
                        key={item.i} 
                        className={`layout-item bg-white border-2 ${formActiveItem && formActiveItem.i === item.i ? "border-blue-400 z-50" : "border-white"}  ${mode === "edit" ? "hover:border-blue-400 cursor-move cursor-move-all hover:z-50 " : ""}`}
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
                        <FormField item={item} />
                    </div>
                ))}
            </ResponsiveGridLayout>
        </div>
    );
}
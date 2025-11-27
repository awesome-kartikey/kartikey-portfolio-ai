import React from "react";
import { cn } from "../../styles/utils";

export const BentoGrid = ({ className, children }) => {
    return (
        <div className={cn("grid md:auto-rows-[18rem] grid-cols-1 md:grid-cols-3 gap-4 max-w-7xl mx-auto", className)}>
            {children}
        </div>
    );
};

export const BentoItem = ({ className, title, description, header, icon, isLarge }) => {
    return (
        <div
            className={cn(
                "row-span-1 rounded-xl group/bento hover:shadow-xl transition duration-200 shadow-input dark:shadow-none p-4 dark:bg-gray-900 bg-white border border-transparent justify-between flex flex-col space-y-4 border-gray-200 dark:border-gray-800",
                isLarge ? "md:col-span-2" : "",
                className
            )}
        >
            <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-neutral-200 dark:from-neutral-900 dark:to-neutral-800 to-neutral-100 items-center justify-center overflow-hidden">
                {header}
            </div>
            <div className="group-hover/bento:translate-x-2 transition duration-200">
                <div className="flex items-center gap-2 mb-2">
                    {icon}
                    <div className="font-bold text-neutral-600 dark:text-neutral-200">
                        {title}
                    </div>
                </div>
                <div className="font-normal text-neutral-600 text-xs dark:text-neutral-300">
                    {description}
                </div>
            </div>
        </div>
    );
};

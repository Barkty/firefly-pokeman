/* eslint-disable @typescript-eslint/no-unused-vars */

import { POKEMON_TYPES } from "@/lib/constants";
import { Select, SelectItem } from "@heroui/react";
import { ChevronDown, Panda } from "lucide-react";
import Image from "next/image";

interface FilterCardProps {
  type: string;
  weakness: string;
  ability: string;
  height: number;
  weight: number;
}

export function FilterCard() {
    return (
        <div
            className="w-full h-full flex flex-wrap items-center justify-center gap-4 mb-9"
            role="group"
            aria-label="Filter options section"
        >
            {/* Type Filter */}
            <div
                className="rounded-md p-4 w-[155px] flex flex-col justify-between items-center cursor-pointer shadow-[0px_16px_21px_-5px_rgba(163,171,254,0.25)]"
                role="button"
                aria-label="Filter by Pokémon type"
            >
                <div className="flex justify-between items-center w-full">
                    <div className="w-2/3 flex">
                        <Panda className="mr-2" color="black" aria-hidden="true" />
                        <p className="text-black">Type</p>
                    </div>
                    <ChevronDown color="black" aria-hidden="true" />
                </div>
            </div>

            {/* Weakness Filter */}
            <div
                className="rounded-md p-4 w-[200px] flex justify-between items-center shadow-[0px_16px_21px_-5px_rgba(163,171,254,0.25)]"
                role="button"
                aria-label="Filter by Pokémon weakness"
            >
                <div className="w-2/3 flex">
                    <Image src={"/weak.svg"} alt="" width={20} height={20} className="mr-2" aria-hidden="true" />
                    <p className="text-black">Weakness</p>
                </div>
                <ChevronDown color="black" aria-hidden="true" />
            </div>

            {/* Ability Filter */}
            <div
                className="rounded-md p-4 w-[200px] flex justify-between items-center shadow-[0px_16px_21px_-5px_rgba(163,171,254,0.25)]"
                role="button"
                aria-label="Filter by Pokémon ability"
            >
                <div className="w-2/3 flex">
                    <Image src={"/able.svg"} alt="" width={20} height={20} className="mr-2" aria-hidden="true" />
                    <p className="text-black">Ability</p>
                </div>
                <ChevronDown color="black" aria-hidden="true" />
            </div>

            {/* Height Filter */}
            <div
                className="rounded-md p-4 w-[200px] flex justify-between items-center shadow-[0px_16px_21px_-5px_rgba(163,171,254,0.25)]"
                role="button"
                aria-label="Filter by Pokémon height"
            >
                <div className="w-2/3 flex">
                    <Image src={"/height.svg"} alt="" width={20} height={20} className="mr-2" aria-hidden="true" />
                    <p className="text-black">Height</p>
                </div>
                <ChevronDown color="black" aria-hidden="true" />
            </div>

            {/* Weight Filter */}
            <div
                className="rounded-md p-4 w-[200px] flex justify-between items-center shadow-[0px_16px_21px_-5px_rgba(163,171,254,0.25)]"
                role="button"
                aria-label="Filter by Pokémon weight"
            >
                <div className="w-2/3 flex">
                    <Image src={"/weight.svg"} alt="" width={20} height={20} className="mr-2" aria-hidden="true" />
                    <p className="text-black">Weight</p>
                </div>
                <ChevronDown color="black" aria-hidden="true" />
            </div>

            {/* Load More */}
            <div
                className="rounded-md p-4 w-[50px] flex justify-between items-center shadow-[0px_16px_21px_-5px_rgba(163,171,254,0.25)]"
                role="button"
                aria-label="Load more filters"
            >
                <Image src={"/load.svg"} alt="" width={20} height={20} className="mr-2" aria-hidden="true" />
            </div>
        </div>
    );
}
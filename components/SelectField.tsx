// import { useState } from "react";
// import { ChevronDown } from "lucide-react";

// interface Option {
//   label: string;
//   value: string | number;
// }

// interface SelectFieldProps {
//   value?: string | number;
//   label?: string;
//   labelPosition?: "left" | "right";
//   textPosition?: "left" | "right";
//   border?: "border" | "none";
//   name: string;
//   selectOptions: Option[];
//   isError?: boolean;
//   isLoading?: boolean;
//   errMsg?: string;
//   onChange?: (name: string, value: string | number) => void;
//   showEmptyOption?: boolean;
// }

// const SelectField: React.FC<SelectFieldProps> = ({
//   value,
//   label,
//   labelPosition = "left",
//   textPosition = "left",
//   border = "border",
//   name,
//   selectOptions,
//   isError = false,
//   isLoading = false,
//   errMsg,
//   onChange,
//   showEmptyOption = true,
// }) => {
//   const [selectedOption, setSelectedOption] = useState<Option>({
//     label: "",
//     value: "",
//   });

//   const [currentOption, setCurrentOption] = useState<Option | null>(
//         () => selectOptions[0] ?? null
//     );

//   const [showOptions, setShowOptions] = useState<boolean>(false);

//   const handleSelect = (option: Option) => {
//     setSelectedOption(option);
//     onChange?.(name, option.value);
//     setShowOptions(false);
//   };

//   // Set default option
// //   useEffect(() => {
// //     if (selectOptions.length > 0) {
// //       setCurrentOption(selectOptions[0]);
// //     }
// //   }, [selectOptions]);
// // const currentOption = selectOptions[0] ?? null;

//   // Sync when selected changes
// //   useEffect(() => {
// //     if (selectedOption) {
// //       setCurrentOption(selectedOption);
// //     }
// //   }, [selectedOption]);

//   return (
//     <>
//       <div className="w-full">
//         <div
//           className={`
//             w-full 
//             ${border === "border" ? "border-lighterGray border-[1px]" : "border-0"} 
//             rounded-[9px] 
//             relative 
//             px-4 py-3 
//             bg-white
//           `}
//         >
//           {/* Label */}
//           {label && (
//             <div
//               className={`w-full flex text-left mb-1 ${
//                 labelPosition === "left" ? "md:text-left" : "md:text-right"
//               }`}
//             >
//               <label
//                 htmlFor={name}
//                 className="block w-full text-sm md:text-[13px] lg:text-[14px] lato-regular text-gray-600"
//               >
//                 {label}
//               </label>
//             </div>
//           )}

//           {/* Select Trigger */}
//           <div
//             className="flex justify-between gap-4 cursor-pointer"
//             onClick={() => setShowOptions((prev) => !prev)}
//           >
//             <div className="flex-grow">
//               {showEmptyOption && !isLoading ? (
//                 <p
//                   className={`lato-regular font-semibold bg-inputGray text-[12px] md:text-[14px] lg:text-[14px] ${
//                     textPosition === "right"
//                       ? "md:text-right lg:text-right"
//                       : "md:text-left lg:text-left"
//                   }`}
//                 >
//                   {currentOption?.label || "Select Option"}
//                 </p>
//               ) : (
//                 <LoadSpinner />
//               )}
//             </div>

//             {border === "border" && (
//               <div className="flex justify-center items-center bg-inputGray">
//                 <ChevronDown size={16} className="text-textBlack" />
//               </div>
//             )}
//           </div>

//           {/* Dropdown options */}
//           {showOptions && (
//             <div className="absolute left-0 top-16 w-full rounded-[9px] bg-white px-3 py-2 max-h-80 overflow-y-auto shadow-md z-50">
//               {selectOptions.length ? (
//                 selectOptions.map((item, idx) => (
//                   <p
//                     key={idx}
//                     className="text-sm text-textBlack lato-bold font-semibold cursor-pointer my-1 py-1 hover:bg-lightGray"
//                     onClick={() => handleSelect(item)}
//                   >
//                     {item.label}
//                   </p>
//                 ))
//               ) : (
//                 <p className="text-sm text-textBlack lato-bold font-semibold">
//                   No Options
//                 </p>
//               )}
//             </div>
//           )}
//         </div>

//         {/* Error Message */}
//         {isError && (
//           <p className="text-red my-2 text-xs font-semibold">{errMsg}</p>
//         )}
//       </div>
//     </>
//   );
// };

// export default SelectField;

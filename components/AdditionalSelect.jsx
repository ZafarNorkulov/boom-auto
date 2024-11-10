import React, { useState, useEffect, useRef } from "react";
import { FaChevronLeft, FaTimes } from "react-icons/fa";
import api from "@/lib/api"; // Adjust API import according to your project structure

const AdditionalSelect = ({ onAdditionalChange }) => {
    const [isAdditionalOpen, setIsAdditionalOpen] = useState(false);
    const [selectedAdditional, setSelectedAdditional] = useState([]);
    const [hoveredAdditional, setHoveredAdditional] = useState(null);
    const [additionalOptions, setAdditionalOptions] = useState([]);
    const [additionalOptions2, setAdditionalOptions2] = useState([]);
    const additionalRef = useRef(null);

    useEffect(() => {
        const fetchAdditionalOptions = async () => {
            try {
                const response = await api.get("/state/avto");
                setAdditionalOptions2(response.data);
            } catch (error) {
                console.error("Error fetching additional options:", error);
            }
        };
        const fetchAdditionalOptions2 = async () => {
            try {
                const response = await api.get("/avto/type/drive");
                setAdditionalOptions(response.data);
            } catch (error) {
                console.error("Error fetching additional options:", error);
            }
        };
        fetchAdditionalOptions();
        fetchAdditionalOptions2();
    }, []);

    const toggleAdditional = () => {
        setIsAdditionalOpen(!isAdditionalOpen);
    };

    const handleClickOutside = (event) => {
        if (
            additionalRef.current &&
            !additionalRef.current.contains(event.target)
        ) {
            setIsAdditionalOpen(false);
        }
    };

    const handleAdditionalChange = (event) => {
        const additional = event.target.id;
        setSelectedAdditional((prev) => {
            const updatedArray = prev.includes(additional)
                ? prev.filter((item) => item !== additional)
                : [...prev, additional];
            const updatedString = updatedArray.join(","); // Join without spaces for the output
            onAdditionalChange(updatedString);
            return updatedArray;
        });
    };

    const removeSelectedAdditional = (item) => {
        setSelectedAdditional((prev) => {
            const updatedArray = prev.filter((selected) => selected !== item);
            const updatedString = updatedArray.join(",");
            onAdditionalChange(updatedString);
            return updatedArray;
        });
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className="relative w-full max-md:w-full" ref={additionalRef}>
            <div
                className="flex flex-col p-[10px] rounded-[10px] cursor-pointer"
                onClick={toggleAdditional}
            >
                <h2 className="text-lg text-[#050B20] max-md:text-sm">
                    Дополнительно
                </h2>
                <div className="flex justify-between w-full my-2 items-center">
                    <div className="flex flex-wrap gap-2">
                        {selectedAdditional.length === 0 ? (
                            <p className="text-sm text-[#050B20]">Все</p>
                        ) : (
                            selectedAdditional.map((item) => (
                                <div
                                    key={item}
                                    className="flex items-center bg-rose-100 text-red px-2 py-1 rounded-full text-sm"
                                >
                                    {item}
                                    <FaTimes
                                        className="ml-1 cursor-pointer"
                                        onClick={() =>
                                            removeSelectedAdditional(item)
                                        }
                                    />
                                </div>
                            ))
                        )}
                    </div>
                    <FaChevronLeft
                        className={`text-sm transition-transform z-10 ${
                            isAdditionalOpen ? "rotate-90" : "-rotate-90"
                        }`}
                    />
                </div>
            </div>
            {isAdditionalOpen && (
                <div className="flex flex-col p-[10px] mt-2 rounded-[10px] absolute bg-white shadow-lg w-full left-0 top-[60px] z-[19]">
                    {additionalOptions.map((option) => (
                        <div
                            key={option.id}
                            className="relative"
                            onMouseEnter={() =>
                                setHoveredAdditional(option.name)
                            }
                            onMouseLeave={() => setHoveredAdditional(null)}
                        >
                            <label
                                className="flex items-center mb-0 cursor-pointer"
                                htmlFor={option.name}
                            >
                                <input
                                    type="checkbox"
                                    id={option.name}
                                    name="additional"
                                    className="hidden"
                                    checked={selectedAdditional.includes(
                                        option.name
                                    )}
                                    onChange={handleAdditionalChange}
                                />
                                <p
                                    className={`w-full px-4 py-2 rounded-md flex items-center justify-between text-sm max-md:px-2 ${
                                        selectedAdditional.includes(
                                            option.name
                                        ) || hoveredAdditional === option.name
                                            ? "font-medium"
                                            : "font-normal"
                                    }`}
                                >
                                    {option.name}
                                </p>
                            </label>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default AdditionalSelect;

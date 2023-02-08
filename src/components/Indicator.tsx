import { FaSort } from "@react-icons/all-files/fa/FaSort";
import { FaSortDown } from "@react-icons/all-files/fa/FaSortDown";
import { FaSortUp } from "@react-icons/all-files/fa/FaSortUp";
import React, { useCallback, useEffect, useMemo, useState } from "react";

interface IndicatorProps {
    isSorted?: boolean;
    isSortedDesc?: boolean;
    icons?: {
        standard: React.ReactNode;
        asc: React.ReactNode;
        desc: React.ReactNode;
    };
    className?: string;
}

const Indicator: React.FC<IndicatorProps> = ({
    isSorted,
    isSortedDesc,
    icons: _icons,
    className,
}) => {
    //* constants
    const { asc, standard, desc } = useMemo(
        () =>
            _icons || {
                standard: <FaSort />,
                asc: <FaSortUp />,
                desc: <FaSortDown />,
            },
        [_icons]
    );

    //* states
    const [icon, setIcon] = useState<React.ReactNode>(standard);

    //* handlers
    const handleIconChange = useCallback(() => {
        if (isSorted) {
            if (isSortedDesc) {
                setIcon(desc);
            } else {
                setIcon(asc);
            }
        } else {
            setIcon(standard);
        }
    }, [asc, desc, isSorted, isSortedDesc, standard]);

    //* effects
    useEffect(() => {
        handleIconChange();
    }, [handleIconChange]);

    //* render
    return <div className="text-text text-md ml-2">{icon}</div>;
};

export default Indicator;

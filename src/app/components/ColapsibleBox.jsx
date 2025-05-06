import React, { useState } from "react";
import { HiChevronDown, HiChevronUp } from "react-icons/hi";

const CollapsibleBox = ({ title, children, titleClassName = "" }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="mb-4">
      <div
        className="flex justify-between items-center cursor-pointer border-b border-gray-300 pb-2"
        onClick={() => setOpen(!open)}
      >
        <h4 className={`text-sm font-medium ${titleClassName}`}>{title}</h4>
        {open ? (
          <HiChevronUp className="w-5 h-5 transition-transform duration-300" />
        ) : (
          <HiChevronDown className="w-5 h-5 transition-transform duration-300" />
        )}
      </div>
      {open && <div className="mt-2">{children}</div>}
    </div>
  );
};

export default CollapsibleBox;

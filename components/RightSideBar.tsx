import React, { useRef } from "react";
import Dimensions from "./settings/Dimensions";
import Color from "./settings/Color";
import Export from "./settings/Export";
import Text from "./settings/Text";
import { RightSidebarProps } from "@/types/type";
import { modifyShape } from "@/lib/shapes";


function RightSideBar({
  elementAttributes,
  setElementAttributes,
  fabricRef,
  isEditingRef,
  activeObjectRef,
  syncShapeInStorage,
}: RightSidebarProps) {
  const colorInputRef = useRef(null)
  const strokeInputRef = useRef(null)
  const inputChangeHandler = (property: string, value: string) => {
    if (!isEditingRef.current) {
      isEditingRef.current = true;
    }
    setElementAttributes((prev) => ({
      ...prev,
      [property]: value,
    }));
    modifyShape({
      canvas: fabricRef.current as fabric.Canvas,
      property,
      value,
      activeObjectRef,
      syncShapeInStorage,
    });
  };

  return (
    <section className="flex flex-col border-t border-primary-grey-200 bg-primary-black text-primary-grey-300 min-2-[227px] sticky right-0 h-full max-sm:hidden select-none ">
      <h3 className="px-5 pt-4 tex-xs">Design</h3>
      <span className="text-xs text-primary-grey-300 mt-3 px-5 border-b border-primary-grey-200 scroll-pb-48 "></span>

      <Dimensions
        width={elementAttributes.width}
        height={elementAttributes.height}
        handleInputChange={inputChangeHandler}
        isEditingRef={isEditingRef}
      />
      <Text
        fontSize={elementAttributes.fontSize}
        fontFamily={elementAttributes.fontFamily}
        fontWeight={elementAttributes.fontWeight}
        handleInputChange={inputChangeHandler}
      />
      <Color
        inputRef={colorInputRef}
        attribute={elementAttributes.fill}
        placeholder={'color'}
        attributeType="fill"
        handleInputChange={inputChangeHandler}
      /> 
    <Color
        inputRef={strokeInputRef}
        attribute={elementAttributes.stroke}
        placeholder={'stroke'}
        attributeType="stroke"
        handleInputChange={inputChangeHandler}
      /> 
      <Export />
    </section>
  );
}

export default RightSideBar;

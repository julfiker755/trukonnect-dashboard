import { Textarea } from "@/components/ui";
import React from "react";

export default function TextareaBox({
  hanldeClick,
  className,
  placeholder,
}: any) {
  const [isValue, setIsValue] = React.useState("");

   React.useEffect(() => {
    hanldeClick(isValue);
  }, [isValue]);


  return (
    <Textarea
      className={className}
      placeholder={placeholder}
      onChange={(e) => setIsValue(e.target.value)}
    />
  );
}

// resize-none min-h-30 mt-3 bg-figma-blacks border-none
// Write additional note

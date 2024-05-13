import * as React from "react";
import { ArrowRight } from "lucide-react";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";
import Icon from "./icon";
import Link from "next/link";

const cardVariants = cva("flex flex-col gap-5 min-h-48 p-5 lg:min-h-56", {
  variants: {
    variant: {
      default: "group bg-ibsilver-500 text-ibsilver-100 hover:bg-ibgreen-400 hover:text-ibsilver-500",
      white: "group bg-ibsilver-100 text-ibsilver-500 hover:bg-ibgreen-400",
    },
    size: {
      default: "w-48 lg:w-56",
      wide: "w-48 lg:w-72",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
});

const ProductCard = React.forwardRef(({ className, desc, heading, icon, url, variant, size, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : "div";
  let hasDesc = desc ? true : false;
  return (
    <Link href={`/consulting/${url}`}>
      <Comp className={cn(cardVariants({ variant, size, className }))} ref={ref} {...props}>
        <Icon iconVersion={icon} />
        <h4 className="text-xl font-bold lg:text-2xl">{heading}</h4>
        {hasDesc && <p className="text-sm font-normal lg:text-base">{desc}</p>}
        <ArrowRight className="ml-auto mt-auto h-5 w-5 transition-transform transform translate-x-0 group-hover:translate-x-1" />
      </Comp>
    </Link>
  );
});
ProductCard.displayName = "Card";

export { ProductCard, cardVariants };
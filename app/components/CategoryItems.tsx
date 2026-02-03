"use client";

import { useState } from "react";
import Link from "next/link";

import {
  EllipsisHorizontalIcon,
  ChevronRightIcon,
  EllipsisVerticalIcon,
} from "@heroicons/react/24/outline";

interface CategoryItemProps {
  title: string;
  color: string;
  children: string[];
}

export default function CategoryItems({
  title,
  color,
  children,
}: CategoryItemProps) {
  const [open, setOpen] = useState(false);

  const toSlug = (value: string) =>
    value
      .trim()
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "");

  return (
    <div className="space-y-2">
      {/* Title (toggle) */}
      <button
        onClick={() => setOpen(!open)}
        className={`flex w-full items-center justify-between rounded-xl px-4 py-3 font-semibold text-white ${color}`}
      >
        <span>{title}</span>

        { open ? (<EllipsisVerticalIcon className="h-5 w-5 opacity-80" />
        ) : (
          <EllipsisHorizontalIcon className="h-5 w-5 opacity-80" />
        )}
      </button>

      {/* Children */}
      {open && (
        <div className="pl-4 space-y-2">
          {children.map((item) => (
            <Link
              href={`/categories/${toSlug(title)}/${toSlug(item)}/1`}
              key={item}
              className="flex items-center justify-between text-sm text-gray-700 hover:text-gray-900 cursor-pointer"
            >
              <span>{item}</span>
              <ChevronRightIcon className="h-4 w-4 opacity-60" />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

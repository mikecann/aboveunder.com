import * as React from "react";
import { Menu } from "semantic-ui-react";
import { narray } from "../lib/utils";

interface Props {
  currentPage: number;
  totalPages: number;
  onPageClick: (page: number) => any;
}

export function Pagination({ currentPage, totalPages, onPageClick }: Props) {
  return (
    <Menu pagination>
      {narray(totalPages).map((_, i) => (
        <Menu.Item
          key={i}
          name={i + 1 + ""}
          active={i == currentPage}
          onClick={i != currentPage ? () => onPageClick(i) : undefined}
        />
      ))}
    </Menu>
  );
}

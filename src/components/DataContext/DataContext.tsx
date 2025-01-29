import { BinarySearchTree } from "@datastructures-js/binary-search-tree";
import { createContext } from "react";
import { CSVObjectType } from "../../utils/CSVHelperFunctions";

export const DataContext = createContext({ airportBst: new BinarySearchTree<CSVObjectType>(), airlineBst: new BinarySearchTree<CSVObjectType>() });

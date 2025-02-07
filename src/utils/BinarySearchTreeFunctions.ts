import { BinarySearchTreeNode } from "@datastructures-js/binary-search-tree/src/binarySearchTreeNode";
import { CSVObjectType } from "./CSVHelperFunctions";

export default function autoComplete(root: BinarySearchTreeNode<CSVObjectType> | null, prefix: string, propertyName: string, limit = 5, foundValues: string[] = []) {
    if (root === null || foundValues.length === limit) {
        return foundValues;
    }

    if (root.getValue()[propertyName].toLowerCase().includes(prefix.toLowerCase()) && !foundValues.includes(root.getValue()[propertyName])) {
        foundValues.push(root.getValue()[propertyName]);
    } 
    
    if (foundValues.length < limit && prefix <= root.getValue()[propertyName].slice(0, prefix.length)) {
        let deeperValues = autoComplete(root.getLeft(), prefix, propertyName, limit, foundValues);
        deeperValues.forEach(val => {
            if (foundValues.length < limit && !foundValues.includes(val)) {
                foundValues.push(val);
            }
        });

    } 
    
    if (foundValues.length < limit && prefix >= root.getValue()[propertyName].slice(0, prefix.length)) {
        let deeperValues = autoComplete(root.getRight(), prefix, propertyName, limit, foundValues);
        deeperValues.forEach(val => {
            if (foundValues.length < limit && !foundValues.includes(val)) {
                foundValues.push(val);
            }
        });    
    }

    return foundValues;
}

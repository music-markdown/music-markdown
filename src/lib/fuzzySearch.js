import Fuse from "fuse.js";
import { getIndexedContents } from "./github.js";

/**
 * Searches a indexed contents via the Fuse library
 */
export async function searchIndexedContents(query) {
  const fileNames = getIndexedContents();
  var options = {
    shouldSort: true,
    findAllMatches: true,
    includeMatches: true,
    threshold: 0.6,
    location: 0,
    distance: 100,
    maxPatternLength: 32,
    minMatchCharLength: 1
  };
  var fuse = new Fuse(fileNames, options);
  var result = fuse.search(query);
  return result;
}

/*
 * Return searched indexed contents values only as an array
 */
export async function getSearchIndexedContentsValues(query) {
  return (await searchIndexedContents(query)).map(
    result => result.matches[0].value
  );
}

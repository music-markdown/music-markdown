import queryString from "query-string";
import { createContext, useContext, useEffect } from "react";
import { useHistory, useLocation, useParams } from "react-router-dom";
import { useLocalStorage } from "../lib/hooks";

const SongPrefsContext = createContext();

export const useSongPrefs = () => useContext(SongPrefsContext);

export function SongPrefsProvider({ children }) {
  const [songPrefs, setSongPrefs] = useLocalStorage("songPrefs", {});

  return (
    <SongPrefsContext.Provider value={{ songPrefs, setSongPrefs }}>
      {children}
    </SongPrefsContext.Provider>
  );
}

function update(prevSongPrefs, song, field, newVal, defaultVal) {
  const songPrefs = { ...prevSongPrefs };
  const songPref = songPrefs[song] || {};

  if (newVal === defaultVal) {
    delete songPref[field];
  } else {
    songPref[field] = newVal;
    songPrefs[song] = songPref;
  }
  if (Object.keys(songPref).length === 0) {
    delete songPrefs[song];
  }
  return songPrefs;
}

export function useSong() {
  const { repo, branch, path } = useParams();
  return `${repo}/${branch}/${path}`;
}

export function useSongPref(fieldName, defaultValue) {
  const { songPrefs, setSongPrefs } = useSongPrefs();
  const song = useSong();
  const songPref = songPrefs[song] || {};

  const fieldValue = songPref[fieldName] || defaultValue;
  const setFieldValue = (newValue) =>
    setSongPrefs(update(songPrefs, song, fieldName, newValue, defaultValue));

  return [fieldValue, setFieldValue];
}

export function useColumns() {
  const [columns, setColumns] = useSongPref("columns", 1);
  return { columns, setColumns };
}

function useTransposeQuery() {
  const { search } = useLocation();
  const history = useHistory();
  const params = queryString.parse(search);
  const transposeQuery = Number(params["transpose"]);

  const setTransposeQuery = (transpose) => {
    params["transpose"] = String(transpose);
    history.replace({ search: queryString.stringify(params) });
  };

  return [transposeQuery, setTransposeQuery];
}

export function useTranspose() {
  const [transposeQuery, setTransposeQuery] = useTransposeQuery();
  const [transposePref, setTransposePref] = useSongPref("transpose", 0);

  const setTranspose = (transpose) => {
    setTransposeQuery(transpose);
    setTransposePref(transpose);
  };

  useEffect(() => {
    if (isNaN(transposeQuery)) {
      setTransposeQuery(transposePref);
    } else if (transposeQuery !== transposePref) {
      setTransposePref(transposeQuery);
    }
  }, [setTransposePref, setTransposeQuery, transposePref, transposeQuery]);

  return { transpose: transposePref, setTranspose };
}

export function useZoom() {
  const [zoom, setZoom] = useSongPref("zoom", 1);
  return { zoom, setZoom };
}

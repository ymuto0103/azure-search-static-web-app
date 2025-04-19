import React, { useState, useEffect } from 'react';
import { TextField, Autocomplete, Button, Box } from '@mui/material';
import fetchInstance from '../../url-fetch';
import './SearchBar.css';

export default function SearchBar({ postSearchHandler, query, width }) {
  const [q, setQ] = useState(() => query || '');
  const [suggestions, setSuggestions] = useState([]);

  console.log(`width = ${width}`);

  const search = (value) => {
    console.log(`search: ${value}`);
    postSearchHandler(value);
  };

  useEffect(() => {
    console.log(`useEffect getSuggestions: ${q}`);
    if (q) {

      const body = { q, top: 5, suggester: 'sg' };

      fetchInstance('/api/suggest', { body, method: 'POST' })
      .then(response => {
        setSuggestions(response.suggestions.map(s => s.text));
      })
      .catch(error => {
        console.log(error);
        setSuggestions([]);
      });
    }
  }, [q]);


  const onInputChangeHandler = (event, value) => {
    console.log(`onInputChangeHandler: ${value}`);
    setQ(value);
  };


  const onChangeHandler = (event, value) => {
    console.log(`onChangeHandler: ${value}`);
    setQ(value);
    search(value);
  };

  const onEnterButton = (event) => {
    console.log(`onEnterButton: ${q}`);
    // if enter key is pressed
    if (event.key === 'Enter') {
      search(q);
    }
  };

  return (
    <div
      className={width ? "search-bar search-bar-wide" : "search-bar search-bar-narrow"}
    >
      <Box className="search-bar-box">
        <Autocomplete
          className="autocomplete"
          freeSolo
          value={q}
          options={suggestions}
          onInputChange={onInputChangeHandler}
          onChange={onChangeHandler}
          disableClearable
          renderInput={(params) => (
            <TextField
              {...params}
              id="search-box"
              className="form-control rounded-0"
              placeholder="What are you looking for?"
              onBlur={() => setSuggestions([])}
              onClick={() => setSuggestions([])}
            />
          )}
        />
        <div className="search-button" >
          <Button variant="contained" color="primary" onClick={() => {
            console.log(`search button: ${q}`);
            search(q)
          }
          }>
            Search
          </Button>
        </div>
      </Box>
    </div>
  );
}
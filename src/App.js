import React from 'react';
import './App.scss';
import Content from './Content';
import { useState, useEffect } from 'react';

function App() {
  const [cardList, setCardList] = useState([]);
  const [tags, setTags] = useState([]);

  const getApiData = async () => {
    const response = await fetch(
      "https://s3-us-west-1.amazonaws.com/hero-engineering-public/interview/fe-code-challenge.json"
    ).then((response) => response.json());
    setCardList(response.cards);
  };

  useEffect(() => {
    let tagsArray = [];
    cardList.forEach((card) => {
      tagsArray.push(...card.tags);
    });
    let uniqueTags = tagsArray.filter((element, index) => {
      return tagsArray.indexOf(element) === index;
    });
    setTags(uniqueTags);
  },[cardList])

  useEffect(() => {
    getApiData();
  },[])

  return (
    <Content cardList={cardList} filterTags={tags} />
  );
}

export default App;

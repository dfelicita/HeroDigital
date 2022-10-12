import React, { useState, useEffect } from 'react';
import './Content.scss';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Spinner from 'react-bootstrap/Spinner';
import CustomCard from './Card';

function Contnet(props) {
  const [cardList, setCardlist] = useState([]);
  const [tagList, setTagList] = useState([]);
  const [filters, setFilters] = useState([]);
  
  useEffect(() => {
    if(tagList !== props.filterTags)
      setTagList(props.filterTags);
  },[props.filterTags])

  useEffect(() => {
    if(cardList !== props.cardList)
      setCardlist(props.cardList);
  },[props.cardList])

  useEffect(() => {
    if(filters.length === 0)
      return setCardlist(props.cardList);

    let auxCards = [...props.cardList];
    auxCards = auxCards.filter((card) => {
      return filters.every((ever) => {
        return card.tags.indexOf(ever) !== -1
      })
    })
    setCardlist(auxCards);
  },[filters])

  function filterTag(id){
    let auxFilters = [...filters];
    if(auxFilters.indexOf(tagList[id]) === -1) {
      auxFilters.push(tagList[id]);
    } else {
      auxFilters.splice(auxFilters.indexOf(tagList[id]),1);
    }
    setFilters(auxFilters);
  }

  function selectFilter(id) {
    if(id === -1){
      setFilters([]);
      setCardlist(props.cardList);
      return;
    }

    setFilters([tagList[id]]);
  }

  return (
    <Container className="mt-5">
      <Row>
        <h1 className="mb-5">Card List Daniel Felicita</h1>
        <div className="btn-group tags--group d-none d-sm-flex" role="group">
        { 
          tagList.map((res, index) => {
            return  <span><input type="checkbox" className="btn-check" id={ 'btn'+index } />
                    <label className="btn btn-outline-dark" htmlFor={ 'btn'+index } onClick={() => filterTag(index)}>{res}</label></span>
          })
        }
        </div>
        <select className="form-select form-select-lg d-block d-sm-none" onChange={(e) => selectFilter(e.target.value)}>
          <option selected hidden value={-1} key={-1}>Select Tags</option>
          {tagList.map((res, index) => {
            return <option value={index} key={index}>{res}</option>
          })}
        </select>
      </Row>
      <div className="grid--container mt-5 mb-5">
        {
          cardList.length === 0
          ? <Spinner animation="border" size="lg" className="spinner--center" />
          : cardList.map((card, index) => {
            return <CustomCard content={card} key={index}></CustomCard>
          })
        }
      </div>
    </Container>
  )
}

export default Contnet;

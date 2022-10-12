import React from 'react';
import './Card.scss';
import Card from 'react-bootstrap/Card';
import Badge from 'react-bootstrap/Badge';

class CustomCard extends React.Component {

  render() {

    return(
      <div className='card--container'>
        <div className='card--content'>
          <Card className='card--front'>
            {this.props.content.featured === 1 && 
              <Badge bg="success" className='feature--badge'>Featured</Badge>
            }
            <img src={this.props.content.image} className="card-img-top" alt={this.props.content.id} />
            <div className="card-body">
              <h4 className="card-title text-center mb-3">{this.props.content.title}</h4>
              <p className="card-text">{this.props.content.description}</p>
            </div>
          </Card>
          <Card className='card--back'>
            <img src={this.props.content.image} className="card-img-top" alt={this.props.content.id} />
            <div className="card-body">
              <h2 className="card-title text-center mb-5">{this.props.content.id}</h2>
              { this.props.content.tags.map((tagName) => { return <Badge pill bg='info' className='mb-2 me-2 tags'>{tagName}</Badge> }) }
            </div>
          </Card>
        </div>
      </div>
    );
  }
}

export default CustomCard;

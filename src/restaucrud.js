import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';
import AppNavbar from './AppNavbar';
import ss from './image/ss.png'

class restaucrud extends Component {
  emptyItem = {
    nom:'',
    restoid:'',
    rank:'',
    adresse:'',
    latitude:'',
    longitude:'',
    heure_open:'',
    heure_close:'',
    week:'',
    zone:'',
    serie:'',
    photo:''
  };

  constructor(props) {
    super(props);

    this.state = {
      item: this.emptyItem,
      values: [],
      validationError: '',
      restos: [],
      series: []
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async componentDidMount() {
    const zones = await fetch('http://localhost:8080/zone')
      .then(res => res.json())
      .catch(error => console.error(error));

    const series = await fetch('http://localhost:8080/serie')
      .then(res => res.json())
      .catch(error => console.error(error));
    this.setState({ zones, series });

    const { id } = this.props.match.params;

    if (id !== 'new') {
      const restoResponse = await fetch(`http://localhost:8080/resto/Byid/${id}`);
      const resto = await restoResponse.json();
      this.setState({ item: resto });
    }
  }

  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    let item = { ...this.state.item };
    item[name] = value;

    this.setState({ item });
  }

  async handleSubmit(event) {
    event.preventDefault();
    const { item } = this.state;
  
    await fetch('http://localhost:8080/resto' + (item.restoid ? '/' + item.restoid : ''), {
      method: (item.restoid) ? 'PUT' : 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        ...item,
        ville: item.ville ? JSON.parse(item.ville) : null,
        serie: item.serie ? JSON.parse(item.serie) : null
      }),
    });
    this.props.history.push('http://localhost:8080/resto');
    window.location.reload();
  }



  render() {
    const { item, values } = this.state;
    const title = <h2>{item.restoid ? 'Edit resto' : 'RESTAURANT AJOUTE'}</h2>;

    return (
      <div
       style={{
          backgroundImage: `url(${ss})`, // Apply the background image
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          minHeight: '100vh',
        }}>
        <AppNavbar />
        <Container>
          {title}
          <Form onSubmit={this.handleSubmit}>
            <FormGroup>
              <Label for="nom">Name</Label>
              <Input type="text" name="nom" id="nom" value={item.nom || ''}
                     onChange={this.handleChange} autoComplete="nom" />
                          
              <Label for="rank">Rank</Label>
              <Input type="text" name="rank" id="rank" value={item.rank || ''}
                     onChange={this.handleChange} autoComplete="rank" />
              
              <Label for="adresse">Adresse</Label>
              <Input type="text" name="adresse" id="adresse" value={item.adresse || ''}
                     onChange={this.handleChange} autoComplete="adresse" />

              <Label for="latitude">Latitude</Label>
              <Input type="text" name="latitude" id="latitude" value={item.latitude || ''}
                     onChange={this.handleChange} autoComplete="latitude" />    

              <Label for="longitude">Longitude</Label>
              <Input type="text" name="longitude" id="longitude" value={item.longitude || ''}
                     onChange={this.handleChange} autoComplete="longitude" />

              <Label for="heure_open">Heure_open</Label>
              <Input type="text" name="heure_open" id="heure_open" value={item.heure_open || ''}
                     onChange={this.handleChange} autoComplete="heure_open" />

              <Label for="heure_close">Heure_close</Label>
              <Input type="text" name="heure_close" id="heure_close" value={item.heure_close || ''}
                     onChange={this.handleChange} autoComplete="heure_close" />

              <Label for="week">Week</Label>
              <Input type="text" name="week" id="week" value={item.week || ''}
                     onChange={this.handleChange} autoComplete="week" />
                        
              <FormGroup>
              <Label for="Zone">Zone</Label>
              <select id="zone-select" name="zone" onChange={this.handleChange}>
              {this.state.zones && this.state.zones.map((ville) => (
                  <option key={ville.id} value={JSON.stringify(ville)}>{ville.nom}</option>
              ))}
                </select>
            </FormGroup>


            <FormGroup>
              <Label for="serie">Serie</Label>
              <select id="serie-select" name="serie" onChange={this.handleChange}>
                {this.state.series && this.state.series.map((serie) => (
                  <option key={serie.id} value={JSON.stringify(serie)}>{serie.nom}</option>
                ))}
              </select>
          </FormGroup>

            </FormGroup>
            <FormGroup>
              <Button color="primary" type="submit">Save</Button>{' '}
              <Button color="secondary" href="/resto">Cancel</Button>
            </FormGroup>
          </Form>
        </Container>
      </div>
    );
  }
}

export default withRouter(restaucrud);

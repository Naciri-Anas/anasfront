import React, { Component } from 'react';
import { Button, ButtonGroup, Container, Table, Input } from 'reactstrap';
import AppNavbar from './AppNavbar';
import { Link } from 'react-router-dom';
import { AiFillEdit, AiFillDelete, AiOutlineSearch } from 'react-icons/ai';
import { FaPlus } from 'react-icons/fa';

class zoneshow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      zones: [],
      isLoading: true,
      searchValue: '', // State to store the search value
    };
    this.remove = this.remove.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }

  componentDidMount() {
    fetch('http://localhost:8080/zone')
      .then(response => response.json())
      .then(data => this.setState({ zones: data, isLoading: false }));
  }

  async remove(id) {
    await fetch(`http://localhost:8080/zone/${id}`, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    }).then(() => {
      let updatedZones = [...this.state.zones].filter(i => i.id !== id);
      this.setState({ zones: updatedZones });
    });
  }

  handleSearch(event) {
    this.setState({ searchValue: event.target.value });
  }

  render() {
    const { zones, isLoading, searchValue } = this.state;

    if (isLoading) {
      return <p>Loading...</p>;
    }

    // Filter the zones based on the search value
    const filteredZones = zones.filter(zone =>
      zone.nom.toLowerCase().includes(searchValue.toLowerCase())
    );

    const zoneList = filteredZones.map(zone => {
      return (
        <tr key={zone.id}>
          <td style={{ whiteSpace: 'nowrap' }}>{zone.zoneid}</td>
          <td>{zone.nom}</td>
          <td>{zone.ville.nom}</td>
          <td>
            <ButtonGroup>
              <a
                size="sm"
                color="primary"
                className="btn btn-primary"
                href={`/zone/${zone.zoneid}`}
              >
                <AiFillEdit className="btn-icon" />
              </a>
              <Button
                size="sm"
                color="danger"
                onClick={() => {
                  this.remove(zone.zoneid);
                  window.location.reload();
                }}
              >
                <AiFillDelete className="btn-icon" />
              </Button>
            </ButtonGroup>
          </td>
        </tr>
      );
    });

    return (
      <div>
        <AppNavbar />
        <Container fluid className="table-container">
          <div className="search-bar">
            <Input
              type="text"
              placeholder="Search"
              value={searchValue}
              onChange={this.handleSearch}
            />
            <button type="button">
              <AiOutlineSearch />
            </button>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3>Gestion zones</h3>
            <a
              size="sm"
              className="btn btn-success"
              tag={Link}
              href="/zone/new"
              style={{
                textDecoration: 'none',
                color: '#fff',
                padding: '8px 16px',
                borderRadius: '4px',
                backgroundColor: '#28a745',
              }}
            >
              <FaPlus className="btn-icon" />
            </a>
          </div>
          <Table className="mt-4">
            <thead>
              <tr>
                <th width="30%">N²</th>
                <th width="30%">Nom</th>
                <th width="30%">Ville</th>
                <th width="40%">Actions</th>
              </tr>
            </thead>
            <tbody>{zoneList}</tbody>
          </Table>
        </Container>
      </div>
    );
  }
}

export default zoneshow;

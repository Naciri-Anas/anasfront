import React, { Component } from 'react';
import { Button, ButtonGroup, Container, Table, Input } from 'reactstrap';
import AppNavbar from './AppNavbar';
import { Link } from 'react-router-dom';
import { AiFillEdit, AiFillDelete, AiOutlineSearch } from 'react-icons/ai';
import { FaPlus } from 'react-icons/fa';

class serieshow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      series: [],
      isLoading: true,
      searchValue: '', // State to store the search value
    };
    this.remove = this.remove.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }

  componentDidMount() {
    fetch('http://localhost:8080/serie')
      .then(response => response.json())
      .then(data => this.setState({ series: data, isLoading: false }));
  }

  async remove(id) {
    await fetch(`http://localhost:8080/serie/${id}`, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    }).then(() => {
      let updatedSeries = [...this.state.series].filter(i => i.id !== id);
      this.setState({ series: updatedSeries });
    });
  }

  handleSearch(event) {
    this.setState({ searchValue: event.target.value });
  }

  render() {
    const { series, isLoading, searchValue } = this.state;

    if (isLoading) {
      return <p>Loading...</p>;
    }

    // Filter the series based on the search value
    const filteredSeries = series.filter(serie =>
      serie.nom.toLowerCase().includes(searchValue.toLowerCase())
    );

    const seriesList = filteredSeries.map(serie => {
      return (
        <tr key={serie.id}>
          <td style={{ whiteSpace: 'nowrap' }}>{serie.serieid}</td>
          <td>{serie.nom}</td>
          <td>
            <ButtonGroup>
              <a
                size="sm"
                color="primary"
                className="btn btn-primary"
                href={`/serie/${serie.serieid}`}
              >
                <AiFillEdit className="btn-icon" />
              </a>
              <Button
                size="sm"
                color="danger"
                onClick={() => {
                  this.remove(serie.serieid);
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
            <h3>Gestion series</h3>
            <a
              size="sm"
              className="btn btn-success"
              tag={Link}
              href="/serie/new"
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
                <th width="30%">Nom de la série</th>
                <th width="40%">Actions</th>
              </tr>
            </thead>
            <tbody>{seriesList}</tbody>
          </Table>
        </Container>
      </div>
    );
  }
}

export default serieshow;

import React, { useState, useEffect } from 'react';
import { useParams, Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export default function Detail() {
  const [mascota, setMascota] = useState(null);
  const { mascotaId } = useParams();

  useEffect(() => {
    const URL = "https://gist.githubusercontent.com/josejbocanegra/829a853c6c68880477697acd0490cecc/raw/99c31372b4d419a855e53f0e891246f313a71b20/mascotas.json";
    fetch(URL)
      .then(response => response.json())
      .then(data => {
        const foundMascota = data.find(pet => pet.id === parseInt(mascotaId));
        setMascota(foundMascota);
      })
      .catch(error => console.error('Error fetching pet data:', error));
  }, [mascotaId]);

  if (!mascota) {
    return <div>Loading...</div>;
  }

  return (
    <Container className="mt-3">
      <Row>
        <Col md={8} className="mx-auto">
          <Card className="text-center">
            <Card.Header style={{ 
              backgroundColor: '#343a40', 
              color: '#fff', 
              textAlign: 'left', 
              fontSize: '1.5rem', 
              padding: '0.6rem',  
              minHeight: '40px'   
            }}>
              <Link to="/" style={{ color: '#fff', textDecoration: 'none' }}>
                Adóptame
              </Link>
            </Card.Header>
            <Card.Body>
              <Card.Title style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>{mascota.nombre}</Card.Title>
              <Card.Img 
                variant="top" 
                src={mascota.foto} 
                alt={mascota.descripcion} 
                style={{ maxWidth: '100%', height: 'auto', objectFit: 'cover' }}
              />
              <Card.Text style={{ fontSize: '1.25rem', color: '#555', marginTop: '1rem' }}>
                <strong></strong> {mascota.raza}
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

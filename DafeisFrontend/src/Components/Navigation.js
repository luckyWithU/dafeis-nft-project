import React from 'react'
import './style.css'
import {Button, Navbar, Container, Nav, NavDropdown} from 'react-bootstrap'

class Navigation extends React.Component{
	render(){
		return (
		<Navbar className="color-nav">
		<Container>
			<Navbar.Brand href="#"  style={{marginLeft:'0px', height:'110px'}}></Navbar.Brand>
			<Navbar.Toggle aria-controls="basic-navbar-nav" />
			<Navbar.Collapse id="basic-navbar-nav">
				<Nav className="mr-auto"  style={{fontSize:'25px'}}>
					<Button href="#" 
						style={{background: 'none', border: 'none',fontSize: '19pt',
						fontWeight:'bold',letterSpacing: '2pt'}}>DAFEIS</Button>
				</Nav>
				<Nav className="me-auto">
				</Nav>
				<Nav className="ml-auto">
					<Button href="#road_map" variant="primary" style={{marginLeft:'20px',background: 'none', border: 'none',fontSize: '15pt',}}>ROADMAP</Button>
					<Button href="#team_id"  variant="primary" style={{marginLeft:'20px',background: 'none', border: 'none',fontSize: '15pt'}}>TEAM</Button>
					<Button href='https://twitter.com/da_feis' variant="primary" style={{ marginLeft:'20px',background: 'rgb(128 84 20)', fontSize: '15pt', fontWeight:'bold',
				    borderWidth: '2px', borderRadius: '0px', borderColor: 'rgb(128 84 20)'}}>Twitter</Button>
					<Button	variant="primary" style={{ marginLeft:'20px',background: 'none', fontSize: '15pt', fontWeight:'bold',
				    borderWidth: '2px', borderRadius: '0px', borderColor: 'rgb(128 84 20)'}}>OPENSEA</Button>
					<Button variant="primary" style={{ marginLeft:'20px',background: 'none', fontSize: '15pt', fontWeight:'bold',
				    borderWidth: '2px', borderRadius: '0px', borderColor: 'white'}}>Connect</Button>
				</Nav>
			</Navbar.Collapse>
		</Container>
		</Navbar>
		)
	}
}

export default Navigation;
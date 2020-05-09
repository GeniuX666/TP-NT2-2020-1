import React,{useState,useEffect} from 'react';
import {Vibration} from 'react-native'
import { StyleSheet, Text, View, StatusBar, TouchableOpacity,Dimensions,Button } from 'react-native';

const screen = Dimensions.get('window');

class Contador extends React.Component {
	actualizarComponente(){
		return !this.props.comp
	}																							
	render() {
		return (
			<Text style={{ fontSize: 50 , color: 'white', textShadowColor : 'white',
			textShadowRadius : 3 }}>{this.props.minutos}:{this.props.segundos}</Text>
		);
	}
}

export default class App extends React.Component {
	constructor(){
		super();
		this.state={
			pomodoro : true, 
			minutos : '25',
			segundos : '00',
			encendido : false,
			completado : false,
			texto : 'Pomodoro Timer' 
		}
	}
	componentDidMount(){
			this.interval = setInterval(this.milisegundos, 1000)
	}

	milisegundos = () => {
		if(!this.state.completado && this.state.encendido  ){	
			if(this.state.segundos > 0){
				this.setState(prevState => (
					{ segundos : String(parseInt(prevState.segundos) - 1) 
					}
				))
				if(parseInt(this.state.segundos) < 10){
					this.setState(
						{ segundos : '0' + String(this.state.segundos) 
					})
				}
			} else{
				this.setState(prevState => (
					{ minutos : String(parseInt(prevState.minutos) - 1), segundos : '59' 
				})
				)
				if(parseInt(this.state.minutos) < 10){
				this.setState({ minutos : '0' + String(this.state.minutos) 
				})
				}
			}
			if(parseInt(this.state.minutos) == '00' && parseInt(this.state.segundos) == '00' && this.state.pomodoro ){

				this.setState({ 
					minutos: '05', 
					segundos: '00',  
					completado : false, 
					encendido : true , 
					pomodoro : false , 
					texto : 'Tiempo restante de descanso'
				})
				
				Vibration.vibrate([500, 500, 500])
			}
			if(parseInt(this.state.minutos) == '00' && parseInt(this.state.segundos) == '00' && !this.state.pomodoro ){

				this.setState({ 
					minutos: '25', 
					segundos: '00',  
					completado : false, 
					encendido : true, 
					pomodoro : true, 
					texto : 'Tiempo restante de trabajo'
			})

      		Vibration.vibrate([500, 500, 500])
			}
		}
	}
	Reiniciar = () => {
		this.setState({ 
			encendido : false, 
			minutos: '25',
			segundos: '00', 
			completado : false, 
			pomodoro : true, 
			texto : 'Tiempo restante de trabajo'}) 

	}
	
	Inicio = () => {
		this.setState({ 
			encendido : true}) 
	}

	Pausa = () => {
		this.setState({ 
			encendido : false })
	}
	
	render() {
		return (
			<View style={styles.container}>

				<View style={{alignItems: 'center', flex: 4, justifyContent: 'center'}}>
					<Contador 
					minutos={this.state.minutos} 
					segundos={this.state.segundos} 
					comp={this.state.completado}
					/>
					<Text style={{color: 'white'}}>{this.state.texto}</Text>
				</View>
				
				<View style={{ justifyContent: 'space-between', 
				flexDirection: 'row',
				flex: 5, alignItems: 'center'}}>
	
					<TouchableOpacity onPress={this.Inicio} style={styles.button}>
					<Text style={styles.buttonText}>Inicio</Text>
					</TouchableOpacity>

					<TouchableOpacity onPress={this.Pausa} style={styles.button}>
					<Text style={styles.buttonText}>Pausa</Text>
					</TouchableOpacity>

					<TouchableOpacity onPress={this.Reiniciar} style={styles.button}>
					<Text style={styles.buttonText}>Reiniciar</Text>
					</TouchableOpacity>				 

				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    borderWidth: 6,
    borderColor: 'white',
    width: screen.width / 4,
    height: screen.width /4,
    borderRadius: 100,
    alignItems: 'center',
	justifyContent: 'center',
	shadowColor : 'white',
	shadowColor : 5
  },
  
  buttonText: {
    fontSize: 20,
	color: 'white',
	textShadowColor : 'white',
	textShadowRadius : 5
  }
});

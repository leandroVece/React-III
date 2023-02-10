import React, { Component } from 'react'

const SecurityCode = 'tomate';

export default class ClassState extends Component {

    constructor(props) {
        super(props);

        this.state = {
            name: this.props.name,
            error: false,
            loanding: false,
            value: '',
        };
    }

    componentDidUpdate() {
        if (this.state.loanding) {
            setTimeout(() => {
                console.log("actualizar")
                if (SecurityCode === this.state.value) {
                    this.setState({ loanding: false, error: false });
                } else {
                    this.setState({ loanding: false, error: true });

                }
            }, 200)
        }
    }
    render() {
        return (
            <div>
                <h2>Eliminar {this.props.name}</h2>

                {this.state.error && (
                    <p>Error: codigo incorrecto</p>
                )}
                {this.state.loanding && (
                    <p>Cargando...</p>
                )}
                <p>Por favor, escriba el código de seguridad.</p>
                <input type='text'
                    onChange={(event) => {
                        this.setState({ value: event.target.value })
                    }}
                    placeholder='código de seguridad' />
                <button
                    onClick={() =>
                        this.setState({ loanding: true })}
                >Comprobar</button>
            </div>
        )
    }
}
import React from 'react'

const SecurityCode = 'tomate';

export default function UseState(props) {

    const [state, setState] = React.useState({
        value: '',
        error: false,
        loading: false,
        deleted: false,
        confirmed: false,
    });

    const OnConfirmed = () => {
        setState({
            ...state,
            loading: false,
            error: false,
            confirmed: true,
        })
    }

    const OnError = () => {
        setState({
            ...state,
            loading: false,
            error: true,
        })
    }

    const OnWrite = (newValue) => {
        setState({
            ...state,
            value: newValue
        })
    }
    const OnSecondConfirmed = () => {
        setState({
            ...state,
            deleted: true,
        });
    }

    const OnReboot = () => {
        setState({
            ...state,
            confirmed: false,
            value: '',
        });
    }

    React.useEffect(() => {
        if (state.loading) {
            setTimeout(() => {
                if (state.value === SecurityCode) {
                    OnConfirmed();
                } else {
                    OnError();
                }
            }, 200)
        }

    }, [state.loading])

    console.log(state.value)
    if (!state.deleted && !state.confirmed) {
        return (
            <div>
                <h2>Eliminar {props.name}</h2>
                <p>Por favor, escriba el código de seguridad.</p>
                {state.error && (
                    <p>Error: codigo incorrecto</p>
                )}
                {state.loading && (
                    <p>Cargando...</p>
                )}

                <input type='text'
                    value={state.value}
                    onChange={(event) => {
                        OnWrite(event.target.value);
                    }}
                    placeholder='código de seguridad' />
                <button onClick={() => setState({ ...state, loading: true })}>Comprobar</button>
            </div>
        )
    } else if (state.confirmed && !state.deleted) {
        return (
            <div>
                <h3>¿Estas seguro de continuar?</h3>
                <button
                    onClick={() => {
                        OnSecondConfirmed()
                    }}>
                    Estoy seguro</button>
                <button
                    onClick={() => {
                        OnReboot()
                    }}>Negativo a base</button>
            </div>
        );
    } else {
        return (
            <div>
                <h3>Eliminado con exito</h3>
                <button
                    onClick={() => {
                        setState({
                            ...state,
                            confirmed: false,
                            deleted: false,
                            value: '',
                        });
                    }}>
                    Volver</button>
            </div>
        )
    }
}
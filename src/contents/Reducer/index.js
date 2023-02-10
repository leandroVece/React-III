import React from 'react'

const SecurityCode = 'tomate';

export default function UseReducer(props) {

    const [state, dispatch] = React.useReducer(reducer, initialState)

    React.useEffect(() => {
        if (state.loading) {
            setTimeout(() => {
                if (state.value === SecurityCode) {
                    dispatch({ type: actionTypes.confirm });
                } else {
                    dispatch({ type: 'ERROR' });
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
                        dispatch({ type: 'WRITE', payload: event.target.value });
                    }}
                    placeholder='código de seguridad' />
                <button onClick={() => dispatch({ type: 'CHECK' })}>Comprobar</button>
            </div>
        )
    } else if (state.confirmed && !state.deleted) {
        return (
            <div>
                <h3>¿Estas seguro de continuar?</h3>
                <button
                    onClick={() => {
                        dispatch({ type: 'DELETE' });

                    }}>
                    Estoy seguro</button>
                <button
                    onClick={() => {
                        dispatch({ type: 'RESET' });
                    }}>Negativo a base</button>
            </div>
        );
    } else {
        return (
            <div>
                <h3>Eliminado con exito</h3>
                <button
                    onClick={() => {
                        dispatch({ type: 'RESET' });
                    }}>
                    Volver</button>
            </div>
        )
    }
}


const initialState = {
    value: '',
    error: false,
    loading: false,
    deleted: false,
    confirmed: false,
}

const ReducerObject = (state, action) => ({
    [actionTypes.confirm]: {
        ...state,
        loading: false,
        error: false,
        confirmed: true,
    },
    'ERROR': {
        ...state,
        loading: false,
        error: true,
    },
    'WRITE': {
        ...state,
        value: action.payload
    },
    'DELETE': {
        ...state,
        deleted: true,
    },
    'CHECK': {
        ...state,
        loading: true
    },
    'RESET': {
        ...state,
        confirmed: false,
        deleted: false,
        value: '',
    }
});

const reducer = (state, action) => {
    return ReducerObject(state, action)[action.type] || state;
};

/*const reducer = (state, action) => {
    return ReducerObject(state, action)?.[action.type] ?? state;
};*/

const actionTypes = {
    confirm: 'CONFIRM'
}
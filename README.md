# React III

> Nota: Esta es la tercera parte de una serie de tutoriales simples con React.js [Link](https://github.com/leandroVece/React) del primer tutorial.

La primera vez que hable de React toque muy superficialmente la diferencia entre clases y componentes. Ahora que tenemos una base mas solida sobre React podemos adentranos un poco mas en el tema.

Comencemos con unos pequeños ejemplos para ir avanzando poco a pocos en las diferencias.

Para ello  creemos dos archivos nuevos.

**UseState.js**
    import React from 'react'

    export default function UseState() {
        return (
            <div>
                <h2>Eliminar UseState</h2>
                <p>Por favor, escriba el código de seguridad.</p>
                <input type='text' placeholder='código de seguridad' />
                <button>Comprobar</button>
            </div>
        )
    }

**UseClass**

    import React, { Component } from 'react'

    export default class ClassState extends Component {
        render() {
            return (
                <div>
                    <h2>Eliminar ClassState</h2>
                    <p>Por favor, escriba el código de seguridad.</p>
                    <input type='text' placeholder='código de seguridad' />
                    <button>Comprobar</button>
                </div>
            )
        }
    }

Como se puede observar, este codigo la unica funcion que tiene es detectar el codigo de seguridad para Eliminar un objeto.

Para comenzar a interactuar con nuestros componentes comencemos enviando una props a cada componente. Para ello comencemos por agregar nuestras props en nuestros archivo app.js

    function App() {
    return (
        <div className='App'>
        <UseState name={"UseState"} />
        <UseClass name={"UseClass"} />
        </div>
    )
    }

Luego hacemos los cambios necesarios para recibirlos en nuestros componentes.

**UseState**

    export default function UseState(props) {
        const [error, setError] = useState(false)

        return (
            <div>
                <h2>Eliminar {props.name}</h2>
                <p>Por favor, escriba el código de seguridad.</p>
                {error && (
                    <p>Error: codigo incorrecto</p>
                )}

                <input type='text' placeholder='código de seguridad' />
                <button onClick={() => setError(!error)}>Comprobar</button>
            </div>
        )
    }

La logica es muy simple, simplemente enviamos una props para determinar el contenido de nuestro H1 y luego creamos un estado que si se encuentra en true escribira un nuevo parrafo en forma de alerta.

¿Como hacemos esto con las clases? en el primer tutorial di una pequeña explicacion que componentes creado por clases heredan de otra clases.

**UseClass**    

    export default class ClassState extends Component {

        constructor(props) {
            super(props);

            this.state = {
                name: this.props.name,
                error: false,
            };
        }
        render() {
            return (
                <div>
                    <h2>Eliminar {this.props.name}</h2>

                    {this.state.error && (
                        <p>Error: codigo incorrecto</p>
                    )}
                    <p>Por favor, escriba el código de seguridad.</p>
                    <input type='text' placeholder='código de seguridad' />
                    <button
                        onClick={() =>
                            this.setState({ error: !this.state.error })}
                    >Comprobar</button>
                </div>
            )
        }
    }

Como podemos ver, no solo tenemos que llamar a nuestras props con el **this** sino que tambien, en nuestro contructor, guardamos nuestros estados. Lo cual es muy conveniente ya que no tenemos necesidad de crear un estado nuevo, simplemente lo agregamos en nuestro objeto **this.state**


 ## Efectos con useEffect

Gracias a los anteriores tutoriales sabemos como aplicar los UseEfect en los componentes que definimos como funciones.

    export default function UseState(props) {
        const [error, setError] = useState(false)
        const [loading, setLoanding] = useState(false)

        React.useEffect(() => {
            setTimeout(() => {
                setLoanding(false);
            }, 200)
        }, [loading])

        return (
            <div>
                <h2>Eliminar {props.name}</h2>
                <p>Por favor, escriba el código de seguridad.</p>
                {error && (
                    <p>Error: codigo incorrecto</p>
                )}
                {loading && (
                    <p>Cargando...</p>
                )}

                <input type='text' placeholder='código de seguridad' />
                <button onClick={() => setLoanding(true)}>Comprobar</button>
            </div>
        )
    }

De una manenera simple, simulamos un pedido a la base de datos usando UseEffect. Luego cambiamos la funcion Onclik para que estaba vez actualize nuestro nuevo estado **loanding**.

¿Como hacemos este mismo efecto en nuestros componentes definidos como clases?

    export default class ClassState extends Component {

        constructor(props) {
            super(props);

            this.state = {
                name: this.props.name,
                error: false,
                loanding: false,
            };
        }

        componentDidUpdate() {
            setTimeout(() => {
                console.log("actualizar")
                this.setState({ loanding: false });
            }, 200)
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
                    <input type='text' placeholder='código de seguridad' />
                    <button
                        onClick={() =>
                            this.setState({ loanding: true })}
                    >Comprobar</button>
                </div>
            )
        }
    }

Con este codigo vamos a lograr el efecto que quereremos, pero hay un problema y ese es que nos enrredamos en un bucle infinito.

Esto se debe a que estamos llamando al metodo setState dentro del ComponentDidUpdate. esto hace que este ultimo sea llamado infinitamente. la solucion es simple solo tenemos que poner un condicional.

    componentDidUpdate() {
        if (this.state.loanding) {
            setTimeout(() => {
                console.log("actualizar")
                this.setState({ loanding: false });
            }, 200)
        }
    }

Este no es el unico metodo de ciclo de vida que hay. Los unos de los mas conocidos son componentWillMount y componentDidMount estos 3 eran los antecesores del UseEfect.

Su caracteristica es que componentWillMount se ejectara antes de renderizar nuestro componente y estos dos solo se ejecutatan una vez.

## Estados independientes

Comencemos creando un Hook para determinar nuestra clave.

    import React, { useState } from 'react'

    const SecurityCode = 'papaya';

    export default function UseState(props) {
        const [error, setError] = useState(false)
        const [loading, setLoanding] = useState(false)
        const [value, setValue] = useState("")

        React.useEffect(() => {
            setTimeout(() => {
                if (loading) {
                    if (value === SecurityCode) {
                        setLoanding(true);
                        setError(false)
                    } else {
                        setError(true)
                        setLoanding(false);
                    }
                }
            }, 200)
        }, [loading])

        return (
            <div>
                <h2>Eliminar {props.name}</h2>
                <p>Por favor, escriba el código de seguridad.</p>
                {error && (
                    <p>Error: codigo incorrecto</p>
                )}
                {loading && (
                    <p>Cargando...</p>
                )}

                <input type='text'
                    value={value}
                    onChange={(event) => {
                        setValue(event.target.value)
                    }}
                    placeholder='código de seguridad' />
                <button onClick={() => setLoanding(true)}>Comprobar</button>
            </div>
        )
    }

La logica es simple y lo unico que agregamos es la validacion de la palabra clave, junto a los mensaje de loading y error.

Similar sera para nuestro segundo componente

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

## Estados compuestos

Vamos a aplicar los estados compuestos en nuestros UseState. para ello vamos a hacer unos pequeños cambios.

    const SecurityCode = 'tomate';

    export default function UseState(props) {

        const [state, setState] = React.useState({
            value: '',
            error: false,
            loading: false,
        });

        React.useEffect(() => {
            if (state.loading) {
                setTimeout(() => {
                    if (state.value === SecurityCode) {
                        setState({
                            loading: false,
                            error: false,
                        })
                    } else {
                        setState({
                            loading: false,
                            error: true,
                        })
                    }
                }, 200)
            }
        }, [state.loading])
        console.log(state)

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
                        setState({ value: event.target.value })
                    }}
                    placeholder='código de seguridad' />
                <button onClick={() => setState({ loading: true })}>Comprobar</button>
            </div>
        )
    }

Con estos nuestro codigo es seguro que nuestro codigo no funcione y la razon es porque en el momento de actualizar nuestro estado no se esta enviando nada.

Si prestas atencion en el console veras que, a pesar de mandar el state completo, solo visualiza la propiedad value. Cuando lo enviamos sucede lo contrario.

para solucionar esto, tenemos que usar el operador de propagacion.

    export default function UseState(props) {

        const [state, setState] = React.useState({
            value: '',
            error: false,
            loading: false,
        });
        React.useEffect(() => {
            if (state.loading) {
                setTimeout(() => {
                    if (state.value === SecurityCode) {
                        setState({
                            ...state,
                            loading: false,
                            error: false,
                        })
                    } else {
                        setState({
                            ...state,
                            loading: false,
                            error: true,
                        })
                    }
                }, 200)
            }

        }, [state.loading])
        console.log(state)

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
                        setState({ ...state, value: event.target.value })
                    }}
                    placeholder='código de seguridad' />
                <button onClick={() => setState({ ...state, loading: true })}>Comprobar</button>
            </div>
        )
    }

## Estados Imperativo

Los paradigmas en la programación es la forma en que traducimos lo que pensamos al código que vamos a escribir. Ahora hay dos clasificaciones o paradigmas que son el imperativo y el declarativo.

- El paradigma imperativo consiste en describir muy claramente el paso a paso de absolutamente cualquier cosa que vayamos a hacer en nuestro código.
- El paradigma declarativo no se concentra en el paso a paso, lo que busca es definir cual es la acción o proceso que vamos a ejecutar, ya después en otro método o función se encarga de describir ese paso a paso.

Los estados que hemos implementando en estos cursos son muy imperativos, describiendo los pasos a seguir en nuestro código.

Una forma de hacerlo mas declarativo es atravez de las funciones, donde nuestras actualizaciones seran resueltas por funciones.

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

Con esto agregramos la funcion de confirmar la eliminacion y un boton para volver haciendo mas de lo mismo. Pero no podriamos llamarlo declarativo

## UseReduce

**¿Qué es un reducer?**

- Son una herramienta que nos permite declarar todos los posibles estados de nuestra App para llamarlos de forma declarativa.
- Necesitan 2 objetos esenciales: los estados compuestos y las acciones.

**Los estados compuestos:**

- Son un objeto donde van a vivir como propiedades todos nuestros estados

**Acciones**

- Responsables, al ser disparados, de pasar de un estado a otro.
- Este objeto tiene 2 propiedades: action type y action payload.

**Action type:**

- Define el nombre clave para encontrar el nuevo estado.

**Action payload:**

- Es opcional e importante con estados dinámicos. Un estado es dinamico cuando depende del llamado de un API, de lo escrito por el usuario en un input, etc. Estos son estados dinámicos y los recibimos con un payload.

**Flujo de trabajo:**

- Definimos distintos tipos de acciones con type y payload.
Enviamos estas acciones a nuestro reducer.
- El reducer define los posibles estados por donde pasara nuestra App.
Con action type elegimos cual de esos estados queremos disponer con el cambio o evento del usuario.
- Con action payload damos dinamismo a dicho estado. Será el mismo estado pero le daremos características especiales

Para poner en practica, creemos otro archivo llamado UseReducer y agreguemos el siguiente codigo.

    import React from 'react'

    const SecurityCode = 'tomate';

    export default function UseReducer(props) {

        const [state, dispatch] = React.useReducer(reducer, initialState)

        React.useEffect(() => {
            if (state.loading) {
                setTimeout(() => {
                    if (state.value === SecurityCode) {
                        dispatch({ type: 'CONFIRM' });
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
        'CONFIRM': {
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

como pueden ver los cambios que hicimos fueron minomos, la funcion es la misma, pero el codigo es mas legible.

Todas las funciones que estaban controlando las acciones fueron los convertimos en un objeto llamado ReducerObject. Este objeto por dentro tiene guardadas las configuraciones que teniamos en nuetras funciones.

Luego en una segunda funcion llamada reducer, invocamos nuestra primera funcion y la retornamos. esta se encargara de buscar la accion dentro de nuestro objeto e implementar los cambios, sino enviara un estado por defecto.

Lo ultimo a remarcar es que nuestra nosotros enviamos todo aquello que escribimos en nuestro imput a travez de las **action.payload**.

Sin embargo, podemos dar un poco mas de rebustes a nuestro codigo con los actionTypes.

Equivocarse en el momento de codificar es algo muy comun. en el momento que estaba escribiendo este codigo yo mismo me equivoque y escribi **COMFIRM** en ves de **CONFIRM** lo que hizo que nunca se actualizara la accion. 

Para este tipo de errores es posible evitarlo con los action types. agreguemos esta linea de codigo

    const actionTypes = {
        confirm: 'CONFIRM'
    }

Con esto podremos evitar que los errores ortograficos destruyan nuestro codigo. lo unico que tenemos que hacer es remplezar cada dispatch de esta manera.

    dispatch({ type: actionTypes.confirm });

y cambiar el objeto ReducerObject

    const ReducerObject = (state, action) => ({
        [actionTypes.confirm]: {
            ...state,
            loading: false,
            error: false,
            confirmed: true,  
        },
        ...
        });

>Dejo la tarea de llenar el resto a ustedes.


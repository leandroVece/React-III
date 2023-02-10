import React from 'react'
import UseState from './contents/UseState/'
import UseClass from './contents/UseClass'
import UseReducer from './contents/Reducer'

function App() {
  return (
    <div className='App'>
      <UseState name={"UseState"} />
      <UseClass name={"UseClass"} />
      <UseReducer name={"UseReducer"} />
    </div>
  )
}

export default App;
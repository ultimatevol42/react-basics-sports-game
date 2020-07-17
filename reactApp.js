
// Deafault App component that all other compents are rendered through
function App(props){
  return (
    <div>
      <h1>Welcome to the sports game starter</h1>
      This file represents the code after completing the setup steps in the instructions
    </div>
  )
}

//Render the application
ReactDOM.render(
  <App />,
  document.getElementById('root')
);
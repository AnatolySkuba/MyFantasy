// export const App = () => {
//   return (
//     <div
//       style={{
//         height: '100vh',
//         display: 'flex',
//         justifyContent: 'center',
//         alignItems: 'center',
//         fontSize: 40,
//         color: '#010101'
//       }}
//     >
//       React homework template
//     </div>
//   );
// };
import React from 'react';
export default class App extends React.Component {
  render() {
    return (
      <div style={{ textAlign: 'center' }}>
        <h1>Hello World</h1>
      </div>
    );
  }
}

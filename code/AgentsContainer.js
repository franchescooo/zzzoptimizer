import React from 'react';

// function AgentsContainer() {
//     const AgentsData = localStorage.getItem("MyAgents")
//     console.log(10)
//     if (AgentsData && AgentsData != "[]") {
//         const AgentsJSON = JSON.parse(AgentsData);
//         AgentsJSON.map(agent => (
//             <li key={agent["Name"]}>
//                 {agent["Name"]}
//             </li>
//         ));
//     } else {
//         return (
//             <div className="pudge">
//                 На данный момент у вас нет указанных агентов воспользуйтесь нашими сканерами или добавьте агентов вручную
//             </div>
//         );
//     }
// }

function MyButton() {
    return (
      <button>Я кнопка</button>
    );
  }
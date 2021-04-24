import { Connection, createConnection, getConnectionOptions } from "typeorm"; //importanto modulo de criar conexão apra rodar o banco de dados

// createConnection(); removido para fazer uma criação de db mais complexa.

export default async (): Promise<Connection> => {
  const defaultOptions = await getConnectionOptions();

  return createConnection(
    Object.assign(defaultOptions, {
      //if ternario usado na linha de database : process.env.node_env identico(===) "teste" if(?) "" else(:) defaultOptions.database
      database:
        process.env.NODE_ENV === "test"
          ? "./src/database/database.test.sqlite"
          : defaultOptions.database,
    })
  );
};

// if(process.env.NODE_ENV === "test"){
//     "./src/database/database.test.sqlite"
// }else{
//     defaultOptions.database
// }

//configuração do banco de dados fica em ormconfig.json (arquivo para configurar tipo de bd e caminho para criar o bd)

//import fetch from 'node-fetch';
import pkg from 'pg';
const { Pool } = pkg;

// Configura la conexión a PostgreSQL
const pool = new Pool({
  user: 'postgres',
  //host: 'localhost',
  host: 'postgres',  //para conexion utilizando contenedor
  database: 'pokedex',
 // database: 'prueba2',
  password: 'Piton1961*',
  port: 5432,
});

async function getPokemon(id) {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
  const data = await res.json();

  return {
    id: data.id,
    name: data.name,
    types: data.types.map(t => t.type.name),
    attacks: data.moves.slice(0, 4).map(m => m.move.name),
    weight: data.weight / 10,
    height: data.height / 10,
  };
}

async function seed() {
  console.log('⬇️  Descargando info de PokeAPI…');

  const docs = [];
  for (let id = 1; id <= 150; id++) {
    docs.push(await getPokemon(id));
  }

  const client = await pool.connect();

  try {
    // Borrar todos los registros existentes
    await client.query('DELETE FROM pokemons');

    // Insertar cada pokemon
    const insertQuery = `
      INSERT INTO pokemons (id, name, types, attacks, weight, height)
      VALUES ($1, $2, $3, $4, $5, $6)
    `;

    for (const p of docs) {
      await client.query(insertQuery, [
        p.id,
        p.name,
        p.types,
        p.attacks,
        p.weight,
        p.height,
      ]);
    }

    console.log(`✅ Insertados ${docs.length} pokemones (1-150)`);
  } catch (error) {
    console.error('Error al insertar datos:', error);
  } finally {
    client.release();
    process.exit(0);
  }
}

seed().catch(console.error);

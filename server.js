const express = require('express');
const { GraphQLClient, gql } = require('graphql-request');

const app = express();
const port = process.env.PORT || 3000; // Utiliza el puerto proporcionado por Netlify o 3000 por defecto

// Endpoint GraphQL de TezTok
const endpoint = 'https://api.teztok.com/v1/graphql';

// Query GraphQL
const query = gql`
  query {
    events_aggregate(
      where: { implements: { _eq: "SALE" }, seller_address: { _eq: "tz1an3vLu31ouUyHifHhNZ5by1843yprNY8n" } }
    ) {
      nodes {
        buyer_profile {
          alias
          account
          twitter
          domain_name
          website
          logo
        }
      }
    }
  }
`;

// Función para eliminar duplicados por cuenta (account)
function removeDuplicates(supporters) {
  const seen = new Set();
  return supporters.filter(supporter => {
    const accountId = supporter.buyer_profile ? supporter.buyer_profile.account : null;
    if (!accountId || seen.has(accountId)) {
      return false;
    }
    seen.add(accountId);
    return true;
  });
}

// Endpoint para obtener los supporters
app.get('/api/supporters', async (req, res) => {
  try {
    const client = new GraphQLClient(endpoint);
    const data = await client.request(query);

    if (data && data.events_aggregate && data.events_aggregate.nodes) {
      const supporters = removeDuplicates(data.events_aggregate.nodes);
      res.json({ supporters });
    } else {
      res.status(404).json({ message: 'No se encontraron datos de supporters.' });
    }
  } catch (error) {
    console.error('Error al obtener datos de TezTok:', error);
    res.status(500).json({ message: 'Error interno del servidor.' });
  }
});

// Servir archivos estáticos desde la carpeta 'public'
app.use(express.static('public'));

// Escuchar en el puerto configurado
app.listen(port, () => {
  console.log(`Servidor API corriendo en http://localhost:${port}`);
});


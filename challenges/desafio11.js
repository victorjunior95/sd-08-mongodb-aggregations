// Determine qual o dia da semana com maior número de viagens iniciadas.
// Dica: Utilize o operador $dayOfWeek para extrair o dia da semana como um número de uma data.

// O resultado da sua query deve ter o seguinte formato:

// { "diaDaSemana" : <dia_da_semana>, "total" : <total_de_viagens> }

db.trips.aggregate(
  [
    {
      $group: {
        _id: {
          $dayOfWeek: "$startTime",
        },
        total: {
          $sum: 1,
        },
      },
    },
    {
      $project: {
        diaDaSemana: "$_id",
        total: "$total",
        _id: 0,
      },
    },
    {
      $sort: {
        total: -1,
      },
    },
    {
      $limit: 1,
    },
  ],
);

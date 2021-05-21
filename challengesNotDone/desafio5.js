/*
Desafio 5
Temos outra noite de filme aqui na Trybe e, desta vez, nós perguntamos à equipe quais são seus
atores ou atrizes preferidos. Aqui está o resultado:

Sandra Bullock
Tom Hanks
Julia Roberts
Kevin Spacey
George Clooney

Considerando esta lista, crie uma pipeline que retorne o title do vigésimo quinto filme da agregação
que satisfaz as seguintes condições:

countries é Estados unidos

tomatoes.viewer.rating maior ou igual a 3

Crie um novo campo chamado num_favs, que represente quantos atores ou atrizes da nossa lista de
favoritos aparecem no elenco (campo cast) do filme.

Ordene os resultados por num_favs, tomatoes.viewer.rating e title, todos em ordem decrescente.

Dica: coloque a lista de atores e atrizes favoritos em uma variável e explore operadores
como $size e $setIntersection.

O resultado da sua query deve ter o seguinte formato:

{ "title" : <nome_do_filme> }
*/
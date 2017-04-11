
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('movies').del()
  .then(function () {
    // Inserts seed entries
    return knex('movies').insert([
      {
        id: 1,
        title: 'Jaws',
        director: 'Bob',
        year: 1979,
        my_rating: 9,
        poster_url: 'http://www.savethecat.com/wp-content/uploads/2015/06/2806004-jaws.jpg'
      },
      {
        id: 2,
        title: 'Nightmare On Elm Street',
        director: 'Freddy',
        year: 1978,
        my_rating: 4,
        poster_url: 'https://img1.etsystatic.com/002/0/6997237/il_570xN.354291453_2anx.jpg'
      },
      {
        id: 3,
        title: 'Christmas Vacation',
        director: 'Sparky',
        year: 1977,
        my_rating: 10,
        poster_url: 'https://images8.alphacoders.com/398/398379.png'
      }
    ]);
  }).then (() => {
    return knex.raw(
      "SELECT setval('movies_id_seq', (SELECT MAX(id) FROM movies));"
    );
  });
};

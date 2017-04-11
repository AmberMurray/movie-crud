Commit often with detailed notes!!
-----------------------------------------------------------------------------

BIN FOLDER

www
this is where the server is created and where we find it listening `(line 84)`

there's a lot of extra stuff going on in here, but all is customizable. enjoy!

-----------------------------------------------------------------------------

DB FOLDER

MIGRATIONS SUB-FOLDER

create_movie_table.js
this is where we set up the table shell creation based on the app requirements

make sure to remove the default 'Promise' that is passed in to the function, and change the table names to the appropriate name

the column titles should be lowercase, snake_case

if you need to make changes to the table, but have not committed/pushed to github: you can migrate:rollback and make whatever changes you need

if you have pushed - you will need to run another migration and make those changes. this will ensure that the db receives the changes `(and/or other members of your team)`


SEEDS SUB-FOLDER

1_movie_seed_data.js



connection.js

this file connects knex to the database, it's also sometimes called knex.js or index.js

-----------------------------------------------------------------------------

ROUTES FOLDER

index.js
add required connections
express
router

this is the route to show the main page `(home page)` of the app

movies.js

add required connections -
express
router
database

router.get('/') - we can use slash because we've specified the full path in app.js

we will need to add in other routes as needed...

`res.render('movies/index', {movies})`
- the first part is the path to the view page - which is in the movies folder and is the file named index.js
- and the second part is the movie object we want to pass in. in this case, it's all the movies, which we want to show on the page

add'l stuff...
could also have called `db('movies').select('*')` to pull everything from the table
we could also do -
`var movieStr = JSON.stringify(movies)
res.render('movies/index', {movies: movieStr})`

- without stringify you might see [object Object][object Object]
{ movies: movieStr} is the object that gets passed to the movies/index template

the code i've used doesn't need stringify because hb is iterating over the data and converting it for us



-----------------------------------------------------------------------------

VIEWS FOLDER

MOVIES SUB-FOLDER

index.hbs

this page shows the movies index page & displays all the movies in the db

by default - express looks for the files titled index.js - hence the reason we title this file accordingly.

the code on this page was copied from mario party and adapted per the requirements of this app. nothing special here.

* * * * * * * * * * * * * * * * * * * * *

layout.hbs

this is the main layout, in `{{{body}}}` is where all the movie info is passed

we set up a CDN to bootstrap on this page, instead of downloading all the bootstrap files. had we chosen to download them, they would all all have been stored in the public folder.

any other links/scripts `(for ex: jQuery)` could be set here.

i listed my css sheet last to give me all the chances i could get to trump bootstrap

index.hbs

this is the main page for the site

it has a title - which is set in the index.js routes files
the 'GO TO MOVIES' link points to the movies page

error.hbs

this page houses all the error views. it can be customized as needed.

-----------------------------------------------------------------------------

app.js

we commented out cookieParser because it's a default of express-generator, but we didn't need it for this project
likewise, we removed all references to users since we aren't dealing with users in this app. both are defaults to express-generator

`__dirname` tells express to look in the current directory - aka my local machine

`app.use()` makes it so we can use the things we've required in

-----------------------------------------------------------------------------

knexfile.js
add required connections  -
path

this file is our config file for knex. it specifies the db type - postgres - where the db path is on our local machine: postgres://localhost/database_name

it also sets up the migrations folder to live under the db folder and to put all the migrations files inside it. it uses path.join to concat the path as needed by mac or pc.

it does the same for the seeds folder and files

we could have a .catch in this file, but for now we don't need to worry about error handling. errors will just trickle down to the errorHandler in the app.js file
